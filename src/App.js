import React, { useState, useEffect } from 'react';
import './App.css';
import icon from './images/icon.png';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() === '') {
      alert('You must write something');
      return;
    }
    setTasks([...tasks, { text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => (
      i === index ? { ...task, completed: !task.completed } : task
    ));
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>To-Do List <img src={icon} alt="Logo" /></h2>
        <div className="row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add your text"
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul id="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? 'checked' : ''}
              onClick={() => toggleTaskCompletion(index)}
            >
              {task.text}
              <span onClick={(e) => { e.stopPropagation(); deleteTask(index); }}>&times;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
