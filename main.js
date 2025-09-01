const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Carregar o backend JavaScript
const databaseLib = require('./backend/database');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'assets/icon.png')
    });

    mainWindow.loadFile('renderer/index.html');
    
    // Abrir DevTools em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
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

// Handlers IPC para comunicação com o backend C++

ipcMain.handle('create-table', async (event, tableName, columns) => {
    try {
        const result = databaseLib.createTable(tableName, columns);
        return { success: result, message: result ? 'Tabela criada com sucesso!' : 'Erro ao criar tabela' };
    } catch (error) {
        return { success: false, message: `Erro: ${error.message}` };
    }
});

ipcMain.handle('insert-data', async (event, tableName, values) => {
    try {
        const result = databaseLib.insertData(tableName, values);
        return { success: result, message: result ? 'Dados inseridos com sucesso!' : 'Erro ao inserir dados' };
    } catch (error) {
        return { success: false, message: `Erro: ${error.message}` };
    }
});

ipcMain.handle('select-data', async (event, tableName, condition = '') => {
    try {
        const data = databaseLib.selectData(tableName, condition);
        return { success: true, data: data };
    } catch (error) {
        return { success: false, message: `Erro: ${error.message}` };
    }
});

ipcMain.handle('list-tables', async (event) => {
    try {
        const tables = databaseLib.listTables();
        return { success: true, tables: tables };
    } catch (error) {
        return { success: false, message: `Erro: ${error.message}` };
    }
});

ipcMain.handle('get-table-structure', async (event, tableName) => {
    try {
        const columns = databaseLib.getTableStructure(tableName);
        return { success: true, columns: columns };
    } catch (error) {
        return { success: false, message: `Erro: ${error.message}` };
    }
});

ipcMain.handle('drop-table', async (event, tableName) => {
    try {
        const result = databaseLib.dropTable(tableName);
        return { success: result, message: result ? 'Tabela removida com sucesso!' : 'Erro ao remover tabela' };
    } catch (error) {
        return { success: false, message: `Erro: ${error.message}` };
    }
});
