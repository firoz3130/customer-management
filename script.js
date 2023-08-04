// Global variable to store the bearer token
let authToken = '';

// Function to handle user login
function login() {
    const login_id = document.getElementById('login_id').value;
    const password = document.getElementById('password').value;

    // Make a POST request to the authentication API
    // Replace the URL with the actual API endpoint
    fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "login_id": login_id,
            "password": password
        })
    })
    .then(response => response.json())
    .then(data => {
        // Store the bearer token in the authToken variable
        authToken = data.token;

        // Hide the login form and display the create customer form and customer list
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('newCustomerForm').style.display = 'block';
        document.getElementById('customerTable').style.display = 'block';
        document.getElementById('createBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';

        // Get the customer list
        getCustomerList();
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('Invalid username or password. Please try again.');
    });
}

// Function to get the list of customers
function getCustomerList() {
    // Make a GET request to the API to get the customer list
    // Replace the URL with the actual API endpoint
    
    fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authToken
        }
    })
    .then(response => response.json())
    .then(data => {
        // Display the customer list in the table
        const customerTable = document.getElementById('customerTable');
        customerTable.innerHTML = ''; // Clear previous data
        data.forEach(customer => {
            const row = customerTable.insertRow();
            
            // Add table cells and populate customer data
            // Modify this part based on your data structure
        });
    })
    .catch(error => {
        console.error('Error while fetching customer list:', error);
    });
}
function createCustomer() {
    first_name = document.getElementById('first_name').value;
    last_name= document.getElementById('last_name').value;
    email = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    address = document.getElementById('address').value;
    city = document.getElementById('city').value;
    state = document.getElementById('state').value;
}
function updateCustomer(){
    first_name = document.getElementById('first_name').value;
    last_name= document.getElementById('last_name').value;
    email = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    address = document.getElementById('address').value;
    city = document.getElementById('city').value;
    state = document.getElementById('state').value;

}
function deleteCustomer(){
    first_name= document.getElementById('first_name').value.trim();
    last_name= document.getElementById('last_name').value.trim();
    email = document.getElementById('email').value.trim();
    phone = document.getElementById('phone').value.trim();
    address = document.getElementById('address').value.trim();
    city = document.getElementById('city').value.trim();
    state = document.getElementById('state').value.trim();  
}
// Other functions: createCustomer(), updateCustomer(), deleteCustomer()
// These functions will be similar to the getCustomerList() function,
// but they will use POST requests with appropriate data and headers.

// Function to show the create customer form
function showCreateForm() {
    document.getElementById('newCustomerForm').style.display = 'block';
}

// Function to handle user logout
function logout() {
    // Clear the authToken and reset the UI
    authToken = '';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('newCustomerForm').style.display = 'none';
    document.getElementById('customerTable').style.display = 'none';
    document.getElementById('createBtn').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'none';
}
