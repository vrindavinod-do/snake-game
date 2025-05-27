WORKDIR /app
COPY leaderboard_backend /app/leaderboard_backend
COPY requirements.txt /app/
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["gunicorn", "leaderboard_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
