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
            
            // Create checkbox for completion
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    taskSpan.style.textDecoration = 'line-through';
                    taskSpan.style.color = '#7f8c8d';
                } else {
                    taskSpan.style.textDecoration = 'none';
                    taskSpan.style.color = 'black';
                }
            });
            
            // Create task text span
            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;
            taskSpan.className = 'task-text';
            
            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-task';
            deleteBtn.addEventListener('click', function() {
                li.remove();
            });
            
            // Add elements to list item
            li.appendChild(checkbox);
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
// Weather API functionality
function setupWeather() {
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeather');
    const weatherResult = document.getElementById('weatherResult');
    
    // API key for OpenWeatherMap (this is a free API)
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
        
        console.log("Fetching from:", apiUrl); // Add this to debug
        
        // Fetch data from the API
        fetch(apiUrl)
            .then(function(response) {
                console.log("Response status:", response.status); // Add this to debug
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
                console.log("Received data:", data); // Add this to debug
                // We got the data! Now display it
                displayWeatherData(data);
            })
            .catch(function(error) {
                // Handle any errors that occurred
                console.error("Error:", error); // Add this to debug
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
// Add this test function
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
// KEEP ONLY THIS ONE DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log("Website loaded!");
    document.querySelector('h1').style.color = '#e74c3c';
    setupCounter();
    setupTodoList();
    setupWeather();
    setupUserDirectory(); // Add this line instead of setupWeather


});