#!/bin/bash
export APP_CONFIG_FILE=/app/data_service/config/development.py
cd /app/data_service
gunicorn -c gunicorn_config.py myapp:app