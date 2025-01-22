# REST API Testing

This section of the project focuses on testing REST API endpoints. The tests are designed to validate the functionality, performance, and security of the provided API routes. Docker is used to simulate and test API behavior in a controlled environment.

---

## Table of Contents

1. [Endpoints](#endpoints)
2. [Setup and Run Instructions](#setup-and-run-instructions)
3. [Testing Details](#testing-details)
4. [Docker Integration](#docker-integration)

---

## Endpoints

The following endpoints are tested:

### Employee Management Endpoints
1. **GET** `/api/v1/employees`  
   - Returns all employees.

2. **POST** `/api/v1/employees`  
   - Creates a new employee.  
   - **Body**:  
     ```json
     {
       "name": "string",
       "position": "string",
       "salary": "number"
     }
     ```

3. **GET** `/api/v1/employees/{id}`  
   - Returns an employee by their unique ID.

4. **PUT** `/api/v1/employees/{id}`  
   - Updates an employee by ID.  
   - **Body**:  
     ```json
     {
       "name": "string",
       "position": "string",
       "salary": "number"
     }
     ```

5. **DELETE** `/api/v1/employees/{id}`  
   - Deletes an employee by ID.

### Simulation Endpoints
1. **GET** `/api/v1/simulate/get/employees`  
   - Simulates fetching all employees and requires an **Authorization header** (Bearer token).

2. **POST** `/api/v1/simulate/token`  
   - Returns a JWT token.  
   - **Body**:  
     ```json
     {
       "username": "admin",
       "password": "admin"
     }
     ```

---

## Setup and Run Instructions

### Prerequisites
1. [Node.js](https://nodejs.org/) installed on your machine.
2. [Docker](https://www.docker.com/) installed and running.
3. Cypress installed (globally or locally via npm).

### Steps to Run Tests
1. Clone the repository:
   ```bash
   git clone https://github.com/xDicanx/demoQA-cypress
   cd qa-practice-portfolio
   ```
2. Docker command
   ```bash
   docker run -d --rm --name qa-practice-api -p8887:8081 rvancea/qa-practice-api:latest
After successfully running the above command, you can open the application in browser by accessing the following URL

http://localhost:8887/swagger-ui.html
The above REST API application includes an OpenAPI (Swagger) Documentation with the following endpoints
