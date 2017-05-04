import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import { Factory } from 'meteor/dburles:factory';


import App from './App.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


describe('App Component', function () {
  it('should have an account ui', function () {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AccountsUIWrapper)).to.have.length(1);
  });

  it('should render the component <App/>', function () {
    const wrapper = shallow(<App />);
    expect(wrapper).to.exist;
  });

  
});
