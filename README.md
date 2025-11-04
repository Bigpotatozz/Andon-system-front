# Andon System Frontend

## Description  
This frontend component of the [translate:Andon System] is a configurable production line monitoring interface built using React with TypeScript, Flowbite for UI components, and Chart.js for data visualization. It allows uploading audio files, setting production line statuses with color codes, assigning weights to statuses, and attaching alert sounds. The frontend supports real-time monitoring and alerting within manufacturing environments. It works offline and includes a Progressive Web App (PWA) for offline-capable client access. Inputs can come from physical button panels connected through PLCs or virtual buttons on the interface. All interactions and events are managed via API and stored persistently in the backend database.

## Installation  
1. Clone the repository:  
   `git clone https://github.com/your-username/andon-frontend.git`  
2. Install dependencies:  
   `npm install`  
3. Start the development server:  
   `npm start`  

## Usage  
- Upload audio files through the UI/API to associate sounds with production line events.  
- Monitor production line statuses with color coding and visual charts.  
- Use physical button panels connected through PLCs or virtual buttons in the web interface to update statuses.  
- Receive alert sounds based on assigned status weights.  
- Works fully offline with the included PWA implementation.  

## Configuration  
- UI components are styled with Flowbite.  
- Charts displaying production data use Chart.js.  
- Status colors, weights, and alert sounds are configurable through the UI.  
