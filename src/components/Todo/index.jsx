import React from 'react';

import { Draggable } from "react-beautiful-dnd";

import PropTypes from 'prop-types';
import classNames from 'classnames';

import styled from 'styled-components';
import Styles from './styles.module.css';
import removeIcon from './cancel.svg';
import doneIcon from './tick.svg';


const Container = styled.div`
   background-color: ${props => (props.isDragging ? "#131b2b;" : "white")};
`;

export default class Todo extends React.Component{
  
  state= {
      status: true
  };

  handleClick = () => {
    this.setState(prevState => ({
        status: !prevState.status
    }))
    this.props.onDone();
  }

  render () {
    let todoCls = classNames({
      [Styles.item] : true,
      [Styles.itemDone] : !this.state.status
    });

    let { text, onClick, id, index } = this.props;
      return(
        <Draggable draggableId={id} 
        index={index}>{(provided, snapshot) =>
           <Container {...provided.draggableProps} 
           highlight_line {...provided.dragHandleProps}
           end_highlight_line ref={provided.innerRef} 
           isDragging = {snapshot.isDragging}>
               <div className = { todoCls } >
                  <p className = { Styles.text } > { text } </p>
                  <button className = { Styles.doneBtn } onClick = {this.handleClick}> 
                  <svg className = {Styles.iconBtn}>
                    < use href = {`${doneIcon}#root`} />
                  </svg>
                   </button>
                  <button className = { Styles.removeBtn } onClick = { onClick }> 
                  <svg className = {Styles.iconBtn}>
                    < use href = {`${removeIcon}#root`} />
                  </svg>
                   </button>
               </div>
           </Container>}
        </Draggable>
      )
  }
}

Todo.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
}