import React from 'react';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import TodoMeta from './TodoMeta.js';

class Todo extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            ids: 0,
            todos: [],
            filter: 'all'
        };
    }

    incrementID (currentID) {
        this.setState({ ids: currentID + 1 });
        return currentID;
    }

    handleSubmit (value) {
        const newTodos = this.state.todos;
        newTodos.push({
            text: value,
            isDone: false,
            id: this.incrementID(this.state.ids)
        });
        this.setState({ todos: newTodos });
        return this.state;
    }
    
    updateDone (id, isDone) {
        const newTodos = this.state.todos;
        const task = newTodos.filter( task => { return task.id == id });
        const index = newTodos.indexOf(task[0]);
        newTodos[index].isDone = !isDone;
        this.setState({ todos: newTodos });
        return this.state;
    }

    removeTodo (id) {
        const newTodos = this.state.todos;
        const task = newTodos.filter( task => { return task.id == id });
        const index = newTodos.indexOf(task[0]);
        newTodos.splice(index, 1);
        this.setState({ todos: newTodos });
        return this.state;
    }

    editTodo (id, value) {
        const newTodos = this.state.todos;
        const task = newTodos.filter( task => { return task.id == id });
        const index = newTodos.indexOf(task[0]);
        newTodos[index].text = value;
        this.setState({ todos: newTodos });
        return this.state;
    }

    setFilter (filter) {
        this.setState({ filter: filter });
    }

    render () {
        return (
            <div>
                <TodoForm onSubmit={ (e) => this.handleSubmit(e) }/>
                <TodoList list={this.state.todos}
                          filter={this.state.filter}
                          updateDone={ (id, isDone) => this.updateDone(id, isDone) }
                          removeTodo={ (id) => this.removeTodo(id) }
                          editTodo={ (id, value) => this.editTodo(id, value) }/>
                <TodoMeta list={this.state.todos} filter={this.state.filter}
                          setFilter={ (filter) => this.setFilter(filter) }/>
            </div>
        );
    }
}

export default Todo;