# Simple SGBD

Um Sistema de Gerenciamento de Banco de Dados simples desenvolvido em javascript com interface gráfica em Electron.

## Características

- ✅ **Backend em JavaScript**: Sistema de armazenamento simples e eficiente
- ✅ **Interface Electron**: Interface gráfica moderna e responsiva
- ✅ **Operações Básicas**: CREATE, INSERT, SELECT, DROP
- ✅ **Persistência**: Dados salvos em arquivos locais
- ✅ **Interface Intuitiva**: Design moderno com abas organizadas
- ✅ **Sem Dependências Complexas**: Funciona em qualquer sistema com Node.js

## Funcionalidades

### Gerenciamento de Tabelas
- Criar novas tabelas com colunas personalizadas
- Visualizar estrutura das tabelas
- Remover tabelas existentes
- Listar todas as tabelas disponíveis

### Operações de Dados
- Inserir dados em tabelas
- Consultar dados com condições opcionais
- Visualizar resultados em formato tabular
- Validação de dados

### Interface
- Design responsivo e moderno
- Navegação por abas
- Feedback visual para operações
- Barra de status informativa

## Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**

### Windows
```bash
# Apenas Node.js é necessário
# Baixar de: https://nodejs.org/
```

### Linux/Mac
```bash
# Ubuntu/Debian
sudo apt-get install nodejs npm

# macOS
# Instalar via Homebrew ou baixar de https://nodejs.org/
```

## Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd simple-sgbd
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute a aplicação**
```bash
npm start
```

## Como Usar

### 1. Criar uma Tabela
1. Na aba lateral, preencha o nome da tabela
2. Especifique as colunas separadas por vírgula (ex: `id,nome,idade,email`)
3. Clique em "Criar Tabela"

### 2. Inserir Dados
1. Vá para a aba "Inserir Dados"
2. Selecione a tabela desejada
3. Preencha os campos que aparecerão automaticamente
4. Clique em "Inserir"

### 3. Consultar Dados
1. Vá para a aba "Consultas"
2. Selecione a tabela
3. (Opcional) Adicione uma condição de busca
4. Clique em "Executar"

### 4. Gerenciar Estrutura
1. Vá para a aba "Estrutura"
2. Selecione uma tabela para ver suas colunas
3. Use "Remover Tabela" para deletar (com confirmação)

## Estrutura do Projeto

```
simple-sgbd/
├── backend/
│   └── database.js           # Backend JavaScript do SGBD
├── renderer/
│   ├── index.html            # Interface principal
│   ├── styles.css            # Estilos CSS
│   └── script.js             # Lógica da interface
├── data/                     # Diretório de dados (criado automaticamente)
├── main.js                   # Processo principal do Electron
├── package.json              # Configurações do projeto
└── README.md                 # Este arquivo
```

## Arquitetura

### Backend (JavaScript)
- **SimpleDatabase**: Classe principal do SGBD
- **Armazenamento**: Arquivos `.tbl` para cada tabela
- **Formato**: Delimitado por `|` para colunas, `\n` para linhas
- **Funções Exportadas**: Interface JavaScript para comunicação com Electron

### Frontend (Electron)
- **Processo Principal**: Gerencia janelas e IPC
- **Renderer**: Interface gráfica em HTML/CSS/JS
- **IPC**: Comunicação entre processos usando `ipcMain`/`ipcRenderer`

## Formato dos Dados

Cada tabela é salva em um arquivo `.tbl` no diretório `data/`:

```
coluna1|coluna2|coluna3
valor1|valor2|valor3
valor4|valor5|valor6
```

## Limitações Atuais

- Apenas tipos de dados TEXT
- Condições de busca simples (igualdade exata)
- Sem índices ou otimizações avançadas
- Sem transações ou ACID
- Sem backup automático

## Próximas Melhorias

- [ ] Suporte a diferentes tipos de dados (INT, FLOAT, DATE)
- [ ] Consultas SQL mais complexas (WHERE, ORDER BY, LIMIT)
- [ ] Índices para melhor performance
- [ ] Sistema de backup e restore
- [ ] Transações e ACID
- [ ] Interface para importar/exportar dados
- [ ] Logs de operações
- [ ] Autenticação e permissões

## Troubleshooting

### Erro de Dependências
```bash
# Reinstale as dependências
npm install

# Se persistir, tente:
npm cache clean --force
npm install
```

### Dados não Persistem
- Verifique se o diretório `data/` foi criado
- Verifique permissões de escrita no diretório
- Certifique-se de que o processo tem permissões adequadas

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Autor

Desenvolvido como projeto educacional para demonstrar conceitos de SGBD e desenvolvimento desktop com Electron.
