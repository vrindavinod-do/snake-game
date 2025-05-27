# Use Python base image
FROM python:3.11

# Set workdir inside container
WORKDIR /app/leaderboard_backend

# Copy all project files into container
COPY . /app/leaderboard_backend/

# Install dependencies (adjust as needed)
RUN pip install -r requirements.txt

# Expose port
EXPOSE 8000

# Run Gunicorn with the correct wsgi module path
CMD ["gunicorn", "leaderboard_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
