import React, {Component} from 'react';
import {Farms} from '../api/fincas';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Meteor} from 'meteor/meteor';
import {Animales} from '../api/animales'
import {FlowRouter} from 'meteor/kadira:flow-router';

class Finca extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: null,
            animals: Animales.find({farm: this.props.finca._id, owner: Meteor.userId()})
        }
    }

    deleteFinca(name) {
        const texto = "Se ha eliminado la finca \"" +name+ "\"" ;
        const hideAlert = () => {
            this.setState({
                alert: null
            });
        };
        const succesA = ()=> {
            console.log("delete");
            this.setState({
                alert: getSuccessAlert
            });

        };
        const deleteThisFarm =()=> {
            Meteor.call('fincas.remove', this.props.finca._id);
        };

        const getWAlert = (

            <SweetAlert
                warning
                showCancel
                confirmBtnText="Si!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Estas seguro?"
                onConfirm={succesA}
                onCancel={hideAlert}
            >
                No podras recuperar la informacion de esta finca!
            </SweetAlert>
        );
        const getSuccessAlert = (
            <SweetAlert
                        success
                        title={texto}
                        onConfirm={deleteThisFarm}>
            </SweetAlert>

        );
        this.setState({
            alert: getWAlert
        });



    }



    getPath() {
        return "fincas/" + this.props.finca._id + "/animales"
    }


    componentDidMount() {
        console.log("im finca");
        // this.getAnimales();
    }
// eliminar codigo que no este utilizado
    render() {
        return (
            <div className="col-md-4 circle">
                <div>
                    <button className="delete" onClick={()=> this.deleteFinca(this.props.finca.name)}>
                        &times;
                    </button>
                </div>
                <div className="text-vertical-center">
                    <a href={this.getPath()}>
                        <button className="btn btn-circle"><h2>{this.props.finca.name}</h2></button>
                    </a>
                    {this.state.alert}
                    <h4 className="text-muted text-center">NumAnimales: {this.state.animals.length}</h4>
                    <a href={this.getPath()}>
                        <button> lista de animales</button>
                    </a>
                </div>
            </div>
        );
    }
}

export default Finca;
