import { ur } from "@faker-js/faker";
import { generateRandomEmployee } from "../../support/commands";

describe("GET /api/v1/employees - Fetch All Employees", () => {
  const baseUrl = "http://localhost:8887"; // Base URL for the API
  const randomEmployee = generateRandomEmployee();

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
    cy.request({
      method: "GET",
      url: `${baseUrl}/api/v1/employees`,
    }).then((response) => {
      const employees = response.body;
      const lastEmployeeId = employees.length;
      cy.wrap(lastEmployeeId).as("lastEmployeeId");
    });

    //search the employee by ID
    cy.get("@lastEmployeeId").then((employeeId) => {
      cy.request({
        method: "GET",
        url: `${baseUrl}/api/v1/employees/${employeeId}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});

function getIdOfLastEmployee() {}
