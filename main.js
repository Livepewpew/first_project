

function openNav() {
  document.getElementById("mySidenav").style.width = "450px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function handleFormSubmit(event) {
  event.preventDefault();  // Prevents the form from reloading the page

  // Hide the form
  document.getElementById('form-container').style.display = 'none';

  // Show the thank-you message
  document.getElementById('thank-you-message').style.display = 'block';
}

// Chatbox
const sendButton = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const chatboxBody = document.getElementById('chatbox-body');

// Send message function
async function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    // Create message div
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('user-message');
    messageDiv.textContent = message;

    // Append message to chatbox
    chatboxBody.appendChild(messageDiv);

    // Scroll to bottom
    chatboxBody.scrollTop = chatboxBody.scrollHeight;

    // Clear input field
    messageInput.value = '';

    // Change send button icon to 'X'
    const sendIcon = document.getElementById('sendIcon');
    sendIcon.classList.remove('fa-arrow-up');
    sendIcon.classList.add('fa-times');

    // Add a loading message to indicate waiting for bot's response
    const loadingMessageDiv = document.createElement('div');
    loadingMessageDiv.classList.add('bot-message', 'loading');
    loadingMessageDiv.textContent = '...'; // Display "..."
    chatboxBody.appendChild(loadingMessageDiv);

    // Make request to the backend (which will call OpenAI)
    try {
      const response = await fetch('http://localhost:3000/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: message })
      });

      const data = await response.json();

      // Process OpenAI's response and append to chatbox
      const botMessageDiv = document.createElement('div');
      botMessageDiv.classList.add('bot-message');
      botMessageDiv.textContent = data.answer; // Assuming "answer" is the key
      chatboxBody.appendChild(botMessageDiv);

      // Scroll to bottom
      chatboxBody.scrollTop = chatboxBody.scrollHeight;

      // Reset the button icon back to the send arrow
      sendIcon.classList.remove('fa-times');
      sendIcon.classList.add('fa-arrow-up');

    } catch (error) {
      console.error('Error fetching from backend:', error);
    }
  }
}

// Event listener for button click
sendButton.addEventListener('click', sendMessage);

// Event listener for pressing the Enter key in the input field
messageInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});


// Map API
/*
// Initialize the map and set its view to a specific location (latitude, longitude)
var map = L.map('map').setView([51.505, -0.09], 13); // Coordinates for London, 13 zoom level


// Add a tile layer to the map (background map tiles)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

*/