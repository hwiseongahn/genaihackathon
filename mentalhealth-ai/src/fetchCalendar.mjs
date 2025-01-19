import readline from 'readline';
import { google } from 'googleapis';
import fs from 'fs';

// Path to your credentials.json
const CREDENTIALS_PATH = './assets/credentials.json';
// Path to token.json where the access/refresh token will be stored
const TOKEN_PATH = './token.json';

// Function to authenticate the app
async function authenticate() {
  // Load credentials
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const { client_secret, client_id, redirect_uris } = credentials.web;

  // Create an OAuth2 client
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if token already exists
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    oAuth2Client.setCredentials(token);
    console.log('Authenticated using saved token.');
    return oAuth2Client;
  }

  // If no token exists, get a new one
  return getAccessToken(oAuth2Client);
}

// Function to get and save a new access token
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
  });

  console.log('Authorize this app by visiting this URL:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          reject(new Error('Error retrieving access token: ' + err));
          return;
        }
        oAuth2Client.setCredentials(token);

        // Save the token for future use
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to:', TOKEN_PATH);

        resolve(oAuth2Client);
      });
    });
  });
}

// Function to fetch Google Calendar events
async function fetchCalendarEvents() {
  try {
    const auth = await authenticate();
    const calendar = google.calendar({ version: 'v3', auth});

    // Fetch events from the user's calendar
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    // Structure the events as required
    const events = {
      items: response.data.items.map(event => ({
        summary: event.summary,
        start: event.start,
        end: event.end,
      })),
    };

    // Write the events to googlecalendar.json
    fs.writeFileSync('./assets/googlecalendar.json', JSON.stringify(events, null, 2));

    console.log('Events saved to googlecalendar.json');
  } catch (error) {
    console.error('Error fetching calendar events:', error);
  }
}

fetchCalendarEvents();
