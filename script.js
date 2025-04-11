/**
 * Web Application with multiple features:
 * - Message display with color change
 * - Counter with increment/decrement
 * - Todo list with localStorage persistence
 * - Weather information retrieval from API
 * - User directory using JSONPlaceholder API
 * - Task tracker with time tracking functionality
 */

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

// To-Do List functionality
function setupTodoList() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const clearTasksBtn = document.getElementById('clearTasks');
    
    // Track tasks in an array
    let tasks = [];
    
    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }
    
    // Function to load tasks from localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('todoTasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            renderTasks();
        }
    }
    
    // Function to render tasks to the DOM
    function renderTasks() {
        // Clear the current list
        taskList.innerHTML = '';
        
        // Add each task to the list
        tasks.forEach(function(task) {
            addTaskToDOM(task);
        });
    }
    
    // Function to add a task to the DOM
    function addTaskToDOM(task) {
        // Create new list item
        const li = document.createElement('li');
        
        // Create checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            task.completed = this.checked;
            if (this.checked) {
                taskSpan.style.textDecoration = 'line-through';
                taskSpan.style.color = '#7f8c8d';
            } else {
                taskSpan.style.textDecoration = 'none';
                taskSpan.style.color = 'black';
            }
            saveTasks();
        });
        
        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        taskSpan.className = 'task-text';
        // Apply styling based on completion status
        if (task.completed) {
            taskSpan.style.textDecoration = 'line-through';
            taskSpan.style.color = '#7f8c8d';
        }
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-task';
        deleteBtn.addEventListener('click', function() {
            // Remove from DOM
            li.remove();
            // Remove from array
            const index = tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });
        
        // Add elements to list item
        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        
        // Add list item to task list
        taskList.appendChild(li);
    }
    
    // Add event listeners
    addTaskBtn.addEventListener('click', function() {
        addNewTask();
    });
    
    // Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewTask();
        }
    });
    
    // Function to add a new task
    function addNewTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            // Create a new task object
            const task = {
                id: Date.now(), // Use timestamp as a unique ID
                text: taskText,
                completed: false
            };
            
            // Add to our array
            tasks.push(task);
            
            // Save to localStorage
            saveTasks();
            
            // Add to DOM
            addTaskToDOM(task);
            
            // Clear the input
            taskInput.value = '';
            
            // Focus back on the input
            taskInput.focus();
        }
    }
    
    // Add Clear All functionality if you have that button
    if (clearTasksBtn) {
        clearTasksBtn.addEventListener('click', function() {
            // Confirm before clearing
            if (tasks.length > 0 && confirm('Are you sure you want to delete all tasks?')) {
                // Clear the array
                tasks = [];
                // Save empty array to localStorage
                saveTasks();
                // Clear the DOM
                taskList.innerHTML = '';
            }
        });
    }
    
    // Load tasks when the page loads
    loadTasks();
}

// Weather API functionality
function setupWeather() {
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeather');
    const weatherResult = document.getElementById('weatherResult');
    
    // API key for OpenWeatherMap
    const apiKey = 'dcc4929166ab5bbb8e5dde80ca25f24b';
    
    getWeatherBtn.addEventListener('click', function() {
        fetchWeatherData();
    });
    
    // Allow pressing Enter to search
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            fetchWeatherData();
        }
    });
    
    function fetchWeatherData() {
        const city = cityInput.value.trim();
        
        if (city === '') {
            // If no city is entered, show an error
            weatherResult.style.display = 'block';
            weatherResult.innerHTML = '<p class="weather-error">Please enter a city name</p>';
            return;
        }
        
        // Show loading message
        weatherResult.style.display = 'block';
        weatherResult.innerHTML = '<p class="weather-loading">Loading weather data...</p>';
        
        // Create the API URL with the city and API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        console.log("Fetching from:", apiUrl);
        
        // Fetch data from the API
        fetch(apiUrl)
            .then(function(response) {
                console.log("Response status:", response.status);
                // Check if the response is okay (status code 200-299)
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('City not found. Please check the spelling.');
                    } else if (response.status === 401) {
                        throw new Error('API key issue. Please try again later.');
                    } else {
                        throw new Error('Server error. Please try again later.');
                    }
                }
                // Parse the JSON data from the response
                return response.json();
            })
            .then(function(data) {
                console.log("Received data:", data);
                // We got the data! Now display it
                displayWeatherData(data);
            })
            .catch(function(error) {
                // Handle any errors that occurred
                console.error("Error:", error);
                weatherResult.innerHTML = `<p class="weather-error">Error: ${error.message}</p>`;
            });
    }
    
    function displayWeatherData(data) {
        // Extract relevant data from the API response
        const cityName = data.name;
        const country = data.sys.country;
        const temperature = Math.round(data.main.temp); // Round to whole number
        const feelsLike = Math.round(data.main.feels_like);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        
        // Create the HTML to display the weather
        const weatherHTML = `
            <h3>${cityName}, ${country}</h3>
            <div class="weather-data">
                <div class="weather-temp">${temperature}°C</div>
                <div class="weather-details">
                    <p>${description}</p>
                    <p>Feels like: ${feelsLike}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind: ${windSpeed} m/s</p>
                </div>
            </div>
        `;
        
        // Update the weather result div with the HTML
        weatherResult.innerHTML = weatherHTML;
    }
    
    // Test API function
    function testAPI() {
        const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
        console.log("Testing API with:", testUrl);
        
        fetch(testUrl)
            .then(response => {
                console.log("Test response status:", response.status);
                console.log("Test response ok:", response.ok);
                return response.json();
            })
            .then(data => {
                console.log("Test data received:", data);
            })
            .catch(error => {
                console.error("Test error:", error);
            });
    }
    
    // Call the test function when the page loads
    testAPI();    
}

// User Directory functionality using JSONPlaceholder API
function setupUserDirectory() {
    const loadUsersBtn = document.getElementById('loadUsers');
    const usersList = document.getElementById('usersList');
    
    loadUsersBtn.addEventListener('click', function() {
        loadUsers();
    });
    
    function loadUsers() {
        // Show loading message
        usersList.innerHTML = '<p>Loading users...</p>';
        
        // Fetch users from JSONPlaceholder API
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(function(response) {
                console.log("Users API response status:", response.status);
                
                if (!response.ok) {
                    throw new Error('Failed to load users');
                }
                
                return response.json();
            })
            .then(function(users) {
                console.log("Received users data:", users);
                displayUsers(users);
            })
            .catch(function(error) {
                console.error("Error loading users:", error);
                usersList.innerHTML = `<p class="weather-error">Error: ${error.message}</p>`;
            });
    }
    
    function displayUsers(users) {
        // Clear previous content
        usersList.innerHTML = '';
        
        // Create a card for each user
        users.forEach(function(user) {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            
            // Create user information HTML
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <div class="user-details">
                    <p><strong>Username:</strong> ${user.username}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Website:</strong> ${user.website}</p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                    <p><strong>Address:</strong> ${user.address.city}</p>
                </div>
                <button class="show-posts-btn" data-user-id="${user.id}">Show Posts</button>
                <div class="user-posts" id="posts-${user.id}"></div>
            `;
            
            usersList.appendChild(userCard);
        });
        
        // Add event listeners to "Show Posts" buttons
        document.querySelectorAll('.show-posts-btn').forEach(function(button) {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                loadUserPosts(userId);
            });
        });
    }
    
    function loadUserPosts(userId) {
        const postsContainer = document.getElementById(`posts-${userId}`);
        
        // Show loading message
        postsContainer.innerHTML = '<p>Loading posts...</p>';
        
        // Fetch posts for the specified user
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(function(response) {
                console.log("Posts API response status:", response.status);
                
                if (!response.ok) {
                    throw new Error('Failed to load posts');
                }
                
                return response.json();
            })
            .then(function(posts) {
                console.log(`Received posts for user ${userId}:`, posts);
                displayUserPosts(postsContainer, posts);
            })
            .catch(function(error) {
                console.error(`Error loading posts for user ${userId}:`, error);
                postsContainer.innerHTML = `<p class="weather-error">Error: ${error.message}</p>`;
            });
    }
    
    function displayUserPosts(container, posts) {
        // Clear previous content
        container.innerHTML = '';
        
        // Show message if no posts
        if (posts.length === 0) {
            container.innerHTML = '<p>No posts found for this user.</p>';
            return;
        }
        
        // Create a list of posts
        posts.forEach(function(post) {
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            
            postElement.innerHTML = `
                <div class="post-title">${post.title}</div>
                <div class="post-body">${post.body}</div>
            `;
            
            container.appendChild(postElement);
        });
    }
}

// Task Tracker functionality
function setupTaskTracker() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const activeTaskList = document.getElementById('activeTaskList');
    const archivedTaskList = document.getElementById('archivedTaskList');
    const showActiveBtn = document.getElementById('showActive');
    const showArchivedBtn = document.getElementById('showArchived');
    const clearTasksBtn = document.getElementById('clearTasks');
    
    // Track tasks in an array
    let tasks = [];
    
    // Timer for updating running tasks
    let timerInterval = null;
    
    // Function to start the timer interval
    function startTimerInterval() {
      // Clear any existing interval
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      
      // Update every second
      timerInterval = setInterval(() => {
        // Update time for any running tasks
        const now = Date.now();
        let updated = false;
        
        tasks.forEach(task => {
          if (task.isRunning && task.startTime) {
            const elapsed = Math.floor((now - task.startTime) / 1000);
            task.timeSpent += elapsed;
            task.startTime = now;
            updated = true;
          }
        });
        
        // If any tasks were updated, save and render
        if (updated) {
          saveTasks();
          renderTasks();
        }
      }, 1000);
    }
    
    // Function to save tasks to localStorage
    function saveTasks() {
      localStorage.setItem('timeTrackerTasks', JSON.stringify(tasks));
    }
    
    // Function to load tasks from localStorage
    function loadTasks() {
      const savedTasks = localStorage.getItem('timeTrackerTasks');
      tasks = savedTasks ? JSON.parse(savedTasks) : [];
      
      // Make sure running tasks are properly restarted
      const now = Date.now();
      tasks.forEach(task => {
        if (task.isRunning) {
          task.startTime = now;
        }
      });
      
      renderTasks();
    }
    
    // Function to format time as HH:MM:SS
    function formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      
      return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0')
      ].join(':');
    }
    
    // Function to render tasks to the DOM
    function renderTasks() {
      // Clear the current lists
      activeTaskList.innerHTML = '';
      archivedTaskList.innerHTML = '';
      
      // Add each task to the appropriate list
      tasks.forEach(task => {
        const container = task.archived ? archivedTaskList : activeTaskList;
        
        // Create task item
        const taskEl = document.createElement('div');
        taskEl.className = 'task-item';
        
        // Add checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
          task.completed = checkbox.checked;
          if (task.isRunning && task.completed) {
            task.isRunning = false;
            task.startTime = null;
          }
          saveTasks();
          renderTasks();
        });
        
        // Create task text
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        if (task.completed) taskText.classList.add('completed');
        taskText.textContent = task.text;
        
        // Create time display
        const timeDisplay = document.createElement('span');
        timeDisplay.className = 'task-time';
        timeDisplay.textContent = formatTime(task.timeSpent);
        
        // Create timer buttons container
        const timerButtons = document.createElement('div');
        timerButtons.className = 'timer-buttons';
        
        if (!task.archived) {
          // Start button (only show if not running)
          if (!task.isRunning && !task.completed) {
            const startBtn = document.createElement('button');
            startBtn.className = 'timer-button start-button';
            startBtn.textContent = 'Start';
            startBtn.addEventListener('click', () => {
              task.isRunning = true;
              task.startTime = Date.now();
              saveTasks();
              renderTasks();
            });
            timerButtons.appendChild(startBtn);
          }
          
          // Pause button (only show if running)
          if (task.isRunning) {
            const pauseBtn = document.createElement('button');
            pauseBtn.className = 'timer-button pause-button';
            pauseBtn.textContent = 'Pause';
            pauseBtn.addEventListener('click', () => {
              task.isRunning = false;
              task.startTime = null;
              saveTasks();
              renderTasks();
            });
            timerButtons.appendChild(pauseBtn);
          }
          
          // Archive button
          const archiveBtn = document.createElement('button');
          archiveBtn.className = 'timer-button stop-button';
          archiveBtn.textContent = 'Archive';
          archiveBtn.addEventListener('click', () => {
            task.archived = true;
            if (task.isRunning) {
              task.isRunning = false;
              task.startTime = null;
            }
            saveTasks();
            renderTasks();
          });
          timerButtons.appendChild(archiveBtn);
        } else {
          // Restore button (for archived tasks)
          const restoreBtn = document.createElement('button');
          restoreBtn.className = 'timer-button restore-button';
          restoreBtn.textContent = 'Restore';
          restoreBtn.addEventListener('click', () => {
            task.archived = false;
            saveTasks();
            renderTasks();
          });
          timerButtons.appendChild(restoreBtn);
        }
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'timer-button stop-button';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
          tasks = tasks.filter(t => t.id !== task.id);
          saveTasks();
          renderTasks();
        });
        timerButtons.appendChild(deleteBtn);
        
        // Assemble task item
        taskEl.appendChild(checkbox);
        taskEl.appendChild(taskText);
        taskEl.appendChild(timeDisplay);
        taskEl.appendChild(timerButtons);
        
        // Add to appropriate container
        container.appendChild(taskEl);
      });
    }
    
    // Add event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') addTask();
    });
    
    // Show active tasks
    showActiveBtn.addEventListener('click', () => {
      activeTaskList.classList.remove('hidden');
      archivedTaskList.classList.add('hidden');
      showActiveBtn.classList.add('active');
      showArchivedBtn.classList.remove('active');
    });
    
    // Show archived tasks
    showArchivedBtn.addEventListener('click', () => {
      activeTaskList.classList.add('hidden');
      archivedTaskList.classList.remove('hidden');
      showActiveBtn.classList.remove('active');
      showArchivedBtn.classList.add('active');
    });
    
    // Clear all tasks
    clearTasksBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete all tasks?')) {
        tasks = [];
        saveTasks();
        renderTasks();
      }
    });
    
    // Function to add a new task
    function addTask() {
      const text = taskInput.value.trim();
      if (text === '') return;
      
      // Create a new task
      const task = {
        id: Date.now(),
        text: text,
        completed: false,
        timeSpent: 0,
        isRunning: false,
        startTime: null,
        archived: false
      };
      
      // Add to array
      tasks.push(task);
      
      // Save to localStorage
      saveTasks();
      
      // Render tasks
      renderTasks();
      
      // Clear input
      taskInput.value = '';
      taskInput.focus();
    }
    
    // Load saved tasks when the page loads
    loadTasks();
    
    // Start the timer update interval
    startTimerInterval();
    
    // Clean up interval when page unloads
    window.addEventListener('beforeunload', () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    });
}

// Main initialization - Single event listener for all features
document.addEventListener('DOMContentLoaded', function() {
    console.log("Website loaded!");
    
    // Set header color
    const header = document.querySelector('h1');
    if (header) {
        header.style.color = '#e74c3c';
    }
    
    // Initialize all components
    // You can comment out any component you don't need
    setupCounter();
    
    // Detect which list feature to use - only enable one
    const taskTrackerElements = document.getElementById('activeTaskList');
    const todoListElements = document.getElementById('taskList');
    
    if (taskTrackerElements) {
        // Initialize task tracker if those elements exist
        setupTaskTracker();
    } else if (todoListElements) {
        // Otherwise initialize todo list if those elements exist
        setupTodoList();
    }
    
    // Initialize other components
    setupWeather();
    setupUserDirectory();
});