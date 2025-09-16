import os
from flask import Flask, request, Response
import requests
from urllib.parse import urlparse

app = Flask(__name__)

# Allowed hostnames for security
ALLOWLIST = {"casamadridista.com", "logos-world.net"}
PORT = 5000

@app.after_request
def add_cors_headers(response):
    """Add CORS headers to all responses."""
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.route("/proxy")
def proxy():
    url = request.args.get("url")
    if not url:
        return {"error": "Missing ?url="}, 400

    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"}:
        return {"error": "Only HTTP/HTTPS allowed"}, 400

    if parsed.hostname not in ALLOWLIST:
        return {"error": f"Host {parsed.hostname} not allowed"}, 403

    try:
        # Fetch the image with browser-like headers
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
            "Accept": "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            "Referer": "https://casamadridista.com/"  # Optional: mimics coming from the site
        }
        r = requests.get(url, stream=True, timeout=15, headers=headers)  # Increased timeout slightly
        r.raise_for_status()

        # Pass through the content type and cache headers
        response_headers = {
            "Content-Type": r.headers.get("Content-Type", "application/octet-stream"),
            "Cache-Control": r.headers.get("Cache-Control", "public, max-age=3600"),
        }

        return Response(r.iter_content(chunk_size=8192), headers=response_headers)
    except requests.RequestException as e:
        print(f"Error fetching {url}: {str(e)}")  # Add logging for debugging
        return {"error": str(e)}, 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", PORT)))