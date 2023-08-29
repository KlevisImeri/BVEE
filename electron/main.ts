import { ipcMain, app, BrowserWindow, Menu, dialog, MenuItemConstructorOptions} from 'electron';
import * as path from 'path';
import fs from 'fs';
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']


function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'logo.jpg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })
  
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}


const openFile = async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
  });
  if (!result.canceled) {
    const filePath = result.filePaths[0];
    try {
      const fileContents = await fs.promises.readFile(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContents);

      const fileName = path.basename(filePath);
      win?.setTitle(fileName);

      win?.webContents.send('open-json-file', jsonData, filePath);
      
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
  }
};


const saveAsFile = async () => {
  const result = await dialog.showSaveDialog({
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
  });
  if (!result.canceled && result.filePath !== undefined) {
    const filePath = result.filePath;

    const fileName = path.basename(filePath);
    win?.setTitle(fileName);
    
    win?.webContents.send('saveAs-json-data', filePath);
    win?.webContents.removeAllListeners('saveAs-json-data');
  }
};

const generataPDF = async () => {
  if(win){
    const pdfPath = path.join(app.getPath('desktop'), 'output.pdf');
    const pdfData = await win.webContents.printToPDF(
      {
        landscape: true,
        printBackground: true, 
        pageSize: 'A4',
        scale: 0.7,
      });
    fs.writeFileSync(pdfPath, pdfData);
  }
}

ipcMain.on('saveAs-json-file', async (event, jsonData, filePath) => {
  const jsonString = JSON.stringify(jsonData, null, 2);
  try {
    await fs.promises.writeFile(filePath, jsonString, 'utf-8');
    event.reply('saveAs-file-path', filePath);
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
  ipcMain.removeAllListeners('saveAs-json-file');
});


ipcMain.on('save-json-file', (_event, jsonData, filePath) => {
  const jsonString = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(filePath, jsonString, 'utf-8');
  ipcMain.removeAllListeners('save-json-file');
});


function setMenuOptions(){
  const fileMenu: MenuItemConstructorOptions = {
    label: 'File',
    submenu: [
      {label: 'Open File', click: openFile },
      {label: 'Save As File', click: saveAsFile },
      {label: 'Export', click: generataPDF },
    ]
  };

  const otherMenuOptions: MenuItemConstructorOptions[] = [
    { role: 'editMenu' },
    { role: 'viewMenu' }, 
    { role: 'windowMenu' },
  ];

  const menuTemplate: MenuItemConstructorOptions[] = [
    fileMenu,
    ...otherMenuOptions,
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow()
  setMenuOptions()
})

app.on('window-all-closed', () => {
  win = null
})


declare interface ElectronAPI {
  generatePDF: () => void;
  openFileListener: (openFile: (jsonData: any, filePath: string) => void) => void;
  removeOpenFileListener: ()=> void;
  saveAsFileListener: (saveAsFile: (filePath: string) => void) => void;
  removeSaveAsFileListener: ()=> void;
  saveAsFile: (jsonData: any, filePath: string) => void;
  saveFile: (jsonData: any, filePath: string) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}



