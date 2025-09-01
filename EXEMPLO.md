# Exemplos de Uso - Simple SGBD

Este documento demonstra como usar o Simple SGBD com exemplos práticos.

## Exemplo 1: Gerenciamento de Funcionários

### 1. Criar Tabela de Funcionários

**Nome da Tabela:** `funcionarios`

**Colunas:** `id,nome,cargo,salario,departamento`

### 2. Inserir Dados

```
ID: 1
Nome: João Silva
Cargo: Desenvolvedor
Salario: 5000
Departamento: TI

ID: 2
Nome: Maria Santos
Cargo: Analista
Salario: 4500
Departamento: RH

ID: 3
Nome: Pedro Costa
Cargo: Gerente
Salario: 8000
Departamento: Vendas
```

### 3. Consultas

**Buscar todos os funcionários:**
- Deixe a condição em branco

**Buscar funcionários do departamento TI:**
- Condição: `TI`

**Buscar funcionário com ID 1:**
- Condição: `1`

## Exemplo 2: Controle de Produtos

### 1. Criar Tabela de Produtos

**Nome da Tabela:** `produtos`

**Colunas:** `codigo,nome,preco,categoria,estoque`

### 2. Inserir Dados

```
Codigo: P001
Nome: Notebook Dell
Preco: 3500
Categoria: Eletronicos
Estoque: 10

Codigo: P002
Nome: Mouse Wireless
Preco: 50
Categoria: Acessorios
Estoque: 25

Codigo: P003
Nome: Teclado Mecanico
Preco: 200
Categoria: Acessorios
Estoque: 15
```

### 3. Consultas Úteis

**Produtos da categoria Acessorios:**
- Condição: `Acessorios`

**Produto com código P001:**
- Condição: `P001`

## Exemplo 3: Sistema de Contatos

### 1. Criar Tabela de Contatos

**Nome da Tabela:** `contatos`

**Colunas:** `id,nome,email,telefone,cidade`

### 2. Inserir Dados

```
ID: 1
Nome: Ana Oliveira
Email: ana@email.com
Telefone: (11) 99999-1111
Cidade: São Paulo

ID: 2
Nome: Carlos Lima
Email: carlos@email.com
Telefone: (21) 88888-2222
Cidade: Rio de Janeiro

ID: 3
Nome: Fernanda Costa
Email: fernanda@email.com
Telefone: (31) 77777-3333
Cidade: Belo Horizonte
```

## Dicas de Uso

### 1. Nomenclatura
- Use nomes descritivos para tabelas e colunas
- Evite espaços e caracteres especiais
- Use letras minúsculas e underscores

### 2. Estrutura de Dados
- Sempre inclua um campo de identificação único (ID)
- Agrupe informações relacionadas em uma tabela
- Mantenha consistência nos nomes das colunas

### 3. Consultas Eficientes
- Use condições específicas para filtrar resultados
- A condição busca por igualdade exata em qualquer coluna
- Para buscar todos os dados, deixe a condição em branco

### 4. Backup
- Os dados são salvos automaticamente em arquivos `.tbl`
- Faça backup regular do diretório `data/`
- Cada tabela tem seu próprio arquivo

## Limitações e Considerações

### 1. Tipos de Dados
- Todos os dados são armazenados como texto
- Não há validação de tipos (números, datas, etc.)
- Considere isso ao projetar suas tabelas

### 2. Consultas
- Busca apenas por igualdade exata
- Não suporta operadores como >, <, LIKE, etc.
- Não há ordenação ou limitação de resultados

### 3. Performance
- Para grandes volumes de dados, considere usar um SGBD profissional
- Este sistema é ideal para projetos pequenos e educacionais

## Casos de Uso Ideais

✅ **Projetos educacionais**
✅ **Prototipagem rápida**
✅ **Sistemas pequenos (até 1000 registros)**
✅ **Demonstração de conceitos de banco de dados**
✅ **Desenvolvimento local sem dependências externas**

❌ **Sistemas de produção**
❌ **Grandes volumes de dados**
❌ **Consultas complexas**
❌ **Múltiplos usuários simultâneos**
❌ **Requisitos de alta performance**

## Próximos Passos

Após dominar o uso básico, você pode:

1. **Estudar conceitos avançados de SGBD**
2. **Aprender SQL para sistemas mais robustos**
3. **Explorar bancos como PostgreSQL, MySQL, SQLite**
4. **Contribuir para melhorar este projeto**
5. **Implementar funcionalidades adicionais**
