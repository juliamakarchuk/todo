import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Styles from './styles.module.css';

export default class AddTodoForm extends Component{

    state = {
        inputValue: ""
    };

    handleInput = (evt) => {
      let value  = evt.target.value;
      if(value.split(' ').length > 50) alert ('Too long todo');
      this.setState({
          inputValue: value
      })
    }

    handleSubmit = (evt) => {
      evt.preventDefault();
      if( this.state.inputValue.split(' ').join('').length===0 ){
          alert ('Empty todo');
          this.setState({
            inputValue: ''
        });
          return;
      }
      this.props.onFormSubmit(this.state.inputValue);

      this.setState({
          inputValue: ''
      });

    }
    render () {
        let { inputValue } = this.state;
        return (
            <form className = {Styles.form} onSubmit = { this.handleSubmit } >
               <input type = "text"  value = { inputValue } onChange={ this.handleInput } placeholder='Input new Todo...' />
               <button type = 'submit'> Add </button>
            </form>
        )
    }
}
AddTodoForm.propTypes={
    onFormSubmit: PropTypes.func.isRequired
}
