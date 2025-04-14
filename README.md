# Mini Node.js Web Framework

This is a simple and lightweight custom web framework built using Node.js core modules. It allows for basic HTTP routing and serving of static files such as HTML, CSS, and JavaScript — perfect for educational purposes or small static projects.

## Features

- Minimal custom framework based on `http` and `fs` core modules
- Custom routing system using `GET`, `POST`, etc.
- Static file serving with MIME type support
- Custom helpers:  
  - `res.sendFile()` – Serve static files  
  - `res.status()` – Set HTTP status codes  
  - `res.json()` – Send JSON responses


  ## How It Works

  - `Framework` class wraps an HTTP server and provides a routing mechanism.
- Routes are stored in an internal object (`this.routes`) with keys like `"get/"`, `"get/styles.css"`, etc.
- When a request comes in, the framework:
  - Checks if the route exists and calls the corresponding handler
  - If not found, returns a 404 JSON error
  - Provides helper methods to simplify responses


  ## Notes

- This framework is synchronous where necessary and handles small files well.

- Not recommended for production
