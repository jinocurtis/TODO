function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  
  const DB_NAME = 'todo_db';
  
  function createTodo() {
    const todoInput = document.querySelector('#todo-input');
    const newTodo = {
      id: uuid(),
      title: todoInput.value,
      created_at: Date.now(),
    };
  
    const todoList = document.getElementById('todo-list');
  
    const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
    const new_todo_db = [...todo_db, newTodo];
    localStorage.setItem(DB_NAME, JSON.stringify(new_todo_db));
  
    const todoItem = createTodoElement(newTodo);
    todoList.appendChild(todoItem);
  
    todoInput.value = '';
  }
  
  function createTodoElement(todo) {
    const todoItem = document.createElement('div');
    todoItem.classList.add(
      'group',
      'flex',
      'justify-between',
      'py-3',
      'px-2.5',
      'max-w-lg',
      'mx-auto',
      'rounded-lg',
      'hover:bg-blue-500',
      'hover:text-white'
    );
  
    const todoTitle = document.createElement('a');
    todoTitle.href = ''; // You should add the appropriate link or action
    todoTitle.textContent = todo.title;
  
    const todoActions = document.createElement('section');
    todoActions.classList.add(
      'flex',
      'gap-3',
      'invisible',
      'group-hover:visible'
    );
  
    // The delete and edit functionality
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    deleteButton.addEventListener('click', () => {
      deleteTodoItem(todo.id);
      todoItem.remove();
    });
  
    const editButton = document.createElement('button');
    editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg>`;
    editButton.addEventListener('click', () => {
      editTodoItem(todo.id, todoTitle);
    });
  
    todoActions.appendChild(deleteButton);
    todoActions.appendChild(editButton);
  
    todoItem.appendChild(todoTitle);
    todoItem.appendChild(todoActions);
  
    return todoItem;
  }
  
  function deleteTodoItem(id) {
    const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
    const updatedTodoList = todo_db.filter((todo) => todo.id !== id);
    localStorage.setItem(DB_NAME, JSON.stringify(updatedTodoList));
  }
  
  function editTodoItem(id, todoTitle) {
    const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
    const todoToEdit = todo_db.find((todo) => todo.id === id);
    const updatedTitle = prompt('Edit Todo:', todoToEdit.title);
    if (updatedTitle !== null) {
      todoToEdit.title = updatedTitle;
      todoTitle.textContent = updatedTitle;
      localStorage.setItem(DB_NAME, JSON.stringify(todo_db));
    }
  }
  
  // The Read function
  document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
  
    todo_db.forEach((todo) => {
      const todoItem = createTodoElement(todo);
      todoList.appendChild(todoItem);
    });
  });