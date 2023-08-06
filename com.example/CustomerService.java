import java.io.IOException;
package com.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/CustomerService")
public class CustomerService extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String cmd = request.getParameter("cmd");

        if (cmd == null) {
            // Handle invalid command
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return;
        }

        switch (cmd) {
            case "create":
                handleCreateCustomer(request, response);
                break;
            case "update":
                handleUpdateCustomer(request, response);
                break;
            case "delete":
                handleDeleteCustomer(request, response);
                break;
            default:
                // Handle invalid command
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                break;
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String cmd = request.getParameter("cmd");

        if ("get_customer_list".equals(cmd)) {
            handleGetCustomerList(request, response);
        } else {
            // Handle invalid command
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private void handleCreateCustomer(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Extract data from the request
        String firstName = request.getParameter("first_name");
        String lastName = request.getParameter("last_name");
        String street = request.getParameter("street");
        String address = request.getParameter("address");
        String city = request.getParameter("city");
        String state = request.getParameter("state");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");

        // Validate data (e.x:, check if first_name and last_name are providwd)
        if (firstName == null || firstName.isEmpty() || lastName == null || lastName.isEmpty()) {
            // If first_name or last_name is missing, return a failure response
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("First Name or Last Name is missing");
            return;
        }

        if (success) {
            response.setStatus(HttpServletResponse.SC_CREATED);
            response.getWriter().write("Successfully Created");
        } else {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Failed to create customer");
        }
    }

    private void handleUpdateCustomer(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Extract data from the request
        String uuid = request.getParameter("uuid");
        String firstName = request.getParameter("first_name");
        String lastName = request.getParameter("last_name");
        String street = request.getParameter("street");
        String address = request.getParameter("address");
        String city = request.getParameter("city");
        String state = request.getParameter("state");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        if (uuid == null || uuid.isEmpty() || firstName == null || firstName.isEmpty() || lastName == null
                || lastName.isEmpty()) {
            // If any required field is missing, return a failure response
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("UUID, First Name, or Last Name is missing");
            return;
        }
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Customer updated successfully");
    }

private void handleDeleteCustomer(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    String uuid = request.getParameter("uuid");

    if (uuid == null || uuid.isEmpty()) {
        // If UUID is missing, return a failure response
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.getWriter().write("UUID is missing");
        return;
    }
    response.setStatus(HttpServletResponse.SC_OK);
    response.getWriter().write("Customer deleted successfully");
}

}</dependency>
