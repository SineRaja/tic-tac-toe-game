// Import the gameWindow function from the main module
const { gameWindow } = require('./main');

// Import the app module from Electron
const { app } = require('electron');

// Enable automatic reloading of the Electron app during development
require('electron-reload')(__dirname);

// Allow reuse of renderer processes for better performance
app.allowRendererProcessReuse = true;

// Wait for the app to be ready before creating and displaying the game window
app.whenReady().then(gameWindow);
