FROM python:3.11

# Set the workdir to /app (project root inside container)
WORKDIR /app

# Copy everything from current directory (local project root) into /app
COPY . /app/

RUN pip install --no-cache-dir -r requirements.txt

# Set environment variable for Django settings
ENV PYTHONPATH=/app/leaderboard_backend
ENV DJANGO_SETTINGS_MODULE=leaderboard_backend.settings

EXPOSE 8000

# Gunicorn command to import wsgi from leaderboard_backend package (which is now /app/leaderboard_backend)
CMD ["gunicorn", "leaderboard_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
