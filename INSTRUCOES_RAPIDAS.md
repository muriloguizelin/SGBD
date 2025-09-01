# 🚀 Instruções Rápidas - Simple SGBD

## ✅ Problema Resolvido!

O erro de dependência `node-ffi-napi` foi resolvido! Agora o sistema usa apenas JavaScript puro, sem necessidade de compiladores C++ ou dependências complexas.

## 🎯 Como Usar Agora

### 1. **Instalação Simples**
```bash
npm install
npm start
```

### 2. **Ou use os scripts automáticos:**

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
./start.sh
```

## 🎉 Funcionalidades Disponíveis

### **Criar Tabela**
1. Na aba lateral, digite o nome da tabela
2. Especifique as colunas separadas por vírgula
3. Clique em "Criar Tabela"

**Exemplo:**
- Nome: `funcionarios`
- Colunas: `id,nome,cargo,salario,departamento`

### **Inserir Dados**
1. Vá para a aba "Inserir Dados"
2. Selecione a tabela
3. Preencha os campos que aparecem
4. Clique em "Inserir"

### **Consultar Dados**
1. Vá para a aba "Consultas"
2. Selecione a tabela
3. (Opcional) Digite uma condição de busca
4. Clique em "Executar"

### **Gerenciar Estrutura**
1. Vá para a aba "Estrutura"
2. Selecione uma tabela para ver suas colunas
3. Use "Remover Tabela" para deletar

## 📁 Onde os Dados Ficam

- **Localização**: Pasta `data/` (criada automaticamente)
- **Formato**: Arquivos `.tbl` (um por tabela)
- **Backup**: Copie a pasta `data/` para fazer backup

## 🔧 Vantagens da Nova Versão

✅ **Sem dependências complexas**
✅ **Funciona em qualquer sistema com Node.js**
✅ **Instalação mais simples**
✅ **Mesma funcionalidade**
✅ **Interface idêntica**
✅ **Dados compatíveis**

## 🚨 Se Houver Problemas

1. **Limpe o cache do npm:**
```bash
npm cache clean --force
npm install
```

2. **Verifique a versão do Node.js:**
```bash
node --version
# Deve ser 14 ou superior
```

3. **Reinicie a aplicação:**
```bash
npm start
```

## 📚 Exemplos Práticos

Veja o arquivo `EXEMPLO.md` para exemplos detalhados de uso!

## 🎯 Pronto para Usar!

O sistema está **100% funcional** e pronto para uso. A interface é intuitiva e todas as operações básicas de banco de dados estão disponíveis.

**Divirta-se criando seu próprio SGBD! 🎉**
