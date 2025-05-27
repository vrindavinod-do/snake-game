# Use official Python base image
FROM python:3.11

# Set working directory inside the container
WORKDIR /app/leaderboard_backend

# Copy the entire current directory contents into the container at /app/leaderboard_backend
COPY . /app/leaderboard_backend/

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8000 for the container
EXPOSE 8000

# Command to run the Django app using gunicorn, specifying correct wsgi module path
CMD ["gunicorn", "leaderboard_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
