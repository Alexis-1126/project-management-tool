let tasks = [];

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

// Render Data table
function renderDataTable() {
  
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();

  const tableData = tasks.map((task) => ([
    task.id,
    task.name,
    task.start,
    task.end,
    task.progress + '%',
  ]));

  const columns = [
    'ID',
    'Task Name',
    'Start Date',
    'End Date',
    'Progress',
  ];

  new DataTable('#data-table', {
    columns,
    data: tableData,
    layout: 'fixed', // or 'fluid' for responsive design
    noDataMessage: 'No tasks available.',
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
      id: `Task-${Date.now()}`,
      name,
      start,
      end,
      progress: 0,
      dependencies: '',
    };

    tasks.push(newTask);
    saveTasks(); // Save tasks to localStorage
    renderDataTable();  // Update data table

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
