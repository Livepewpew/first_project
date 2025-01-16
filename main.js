
// Side nav i header
function openNav() {
  document.getElementById("mySidenav").style.width = "450px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


// Form med imputs i footer
function handleFormSubmit(event) {
  event.preventDefault();  // Gjør at siden ikke reloader

  // Gjemmer form
  document.getElementById('form-container').style.display = 'none';

  // Viser takk melding
  document.getElementById('thank-you-message').style.display = 'block';
}


// Chatboks
const sendButton = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const chatboxBody = document.getElementById('chatbox-body');

// Meldingsfunksjon
async function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {

    // Lag melding div
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('user-message');
    messageDiv.textContent = message;

    // Append til chatboks
    chatboxBody.appendChild(messageDiv);

    // Scroll to bunn
    chatboxBody.scrollTop = chatboxBody.scrollHeight;

    // Rens input field
    messageInput.value = '';

    // Endrer send knapp icon til 'X'
    const sendIcon = document.getElementById('sendIcon');
    sendIcon.classList.remove('fa-arrow-up');
    sendIcon.classList.add('fa-times');

    // ... mens man venter
    const loadingMessageDiv = document.createElement('div');
    loadingMessageDiv.classList.add('bot-message', 'loading');
    loadingMessageDiv.textContent = '...'; // Display "..."
    chatboxBody.appendChild(loadingMessageDiv);

    // Forespørsel til backend (call på OpenAI)
    try {
      const response = await fetch('http://localhost:3000/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: message })
      });

      const data = await response.json();

      // Processerer OpenAI sitt svar og append til chatboks
      const messageContainer = document.createElement('div');
      const botResponse = document.createElement('p');
      const botLogo = document.createElement('h4');
      botLogo.style.display = 'inline-block';  

      messageContainer.classList.add('message-container');
      botResponse.classList.add('startmessage');
      botLogo.classList.add('logo');

      messageContainer.appendChild(botResponse);
      messageContainer.appendChild(botLogo);

      botResponse.textContent = data.answer; // Anntar at "answer" er nøkkelen

      chatboxBody.appendChild(messageContainer);

      // Scroll til bunn
      chatboxBody.scrollTop = chatboxBody.scrollHeight;
      loadingMessageDiv.remove();

      // Bytter icon tilbake til pil fra X
      sendIcon.classList.remove('fa-times');
      sendIcon.classList.add('fa-arrow-up');

    } catch (error) {
      console.error('Error fetching from backend:', error);
    }
  }
}

// Event listener knappe
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