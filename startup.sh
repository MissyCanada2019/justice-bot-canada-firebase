#!/bin/sh
export PORT=${PORT:-8080}
exec gunicorn --bind 0.0.0.0:$PORT app:create_app\(\)