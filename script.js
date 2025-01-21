// import Gantt from "frappe-gantt";

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

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
