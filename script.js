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