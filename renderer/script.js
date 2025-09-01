const { ipcRenderer } = require('electron');

// Elementos da interface
const elements = {
    // Tabelas
    tablesList: document.getElementById('tables-list'),
    refreshTables: document.getElementById('refresh-tables'),
    
    // Formulários
    createTableForm: document.getElementById('create-table-form'),
    tableName: document.getElementById('table-name'),
    tableColumns: document.getElementById('table-columns'),
    
    // Tabs
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Query
    queryTable: document.getElementById('query-table'),
    queryCondition: document.getElementById('query-condition'),
    executeQuery: document.getElementById('execute-query'),
    queryResults: document.getElementById('query-results'),
    
    // Insert
    insertTable: document.getElementById('insert-table'),
    insertFields: document.getElementById('insert-fields'),
    executeInsert: document.getElementById('execute-insert'),
    
    // Structure
    structureTable: document.getElementById('structure-table'),
    tableStructure: document.getElementById('table-structure'),
    dropTable: document.getElementById('drop-table'),
    
    // Status
    statusMessage: document.getElementById('status-message')
};

// Estado da aplicação
let currentTables = [];
let currentTableStructure = {};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

async function initializeApp() {
    showStatus('Inicializando...');
    await loadTables();
    showStatus('Pronto');
}

function setupEventListeners() {
    // Refresh tables
    elements.refreshTables.addEventListener('click', loadTables);
    
    // Create table form
    elements.createTableForm.addEventListener('submit', handleCreateTable);
    
    // Tab switching
    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Query
    elements.executeQuery.addEventListener('click', handleQuery);
    elements.queryTable.addEventListener('change', updateQueryTable);
    
    // Insert
    elements.insertTable.addEventListener('change', updateInsertTable);
    elements.executeInsert.addEventListener('click', handleInsert);
    
    // Structure
    elements.structureTable.addEventListener('change', updateStructureTable);
    elements.dropTable.addEventListener('click', handleDropTable);
}

// Tab Management
function switchTab(tabName) {
    // Remove active class from all tabs and contents
    elements.tabBtns.forEach(btn => btn.classList.remove('active'));
    elements.tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Table Management
async function loadTables() {
    try {
        showStatus('Carregando tabelas...');
        const result = await ipcRenderer.invoke('list-tables');
        
        if (result.success) {
            currentTables = result.tables;
            updateTablesList();
            updateTableSelects();
            showStatus(`${currentTables.length} tabela(s) carregada(s)`);
        } else {
            showError(result.message);
        }
    } catch (error) {
        showError('Erro ao carregar tabelas: ' + error.message);
    }
}

function updateTablesList() {
    if (currentTables.length === 0) {
        elements.tablesList.innerHTML = '<p class="no-data">Nenhuma tabela encontrada</p>';
        return;
    }
    
    elements.tablesList.innerHTML = currentTables.map(table => `
        <div class="table-item" data-table="${table}">
            <span class="table-name">${table}</span>
            <span class="table-count">0</span>
        </div>
    `).join('');
    
    // Add click listeners
    elements.tablesList.querySelectorAll('.table-item').forEach(item => {
        item.addEventListener('click', () => selectTable(item.dataset.table));
    });
}

function updateTableSelects() {
    const options = currentTables.map(table => 
        `<option value="${table}">${table}</option>`
    ).join('');
    
    const defaultOption = '<option value="">Selecione uma tabela</option>';
    
    elements.queryTable.innerHTML = defaultOption + options;
    elements.insertTable.innerHTML = defaultOption + options;
    elements.structureTable.innerHTML = defaultOption + options;
}

function selectTable(tableName) {
    // Remove active class from all table items
    elements.tablesList.querySelectorAll('.table-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected table
    const selectedItem = elements.tablesList.querySelector(`[data-table="${tableName}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
    }
    
    // Update selects
    elements.queryTable.value = tableName;
    elements.insertTable.value = tableName;
    elements.structureTable.value = tableName;
    
    // Update related sections
    updateQueryTable();
    updateInsertTable();
    updateStructureTable();
}

// Create Table
async function handleCreateTable(event) {
    event.preventDefault();
    
    const tableName = elements.tableName.value.trim();
    const columnsText = elements.tableColumns.value.trim();
    
    if (!tableName || !columnsText) {
        showError('Por favor, preencha todos os campos');
        return;
    }
    
    const columns = columnsText.split(',').map(col => col.trim()).filter(col => col);
    
    if (columns.length === 0) {
        showError('Por favor, especifique pelo menos uma coluna');
        return;
    }
    
    try {
        showStatus('Criando tabela...');
        const result = await ipcRenderer.invoke('create-table', tableName, columns);
        
        if (result.success) {
            showSuccess(result.message);
            elements.createTableForm.reset();
            await loadTables();
        } else {
            showError(result.message);
        }
    } catch (error) {
        showError('Erro ao criar tabela: ' + error.message);
    }
}

// Query Management
function updateQueryTable() {
    const tableName = elements.queryTable.value;
    if (tableName) {
        elements.executeQuery.disabled = false;
    } else {
        elements.executeQuery.disabled = true;
    }
}

async function handleQuery() {
    const tableName = elements.queryTable.value;
    const condition = elements.queryCondition.value.trim();
    
    if (!tableName) {
        showError('Por favor, selecione uma tabela');
        return;
    }
    
    try {
        showStatus('Executando consulta...');
        const result = await ipcRenderer.invoke('select-data', tableName, condition);
        
        if (result.success) {
            displayQueryResults(result.data, tableName);
            showStatus(`${result.data.length} registro(s) encontrado(s)`);
        } else {
            showError(result.message);
        }
    } catch (error) {
        showError('Erro ao executar consulta: ' + error.message);
    }
}

function displayQueryResults(data, tableName) {
    if (data.length === 0) {
        elements.queryResults.innerHTML = '<p class="no-data">Nenhum resultado encontrado</p>';
        return;
    }
    
    // Get table structure for headers
    const headers = data[0] || [];
    
    const tableHTML = `
        <table class="results-table">
            <thead>
                <tr>
                    ${headers.map(header => `<th>${header}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${data.slice(1).map(row => `
                    <tr>
                        ${row.map(cell => `<td>${cell}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    elements.queryResults.innerHTML = tableHTML;
}

// Insert Management
function updateInsertTable() {
    const tableName = elements.insertTable.value;
    
    if (!tableName) {
        elements.insertFields.innerHTML = '<p class="no-data">Selecione uma tabela para inserir dados</p>';
        elements.executeInsert.disabled = true;
        return;
    }
    
    loadTableStructure(tableName, 'insert');
}

async function loadTableStructure(tableName, type = 'insert') {
    try {
        const result = await ipcRenderer.invoke('get-table-structure', tableName);
        
        if (result.success) {
            currentTableStructure[tableName] = result.columns;
            
            if (type === 'insert') {
                displayInsertFields(result.columns);
            } else if (type === 'structure') {
                displayTableStructure(result.columns);
            }
        } else {
            showError(result.message);
        }
    } catch (error) {
        showError('Erro ao carregar estrutura da tabela: ' + error.message);
    }
}

function displayInsertFields(columns) {
    const fieldsHTML = columns.map(column => `
        <div class="field-group">
            <label for="field-${column}">${column}:</label>
            <input type="text" id="field-${column}" class="form-control" placeholder="Valor para ${column}">
        </div>
    `).join('');
    
    elements.insertFields.innerHTML = fieldsHTML;
    elements.executeInsert.disabled = false;
}

async function handleInsert() {
    const tableName = elements.insertTable.value;
    
    if (!tableName || !currentTableStructure[tableName]) {
        showError('Por favor, selecione uma tabela válida');
        return;
    }
    
    const columns = currentTableStructure[tableName];
    const values = columns.map(column => {
        const input = document.getElementById(`field-${column}`);
        return input ? input.value.trim() : '';
    });
    
    // Check if all required fields are filled
    if (values.some(value => value === '')) {
        showError('Por favor, preencha todos os campos');
        return;
    }
    
    try {
        showStatus('Inserindo dados...');
        const result = await ipcRenderer.invoke('insert-data', tableName, values);
        
        if (result.success) {
            showSuccess(result.message);
            // Clear form
            columns.forEach(column => {
                const input = document.getElementById(`field-${column}`);
                if (input) input.value = '';
            });
        } else {
            showError(result.message);
        }
    } catch (error) {
        showError('Erro ao inserir dados: ' + error.message);
    }
}

// Structure Management
function updateStructureTable() {
    const tableName = elements.structureTable.value;
    
    if (!tableName) {
        elements.tableStructure.innerHTML = '<p class="no-data">Selecione uma tabela para ver sua estrutura</p>';
        elements.dropTable.disabled = true;
        return;
    }
    
    loadTableStructure(tableName, 'structure');
}

function displayTableStructure(columns) {
    const structureHTML = columns.map(column => `
        <div class="column-item">
            <span class="column-name">${column}</span>
            <span class="column-type">TEXT</span>
        </div>
    `).join('');
    
    elements.tableStructure.innerHTML = structureHTML;
    elements.dropTable.disabled = false;
}

async function handleDropTable() {
    const tableName = elements.structureTable.value;
    
    if (!tableName) {
        showError('Por favor, selecione uma tabela');
        return;
    }
    
    if (!confirm(`Tem certeza que deseja remover a tabela "${tableName}"? Esta ação não pode ser desfeita.`)) {
        return;
    }
    
    try {
        showStatus('Removendo tabela...');
        const result = await ipcRenderer.invoke('drop-table', tableName);
        
        if (result.success) {
            showSuccess(result.message);
            await loadTables();
            
            // Clear structure view
            elements.tableStructure.innerHTML = '<p class="no-data">Selecione uma tabela para ver sua estrutura</p>';
            elements.dropTable.disabled = true;
        } else {
            showError(result.message);
        }
    } catch (error) {
        showError('Erro ao remover tabela: ' + error.message);
    }
}

// Utility Functions
function showStatus(message) {
    elements.statusMessage.textContent = message;
}

function showSuccess(message) {
    showStatus(message);
    // You could add a toast notification here
}

function showError(message) {
    showStatus('Erro: ' + message);
    // You could add a toast notification here
}
