// import Gantt from "frappe-gantt";

//window.onload = function() {

let tasks = [];
let gantt;

// Load tasks from localStorage or initialize an empty array
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  } else {
    tasks = [];
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render Gantt Chart
function renderGanttChart() {
  gantt.setup_tasks(tasks);
}

// Add a new task
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  gantt = new Gantt('#gantt', tasks, {
    container_height: 500,
    on_click: (task) => console.log('Clicked on:', task),
    on_date_change: (task, start, end) => {
      updateTask(task.id, { start, end });
    },
    on_progress_change: (task, progress) => {
      updateTask(task.id, { progress });
    },
  });

  const addTaskButton = document.getElementById('add-task');
  addTaskButton.addEventListener('click', () => {
    const name = document.getElementById('task-name').value;
    const start = document.getElementById('task-start').value;
    const end = document.getElementById('task-end').value;

    if (!name || !start || !end) {
      alert('Please fill out all fields.');
      return;
    }

    const newTask = {
      id: `Task-${Date.now()}`, // Unique ID
      name,
      start,
      end,
      progress: 0,
      dependencies: '',
    };

    tasks.push(newTask);
    saveTasks(); // Save tasks to localStorage
    renderGanttChart(); // Re-render the Gantt chart

    // Clear input fields
    document.getElementById('task-name').value = '';
    document.getElementById('task-start').value = '';
    document.getElementById('task-end').value = '';
  });
});

// Update a task
function updateTask(taskId, updates) {
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    saveTasks(); // Save updates to localStorage
    console.log(`Task updated: ${JSON.stringify(tasks[taskIndex])}`);
  }
}
