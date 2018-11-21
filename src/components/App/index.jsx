import React from 'react';
import AddTodoForm from '../AddTodoForm';
import TodoList from '../TodoList';
import Info from '../Info';
import v4 from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd'
import Styles from './styles.module.css';

export default class App extends React.Component{
  state={
     todos: [],
     done: []
  }

  onAddTodo=(text)=>{
     const todo = {
         id: v4(),
         text: text
     };
     this.setState ({
        todos: [...this.state.todos, todo]
      });
  }

  onDeleteTodo = ( id ) => {
    let el = this.state.todos.find( el => el.id === id );
    if( this.state.done.includes(el) ){
      this.setState({
        todos: this.state.todos.filter( el => el.id !== id ),
        done: this.state.done.filter( el=>el.id!==id )
   });
    }
    this.setState({
         todos: this.state.todos.filter( el => el.id !== id )
    });
  }

  onDoneTodo = ( id ) => {
     let element = this.state.todos.find( el => el.id === id );
     if( this.state.done.includes(element) && this.state.todos.includes(element) ){
       this.setState({
         done: this.state.done.filter( el => el.id !== id)
       })
     } else{
      this.setState({
        done: [...this.state.done, element]
     })
     };
  }

  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newTaskIds = this.state.todos;
    let num = newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, ...num);
    this.setState({
      todos: [...newTaskIds],
    })
  };
  render(){
    return(
    <DragDropContext onDragEnd={this.onDragEnd}>
        <div className = { Styles.app }>
        <AddTodoForm onFormSubmit = { this.onAddTodo }/>
        <Info todos = { this.state.todos } doneTodos = { this.state.done }/>
        <TodoList todos = { this.state.todos } 
        onDeleteTodo = { this.onDeleteTodo }
        onDoneTodo = { this.onDoneTodo } index = {'5'}/>
        </div>
    </DragDropContext>
    )
   }
}
