import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import Todo from '../Todo';

import styled from 'styled-components';
import './styles.css';


const Todolist = styled.div`
   display: block;
   list-style: none;
   padding: 40px 20px;
   margin-top: 3rem;
   transition: background-color: 1s ease;
   box-shadow: 3px 2px 5px 0px rgba(0,0,0,0.50);
   border-radius: 10px;
   background-color: ${props => (props.isDraggingOver ? "#ede8e8" : "#404c63")};
`

export default class TodoList extends Component {

    render () {
    
        let { todos, onDeleteTodo, onDoneTodo, index } = this.props;

        return (
            <Droppable droppableId={ index }>
                {( provided, snapshot ) => (
                <Todolist ref = { provided.innerRef }
                { ...provided.droppableProps } 
                isDraggingOver = { snapshot.isDraggingOver }>
                <ReactCSSTransitionGroup transitionName = "anim" transitionAppear = { false } 
                transitionEnterTimeout = { 1000 } transitionEnter = { true } 
                transitionLeave = { false }>
                    { todos.map(( t, idx ) => <Todo key = { t.id } id = { t.id } text = { t.text } index = { idx } onClick = { ()=>{onDeleteTodo( t.id )}} onDone = {() => { onDoneTodo( t.id ) }}/>)}
                    { provided.placeholder }
                </ReactCSSTransitionGroup>
                </Todolist>)}
            </Droppable>
        )
    }
}

TodoList.propTypes={
  todos: PropTypes.arrayOf(
      PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
  onDeleteTodo:PropTypes.func.isRequired
}
