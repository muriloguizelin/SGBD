@echo off
echo ========================================
echo    Simple SGBD - Sistema de Banco de Dados
echo ========================================
echo.

echo Verificando dependencias...
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    if errorlevel 1 (
        echo Erro ao instalar dependencias!
        pause
        exit /b 1
    )
)

echo.
echo Backend JavaScript pronto.

echo.
echo Iniciando aplicacao...
npm start

pause
