let authToken = null;

function login() {
    const loginData = {
        login_id: "test@sunbasedata.com",
        password: "Test@123",
    };
    fetch("/proxy/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Login failed. Invalid credentials.");
            }
            return response.json();
        })
        .then((data) => {
            authToken = data.token;
            showCustomerList();
        })
        .catch((error) => {
            console.error("Login error:", error.message);
            // Handle login error, show error message, etc.
        });
}


function createCustomer() {
    const newCustomerData = {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        street: document.getElementById("street").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
    };

    fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(newCustomerData),
    })
        .then((response) => {
            if (response.status === 201) {
                // Customer created successfully
                showCustomerList();
            } else if (response.status === 400) {
                // Validation failed, First Name or Last Name is missing
                console.error("Customer creation error: First Name or Last Name is missing");
            } else {
                // Handle other response codes if needed
                console.error("Customer creation error:", response.status);
            }
        })
        .catch((error) => {
            console.error("Customer creation error:", error.message);
            // Handle customer creation error, show error message, etc.
        });
}

function getCustomerList() {
    fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to get customer list.");
            }
            return response.json();
        })
        .then((data) => {
            // Display the customer list in the table
            const customerTable = document.getElementById("customerTable");
            customerTable.innerHTML = ""; // Clear existing content
            data.forEach((customer) => {
                const row = customerTable.insertRow();
                Object.keys(customer).forEach((key) => {
                    if (key !== "uuid") {
                        const cell = row.insertCell();
                        cell.textContent = customer[key];
                    }
                });
                const actionCell = row.insertCell();
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = function () {
                    deleteCustomer(customer.uuid);
                };
                actionCell.appendChild(deleteButton);
                const updateButton = document.createElement("button");
                updateButton.textContent = "Update";
                updateButton.onclick = function () {
                    updateCustomer(customer.uuid);
                };
                actionCell.appendChild(updateButton);
            });
        })
        .catch((error) => {
            console.error("Get customer list error:", error.message);
            // Handle error, show error message, etc.
        });
}
function deleteCustomer(customerUuid) {
    fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${customerUuid}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                // Customer deleted successfully
                showCustomerList();
            } else if (response.status === 400) {
                console.error("Customer deletion error: UUID not found");
            } else {
                console.error("Customer deletion error:", response.status);
            }
        })
        .catch((error) => {
            console.error("Customer deletion error:", error.message);
            // Handle customer deletion error, show error message, etc.
        });
}

function updateCustomer(customerUuid) {
    const updatedCustomerData = {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        street: document.getElementById("street").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
    };

    fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${customerUuid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedCustomerData),
    })
        .then((response) => {
            if (response.status === 200) {
                // Customer updated successfully
                showCustomerList();
            } else if (response.status === 400) {
                console.error("Customer update error: Body is empty");
            } else {
                console.error("Customer update error:", response.status);
            }
        })
        .catch((error) => {
            console.error("Customer update error:", error.message);
            // Handle customer update error, show error message, etc.
        });
}

// Function to show the customer list and hide the new customer form
function showCustomerList() {
    fetch("/proxy/get_customer_list", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to get customer list.");
            }
            return response.json();
        })
        .then((data) => {
            // Display the customer list in the table
            const customerTable = document.getElementById("customerTable");
            customerTable.innerHTML = ""; // Clear existing content
            data.forEach((customer) => {
                // ... (rest of the code to populate the table)
            });
        })
        .catch((error) => {
            console.error("Get customer list error:", error.message);
            // Handle error, show error message, etc.
        });
}

// Function to show the new customer form and hide the customer list
function showCreateForm() {
    document.getElementById("customerTable").style.display = "none";
    document.getElementById("newCustomerForm").style.display = "block";
}

// Function to logout
function logout() {
    authToken = null;
    document.getElementById("loginForm").reset();
    showLoginForm();
}

// Function to show the login form and hide the customer list and new customer form
function showLoginForm() {
    document.getElementById("customerTable").style.display = "none";
    document.getElementById("newCustomerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}
