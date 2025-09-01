#!/bin/bash

echo "========================================"
echo "   Simple SGBD - Sistema de Banco de Dados"
echo "========================================"
echo

echo "Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Erro ao instalar dependencias!"
        exit 1
    fi
fi

echo
echo "Backend JavaScript pronto."

echo
echo "Iniciando aplicacao..."
npm start
