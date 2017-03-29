import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Finca from './Finca';
import {Farms} from '../api/fincas.js';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';


class ListaFincas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fincas: []
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('fincas.insert', text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    componentDidMount() {
        console.log("hola");
        // this.getFincas();
    }

    render() {
        if (Meteor.userId()) {
            return (
                <div className="col-md-11">

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>

                        <input type="text" ref="textInput" placeholder="Type to add new farms"/>

                    </form>

                    <div className="row placeholders">
                        {console.log(Farms.find({}).fetch())}
                        {/*{console.log(this.props.currentUser)}*/}
                        {this.props.fincas.map((finca, index) =>
                            <Finca key={index} finca={finca}/>
                        )}
                        
                    </div>

                </div>
            );
        } else {
            return (
                <div>
                    You must be logged in to view your farms!!!
                </div>
            );

        }

    }

}
ListaFincas.propTypes = {
    fincas: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('fincas');
    return {
        fincas: Farms.find({owner: Meteor.userId()}).fetch(),
        currentUser: Meteor.user()
    };

}, ListaFincas);
