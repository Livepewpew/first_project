# first_project
Dette et mitt svar på ekamensoppgaven hvor vi skulle lage en nettside for FRAM 

Den inkluderer:
En hovedside som viser frem tjenesten og noen produkter
En produktoppføringsside for en oversikt over tilgjengelige produkter
Et kontakt oss-skjema kan brukere ta kontakt
En AI-drevet chatbot for kundeservice som svarer på spørsmål om tjenesten og partnerfarmene

Siden hjelper å koble brukere til gårder i nærheten som har produkter de kan selge direkte til dem og skal kunne gi all informasjon man skulle trenge til dette.

Hoved siden har mye å se på og har oversikt over det meste siden har å tilby. Man kan navigere seg til en API drevet chatboks og en produktside ved å trykke på hamburgermenyen oppe i venstre hjørne. På hovedsiden og produktsiden ligger det et form man kan skive seg opp til nyhetsbrev gjennom. 

Jeg har brukt Alt tekst på alle bilder, som har blitt gjemt med .visually hidden. 
Generelt gjort mitt beste på å skrive sematic html. 

For å bruke API chatboksenmå man ha sin egen API nøkkel og lime den inn i server.js inn her: 
const OPENAI_API_KEY = 'DIN-API-NØKKEL'; 


Måten jeg løste API floken gjennom ChatGPT:

It seems like you're attempting to use the OpenAI API directly in the browser. However, there are a few things that might be causing issues:

1.	Exposing API keys: It's a security risk to expose your OpenAI API key in frontend JavaScript because anyone can access it by inspecting your page's source. You should not include the key in your frontend code. Instead, you should route requests through a backend server that securely handles your API key.

2.	API Request: The OpenAI object in your code seems to be undefined because it’s not properly imported from a module. If you're trying to use the OpenAI API, you will need to properly install the package, and even then, you should use a server to make the request to OpenAI.

Suggested Approach:

1.	Set Up Backend: You should handle the request to OpenAI via a backend (using Node.js, for example).

2.	Communicate between frontend and backend: Your frontend should send a request to the backend, which will then send a request to OpenAI and return the response.
How to Fix:

Backend Code (Node.js Example with Express):
This will be the server handling your OpenAI API request securely.