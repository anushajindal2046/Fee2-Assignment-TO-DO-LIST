// Get references to DOM elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = ''; // Clear the current list
  tasks.forEach((task, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task}</td>
      <td><button class="edit-btn" onclick="editTask(${index})">Edit</button></td>
      <td><button class="delete-btn" onclick="deleteTask(${index})">Delete</button></td>
    `;
    taskList.appendChild(row);
  });
}

// Function to add a new task
addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task !== '') {
    tasks.push(task);
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
});

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Function to edit a task
function editTask(index) {
  const newTask = prompt('Edit your task:', tasks[index]);
  if (newTask !== null && newTask.trim() !== '') {
    tasks[index] = newTask.trim();
    saveTasks();
    renderTasks();
  }
}

// Render the initial tasks on page load
renderTasks();
