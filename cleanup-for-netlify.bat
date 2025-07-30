@echo off
echo Cleaning up files not needed for Netlify deployment...
echo.

REM Remove Python/Flask files
if exist app.py (
    echo Removing app.py
    del app.py
)

if exist requirements.txt (
    echo Removing requirements.txt
    del requirements.txt
)

if exist urls.db (
    echo Removing urls.db
    del urls.db
)

if exist __pycache__ (
    echo Removing __pycache__ folder
    rmdir /s /q __pycache__
)

if exist .venv (
    echo Removing .venv folder
    rmdir /s /q .venv
)

REM Remove local development scripts
if exist run_app.bat (
    echo Removing run_app.bat
    del run_app.bat
)

if exist setup_project.bat (
    echo Removing setup_project.bat
    del setup_project.bat
)

REM Remove source files (templates and static) - these are copied to dist/
if exist templates (
    echo Removing templates folder
    rmdir /s /q templates
)

if exist static (
    echo Removing static folder
    rmdir /s /q static
)

echo.
echo Cleanup complete! Your project is now ready for Netlify deployment.
echo.
echo Remaining files:
dir /b
echo.
echo To deploy to Netlify:
echo 1. Run: npm install
echo 2. Run: npm run build
echo 3. Deploy the project to Netlify
echo.
pause

