import { generateRandomEmployee } from "../../support/commands";

describe("GET /api/v1/employees - Fetch All Employees", () => {
  const baseUrl = "http://localhost:8887"; // Base URL for the API
  const randomEmployee = generateRandomEmployee();
  const randomUpdatedEmployee = generateRandomEmployee();

  it("Should return all employees with status 200", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/api/v1/employees`, // Endpoint for fetching employees
    }).then((response) => {
      // Assertions
      expect(response.status).to.eq(200); // Status code should be 200
      expect(response.body).to.be.an("array"); // Response body should be an array
      expect(response.body.length).to.be.greaterThan(0); // Ensure there are employees
      //print all the employees data in readable form
      response.body.forEach((employee) => {
        cy.log(
          `ID: ${employee.id}, Name: ${employee.firstName} ${employee.lastName}`
        );
      });
    });
  });

  it("Should Create a new Employee", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/api/v1/employees`,
      body: randomEmployee,
    }).then((response) => {
      expect(response.status).to.eq(201);
      cy.log(JSON.stringify(response)); // Log the full response for debugging
    });
  });

  it("Should get employee by ID", () => {
    //get employee ID based on the last one creted with automation
    cy.getLastEmployeeId(); //creates alias @lastEmployeeId

    //search the employee by ID
    cy.get("@lastEmployeeId").then((employeeId) => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/api/v1/employees/${employeeId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log("Response Body:", JSON.stringify(response.body));
      });
    });
  });

   it("Should update an employee by ID and validate the changes", () => {
    // Step 1: Get the last employee ID
    cy.getLastEmployeeId(); // Creates alias @lastEmployeeId

    // Step 2: Fetch original employee data by ID
    cy.get("@lastEmployeeId").then((employeeId) => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/api/v1/employees/${employeeId}`,
      }).then((response) => {
        expect(response.status).to.eq(200); // Ensure successful fetch
        logEmployeeData("Original", response.body); // Log original data
      });
    });

    // Step 3: Update the employee data by ID
    cy.get("@lastEmployeeId").then((employeeId) => {
      cy.request({
        method: "PUT",
        url: `${baseUrl}/api/v1/employees/${employeeId}`,
        body: randomUpdatedEmployee,
      }).then((response) => {
        logEmployeeData("Updated", randomUpdatedEmployee); // Log new data
      });
    });

    // Step 4: Fetch updated employee data and validate
    cy.get("@lastEmployeeId").then((employeeId) => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/api/v1/employees/${employeeId}`,
      }).then((response) => {
        expect(response.status).to.eq(200); // Ensure successful fetch
        logEmployeeData("Validated Updated", response.body); // Log updated data

        // Validate the response matches the updated data
        expect(response.body).to.include(randomUpdatedEmployee);
      });
    });
  });

  //Delete employee

});

// Helper function to log employee data
const logEmployeeData = (prefix, { id, firstName, lastName, email, dob }) => {
  cy.log(`${prefix} Data:`);
  if(id != 0) cy.log(`ID: ${id} (Static)`);
  cy.log(`Name: ${firstName} ${lastName}`);
  cy.log(`Email: ${email}`);
  cy.log(`Date of Birth: ${dob}`);
};