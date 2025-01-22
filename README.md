# QA Practice Portfolio

This project showcases my skills in test automation using Cypress for web applications. It includes tests for the **UI**, **REST API**, and **GraphQL**, demonstrating my ability to design and execute reliable test scripts for common functionalities. The repository is intended to serve as a resource for potential employers or collaborators to evaluate my expertise.

## Table of Contents

1. [About This Portfolio](#about-this-portfolio)
2. [Setup and Run Instructions](#setup-and-run-instructions)
3. [Testing Overview](#testing-overview)
    - [UI Testing](#ui-testing)
    - [REST API Testing](#rest-api-testing)
    - [GraphQL Testing](#graphql-testing)
4. [Test Evidence](#test-evidence)
5. [License](#license)

---

## About This Portfolio

This project highlights:
- Test automation using **Cypress**.
- Skills in testing **UI**, **REST APIs**, and **GraphQL endpoints**.
- Use of tools and libraries like **Faker.js** to generate dynamic test data.

Visit the live site: [https://qa-practice.netlify.app/graphql-testing](https://qa-practice.netlify.app/graphql-testing)

---

## Setup and Run Instructions

### Prerequisites

1. [Node.js](https://nodejs.org/) installed on your machine.
2. Cypress installed (globally or locally via npm).
3. Docker installed

### Steps to Run Tests

1. Clone the repository:
   ```bash
   git clone https://github.com/xDicanx/demoQA-cypress
   cd qa-practice-portfolio


## Testing Overview

### UI Testing

- **What is tested?**  
  Login/logout functionality, adding items to the cart, modifying quantity, removing items, and submitting orders.  
- **Tools used:**  
  [Cypress](https://www.cypress.io/)  

### REST API Testing

- **What is tested?**  
  REST API endpoints for the application, ensuring expected responses for CRUD operations.  
- **Setup:**  
  Requires Docker. Detailed instructions can be found in the [`API testing/README.md`]([./cypress/e2e/API%20testing/README.md)).  

### GraphQL Testing

- **What is tested?**  
  Queries and mutations using GraphQL.  
- **Setup:**  
  Tests are executed via Docker. Details in the [`graphql-tests/README.md`](./graphql-tests/README.md).  

---

## Test Evidence

Test artifacts are stored in the following folders:
- **Screenshots:** Located in the `screenshots/` folder to illustrate test results.
  - Successful login.
  - Item added to the cart.
  - Order confirmation message.  

---

## License

This project is open source and available under the [MIT License](./LICENSE).

---

Feel free to explore the repository and reach out for any questions or feedback. 😊
