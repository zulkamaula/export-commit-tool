#!/usr/bin/env python3
"""
Simple HTTP server to serve the Git Commit Export Tool web application
Run this script and open http://localhost:8000 in your browser
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000
DIRECTORY = Path(__file__).parent

class HTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers to allow local file access
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Serve the main HTML file for root path
        if self.path == '/':
            self.path = '/commit-export-web.html'
        return super().do_GET()

def main():
    print("🚀 Starting Git Commit Export Tool Server...")
    print(f"📁 Serving directory: {DIRECTORY}")
    print(f"🌐 Server URL: http://localhost:{PORT}")
    print("📝 Main application: http://localhost:{PORT}/commit-export-web.html")
    print("⚡ Press Ctrl+C to stop the server")
    print("-" * 60)
    
    try:
        with socketserver.TCPServer(("", PORT), HTTPRequestHandler) as httpd:
            print(f"✅ Server started successfully on port {PORT}")
            
            # Try to open browser automatically
            try:
                webbrowser.open(f'http://localhost:{PORT}/')
                print("🔗 Opening browser automatically...")
            except:
                print("💡 Please open http://localhost:{PORT}/ in your browser")
            
            print("\n🎯 Ready to serve requests!")
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: Port {PORT} is already in use")
            print(f"💡 Try running: lsof -ti:{PORT} | xargs kill")
            print("   Or choose a different port by modifying PORT variable")
        else:
            print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    main()
