const fs = require('fs');
const path = require('path');

// Estrutura para representar uma tabela
class Table {
    constructor(name, columns = []) {
        this.name = name;
        this.columns = columns;
        this.data = [];
    }
}

class SimpleDatabase {
    constructor() {
        this.tables = new Map();
        this.dataDir = 'data/';
        this.ensureDataDirectory();
        this.loadAllTables();
    }
    
    // Criar diretório de dados se não existir
    ensureDataDirectory() {
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
    }
    
    // Carregar todas as tabelas existentes
    loadAllTables() {
        if (fs.existsSync(this.dataDir)) {
            const files = fs.readdirSync(this.dataDir);
            files.forEach(file => {
                if (file.endsWith('.tbl')) {
                    const tableName = file.replace('.tbl', '');
                    this.loadTable(tableName);
                }
            });
        }
    }
    
    // Criar uma nova tabela
    createTable(tableName, columns) {
        if (this.tables.has(tableName)) {
            return false; // Tabela já existe
        }
        
        const table = new Table(tableName, columns);
        this.tables.set(tableName, table);
        
        // Salvar tabela em arquivo
        this.saveTable(tableName);
        return true;
    }
    
    // Inserir dados em uma tabela
    insertData(tableName, values) {
        if (!this.tables.has(tableName)) {
            return false; // Tabela não existe
        }
        
        const table = this.tables.get(tableName);
        if (values.length !== table.columns.length) {
            return false; // Número de valores não corresponde ao número de colunas
        }
        
        table.data.push(values);
        this.saveTable(tableName);
        return true;
    }
    
    // Buscar dados em uma tabela
    selectData(tableName, condition = '') {
        if (!this.tables.has(tableName)) {
            return []; // Tabela não existe
        }
        
        const table = this.tables.get(tableName);
        
        if (!condition || condition.trim() === '') {
            return table.data; // Retorna todos os dados
        }
        
        // Implementação simples de WHERE (busca por valor exato)
        return table.data.filter(row => {
            return row.some(cell => cell === condition);
        });
    }
    
    // Listar todas as tabelas
    listTables() {
        return Array.from(this.tables.keys());
    }
    
    // Obter estrutura de uma tabela
    getTableStructure(tableName) {
        if (this.tables.has(tableName)) {
            return this.tables.get(tableName).columns;
        }
        return [];
    }
    
    // Deletar uma tabela
    dropTable(tableName) {
        if (!this.tables.has(tableName)) {
            return false;
        }
        
        this.tables.delete(tableName);
        
        // Remover arquivo da tabela
        const filename = path.join(this.dataDir, `${tableName}.tbl`);
        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
        }
        
        return true;
    }
    
    // Salvar tabela em arquivo
    saveTable(tableName) {
        if (!this.tables.has(tableName)) {
            return;
        }
        
        const table = this.tables.get(tableName);
        const filename = path.join(this.dataDir, `${tableName}.tbl`);
        
        let content = '';
        
        // Salvar cabeçalho (colunas)
        content += table.columns.join('|') + '\n';
        
        // Salvar dados
        table.data.forEach(row => {
            content += row.join('|') + '\n';
        });
        
        fs.writeFileSync(filename, content, 'utf8');
    }
    
    // Carregar tabela do arquivo
    loadTable(tableName) {
        const filename = path.join(this.dataDir, `${tableName}.tbl`);
        
        if (!fs.existsSync(filename)) {
            return;
        }
        
        const content = fs.readFileSync(filename, 'utf8');
        const lines = content.split('\n').filter(line => line.trim() !== '');
        
        if (lines.length === 0) {
            return;
        }
        
        const table = new Table(tableName);
        
        // Primeira linha contém as colunas
        table.columns = lines[0].split('|');
        
        // Linhas seguintes contêm os dados
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split('|');
            table.data.push(row);
        }
        
        this.tables.set(tableName, table);
    }
}

// Instância global do banco de dados
const database = new SimpleDatabase();

// Exportar funções para uso no Electron
module.exports = {
    // Criar tabela
    createTable: (tableName, columns) => {
        return database.createTable(tableName, columns);
    },
    
    // Inserir dados
    insertData: (tableName, values) => {
        return database.insertData(tableName, values);
    },
    
    // Buscar dados
    selectData: (tableName, condition = '') => {
        return database.selectData(tableName, condition);
    },
    
    // Listar tabelas
    listTables: () => {
        return database.listTables();
    },
    
    // Obter estrutura da tabela
    getTableStructure: (tableName) => {
        return database.getTableStructure(tableName);
    },
    
    // Deletar tabela
    dropTable: (tableName) => {
        return database.dropTable(tableName);
    }
};
