# Use official Python image
FROM python:3.11-slim

# Environment settings
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app/leaderboard_backend

# System dependencies
RUN apt-get update && apt-get install -y build-essential libpq-dev

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project files
COPY . .

# Collect static files
RUN python leaderboard_backend/manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Start the app using gunicorn
CMD ["gunicorn", "leaderboard_backend.leaderboard_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
