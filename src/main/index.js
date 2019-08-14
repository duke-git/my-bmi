import { app, BrowserWindow } from 'electron'
const electron = require('electron');
const path = require('path');
const Menu = electron.Menu;
const Tray = electron.Tray;
let appTray = null;
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
  })
  mainWindow.setMenu(null)
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  let trayMenu = [
    {
      label: '退出应用',
      click: function () {
        app.quit();
      }
    }
  ]

  //系统托盘图标目录
  let trayIcon = path.join(__dirname, '../../static');
  appTray = new Tray(path.join(trayIcon, 'app.ico'));
  const contextMenu = Menu.buildFromTemplate(trayMenu);
  appTray.setToolTip('我的BMI');
  appTray.setContextMenu(contextMenu);
  appTray.on('click', function () {
    mainWindow.show();
  });
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
