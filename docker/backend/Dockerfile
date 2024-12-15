# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory inside the container to /app
WORKDIR /app

RUN apt-get update && \
    apt-get -y install libpq-dev gcc && \
    rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

# Copy the requirements.txt file into the container at /app
COPY backend/requirements.txt /app/requirements.txt

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the FastAPI application source code into the container
COPY backend/src /app/src

# Expose the port FastAPI will run on
EXPOSE 8000

# Set the command to run the FastAPI app using Uvicorn
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]

