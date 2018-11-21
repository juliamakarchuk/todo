import React from 'react';

import Styles from './styles.module.css';

const Info = ({ todos, doneTodos }) => {

    return (
        <div className = { Styles.info } >
        <p> You have created <span> { todos.length } </span> todos</p>
        <p> You have done <span>{doneTodos.length} </span> todos</p>
        </div>
    )
}

export default Info;