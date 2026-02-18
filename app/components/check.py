import urllib.request
import urllib.parse
import base64
import json
import os

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("dotenv not installed, make sure env vars are set manually")

CLOUD_NAME = os.getenv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME')
API_KEY = os.getenv('CLOUDINARY_API_KEY')
API_SECRET = os.getenv('CLOUDINARY_API_SECRET')
FOLDER = 'Video Placeholder'

def check_folder_exists():
    if not all([CLOUD_NAME, API_KEY, API_SECRET]):
        print("Missing env vars. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.")
        return

    auth = base64.b64encode(f"{API_KEY}:{API_SECRET}".encode()).decode()
    base_url = f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/folders/{urllib.parse.quote(FOLDER)}"
    url = base_url
    
    req = urllib.request.Request(url)
    req.add_header('Authorization', f'Basic {auth}')
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if 'error' in data:
                print(f"Folder '{FOLDER}' does not exist: {data['error']['message']}")
            else:
                print(f"Folder '{FOLDER}' exists.")
                print("Subfolders:", data.get('folders', []))  # Lists any subfolders if present
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode()
        try:
            error_data = json.loads(error_msg)
            message = error_data.get('error', {}).get('message', str(e))
        except:
            message = str(e)
        if e.code == 404:
            print(f"Folder '{FOLDER}' does not exist: {message}")
        elif e.code == 401:
            print(f"Auth error (401): Check your API key/secret/cloud name: {message}")
        else:
            print(f"HTTP Error {e.code}: {message}")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")

check_folder_exists()