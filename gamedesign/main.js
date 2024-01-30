// Import the BrowserWindow module from Electron
const { BrowserWindow } = require('electron');

// Declare a variable to store the window
let window;

// Function to create and display the game window
function gameWindow() {
    // Create a new BrowserWindow with specified properties
    window = new BrowserWindow({
        width: 800,                 // Width of the window
        height: 600,                // Height of the window
        modal: true,                // Make it a modal window
        webPreferences: {
            nodeIntegration: true,   // Enable Node.js integration in the renderer process
            contextIsolation: false  // Disable context isolation for simplicity
        }
    });

    // Load the HTML file for the game window
    window.loadFile('gamedesign/design/game.html');
}

// Export the function to make it accessible from other modules
module.exports = {
    gameWindow
};
