// This runs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Website loaded!");
    document.querySelector('h1').style.color = '#e74c3c';
});

// This function shows a message when called
function showMessage() {
    document.getElementById("message").textContent = "You clicked the button!";
    
    // Let's make it a bit more interactive
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById("message").style.color = randomColor;
}
// Counter functionality
let count = 0;

function setupCounter() {
    document.getElementById('increment').addEventListener('click', function() {
        count++;
        updateCounter();
    });
    
    document.getElementById('decrement').addEventListener('click', function() {
        count--;
        updateCounter();
    });
    
    document.getElementById('reset').addEventListener('click', function() {
        count = 0;
        updateCounter();
    });
}

function updateCounter() {
    document.getElementById('counter').textContent = count;
    // Change color based on value
    if (count > 0) {
        document.getElementById('counter').style.color = '#2ecc71';
    } else if (count < 0) {
        document.getElementById('counter').style.color = '#e74c3c';
    } else {
        document.getElementById('counter').style.color = '#2980b9';
    }
}

// Make sure to call setupCounter when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Website loaded!");
    document.querySelector('h1').style.color = '#e74c3c';
    setupCounter();
});
// To-Do List functionality
function setupTodoList() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    
    addTaskBtn.addEventListener('click', function() {
        addNewTask();
    });
    
    // Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewTask();
        }
    });
    
    function addNewTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            // Create new list item
            const li = document.createElement('li');
            
            // Create task text span
            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;
            
            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-task';
            deleteBtn.addEventListener('click', function() {
                li.remove();
            });
            
            // Add elements to list item
            li.appendChild(taskSpan);
            li.appendChild(deleteBtn);
            
            // Add list item to task list
            taskList.appendChild(li);
            
            // Clear the input
            taskInput.value = '';
            
            // Focus back on the input
            taskInput.focus();
        }
    }
}

// Update your DOMContentLoaded event to include the todo list setup
document.addEventListener('DOMContentLoaded', function() {
    console.log("Website loaded!");
    document.querySelector('h1').style.color = '#e74c3c';
    setupCounter();
    setupTodoList();
});