const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; 
app.use(express.json());

// Proxy route to forward the authentication API request
app.post('/proxy/auth', async (req, res) => {
  const url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';
  try {
    const response = await axios.post(url, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Proxy route to forward the create new customer API request
app.post('/proxy/create', async (req, res) => {
  const url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create';
  try {
    const response = await axios.post(url, req.body, {
      headers: {
        Authorization: req.headers.authorization, // Forward the Bearer token from the frontend
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Route handler for the default GET request at the root URL
app.get('/', (req, res) => {
  res.send('Backend server is running.'); // Respond with a simple message
});

// Proxy route to forward the get customer list API request
app.get('/proxy/get_customer_list', async (req, res) => {
  const url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list';
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: req.headers.authorization, // Forward the Bearer token from the frontend
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Proxy route to forward the delete customer API request
app.post('/proxy/delete/:uuid', async (req, res) => {
  const url = `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${req.params.uuid}`;
  try {
    const response = await axios.post(url, null, {
      headers: {
        Authorization: req.headers.authorization, // Forward the Bearer token from the frontend
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Proxy route to forward the update customer API request
app.post('/proxy/update/:uuid', async (req, res) => {
  const url = `https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${req.params.uuid}`;
  try {
    const response = await axios.post(url, req.body, {
      headers: {
        Authorization: req.headers.authorization, // Forward the Bearer token from the frontend
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
