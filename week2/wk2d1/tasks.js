const fs = require('fs').promises;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const loadTasks = async () => {
  try {
    const data = await fs.readFile('tasks.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return {}; 
  }
};

const saveTasks = async (tasks) => {
  try {
    await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (err) {
    console.log("Error saving tasks.");
  }
};

const addTask = async (task) => {
  const tasks = await loadTasks();
  id = Object.keys(tasks).length + 1;
  tasks[id] = task;     
  await saveTasks(tasks);
  console.log(`Task "${task}" added successfully!`);
  showMenu();
};

const listTasks = async () => {
  const tasks = await loadTasks();
  if (Object.keys(tasks).length === 0) {
    console.log("No tasks found.");
  } else {
    console.log("Your tasks:");
    Object.entries(tasks).forEach(([id, task]) => {
      console.log(`${id}: ${task}`);
    });
  }
  showMenu();
};

const removeTask = async (id) => {
  const tasks = await loadTasks();
  if (tasks[id]) {
    const keys = Object.keys(tasks);
    if(id == keys.length)
      delete tasks[id];
    else{
      for (let i = keys.indexOf(id) + 1; i < keys.length; i++) {
          const currentKey = keys[i];
          tasks[currentKey - 1] = tasks[currentKey]; 
          delete tasks[currentKey];
      }
    }
    await saveTasks(tasks);
    console.log(`Task "${id}" removed successfully!`);
  } else {
    console.log("Invalid task ID.");
  }
  showMenu();
};

const showMenu = () => {
  console.log("\nTask Manager CLI App");
  console.log("1. Add Task");
  console.log("2. List Tasks");
  console.log("3. Remove Task");
  console.log("4. Exit");

  rl.question("Choose an option: ", (choice) => {
    switch (choice) {
      case '1':
        rl.question("Enter the task description: ", async (task) => {
          await addTask(task);
        });
        break;
      case '2':
        listTasks();
        break;
      case '3':
        rl.question("Enter the task ID to remove: ", async (taskId) => {
          await removeTask(taskId);
        });
        break;
      case '4':
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid option. Please choose a valid option.");
        showMenu();
    }
  });
};

showMenu();
