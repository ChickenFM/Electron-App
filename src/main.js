const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const openAboutWindow = require('about-window').default

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  console.log('ready!')
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: true,
    width: 400,
    height: 600,
    frame: true,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
        nodeIntegration: true
      },
    resizable: true
  });

  if(process.platform !== 'darwin'){
      mainWindow.removeMenu()
  }

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  if (process.platform === 'darwin') {

    template = [{
      label: 'ChickenFM',
      submenu: [{
        label: 'About ChickenFM',
        click: () => {
          openAboutWindow({
            icon_path: path.join(__dirname, "icons/default.png"),
            product_name: "ChickenFM",
            copyright: "TheChicken/Wisse Hes",
            homepage: "https://chickenfm.com",
            description: "Desktop app for ChickenFM",
            //css_path?: string | string[];
            //adjust_window_size?: boolean;
            win_options: mainWindow,
            use_version_info: true,
            //show_close_button: string;
        })
        }
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    mainWindow.setMenu(null);
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})