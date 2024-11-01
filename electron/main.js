const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const { searchTelegram, searchRutracker } = require('./search');

const store = new Store();

// Configure search sources
const TELEGRAM_CHANNELS = [
  '@vst_plugins',
  '@audio_plugins',
  // Add more channels here
];

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for plugin data
ipcMain.handle('save-plugin', async (event, plugin) => {
  const plugins = store.get('plugins') || [];
  plugins.push({ ...plugin, id: Date.now() });
  store.set('plugins', plugins);
  return plugins;
});

ipcMain.handle('get-plugins', async () => {
  return store.get('plugins') || [];
});

ipcMain.handle('delete-plugin', async (event, pluginId) => {
  const plugins = store.get('plugins') || [];
  const updatedPlugins = plugins.filter(p => p.id !== pluginId);
  store.set('plugins', updatedPlugins);
  return updatedPlugins;
});

ipcMain.handle('search-plugins', async (event, query) => {
  try {
    const [telegramResults, rutrackerResults] = await Promise.all([
      searchTelegram(query, TELEGRAM_CHANNELS),
      searchRutracker(query)
    ]);

    return [...telegramResults, ...rutrackerResults];
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
});