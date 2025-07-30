# URL Shortener

A simple, elegant URL shortener web application built with Flask.

## Features

- Clean, user-friendly web interface
- URL validation
- Duplicate URL detection (returns existing short URL)
- SQLite database for data persistence
- Responsive design
- 6-character alphanumeric short codes

## Setup Instructions

### Option 1: Quick Setup (Recommended)
1. Double-click `setup_project.bat` to automatically set up the project
2. Once setup is complete, double-click `run_app.bat` to start the application

### Option 2: Manual Setup
1. Create a virtual environment:
   ```
   python -m venv .venv
   ```

2. Activate the virtual environment:
   ```
   .venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python app.py
   ```

## Usage

1. Open your web browser and go to `http://127.0.0.1:5000`
2. Enter a URL you want to shorten
3. Click "Shorten" to generate a short URL
4. Use the generated short URL to redirect to your original URL

## API Endpoints

- `GET /` - Main page with the URL shortener interface
- `POST /api/shorten` - Shorten a URL (expects JSON: `{"url": "your-url-here"}`)
- `GET /<short_code>` - Redirect to the original URL

## Files Structure

```
url shortener/
├── app.py              # Main Flask application
├── templates/
│   └── index.html      # Web interface
├── urls.db            # SQLite database (created automatically)
├── requirements.txt   # Python dependencies
├── setup_project.bat  # Automated setup script
├── run_app.bat       # Application launcher
└── README.md         # This file
```

## Dependencies

- Flask 3.1.1 - Web framework
- validators 0.35.0 - URL validation
- SQLite3 - Database (built into Python)

## Troubleshooting

### "No module named 'validators'" error
- Make sure you're using the virtual environment: `.venv\Scripts\activate`
- Install dependencies: `pip install -r requirements.txt`

### Port already in use
- The application runs on port 5000 by default
- Make sure no other application is using this port
- Or modify the port in `app.py` (last line: `app.run(debug=True, port=5001)`)

### Database issues
- The SQLite database `urls.db` is created automatically
- If you encounter database errors, delete `urls.db` and restart the application

## Security Note

This is a development server. For production use, consider:
- Using a production WSGI server like Gunicorn
- Adding authentication/authorization
- Implementing rate limiting
- Using a more robust database like PostgreSQL

