// Extract common logic into reusable function:
async function sendRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.text();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error; // rethrow the error for the calling function to handle
  }
}

async function bookNow() {
  // get data
  const data = { /* name, email, date */ };
  
  try {
    const response = await sendRequest('/bookNow', data);
    console.log(response);
  } catch (error) {
    // handle error (if needed)
  }
}

  //Get book now button
const bookNowBtn = document.getElementById('book-now-btn');

bookNowBtn.addEventListener('click', () => {

  // Create form elements
  const form = document.createElement('form');
  const nameInput = document.createElement('input');
  const emailInput = document.createElement('input');
  const dateInput = document.createElement('input');
  const submitBtn = document.createElement('button');

  // Set input attributes
  nameInput.type = 'text';
  nameInput.placeholder = 'Name';

  emailInput.type = 'email'; 
  emailInput.placeholder = 'Email';

  dateInput.type = 'date';

  submitBtn.textContent = 'Submit';

  // Append to form
  form.append(nameInput, emailInput, dateInput, submitBtn);

  // Append form to document
  document.body.append(form);

  form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Get input values
    const name = nameInput.value;
    const email = emailInput.value;
    const date = dateInput.value;

    // Log or process booking data
    console.log('Booking:', {name, email, date});

    // Remove form
    form.remove();
  });

});



// Get Check Out button
const checkoutBtn = document.getElementById('checkout-btn');

// Add click listener
checkoutBtn.addEventListener('click', () => {

  // Create form
  const form = document.createElement('form');

  // Create date input
  const checkoutDateInput = document.createElement('input');
  checkoutDateInput.type = 'date';

  // Get check-in date from database
  fetch('/get-checkin-date')
    .then(res => res.json())
    .then(checkinDate => {

      // Set minimum date based on check-in
      checkoutDateInput.min = checkinDate;

      // Append input to form  
      form.append(checkoutDateInput);

      // Append form to document
      document.body.append(form);

    })
    .catch(err => console.error(err));

  // Handle form submit  
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Get checkout date
    const checkoutDate = checkoutDateInput.value;

    // Process checkout  
    console.log('Checking out on ', checkoutDate);

    // Remove form
    form.remove();
  });

});

async function reserveTable() {
  // get data
  const data = { /* name, email, guests, date */ };

  try {
    const response = await sendRequest('/reserveTable', data);
    console.log(response);
  } catch (error) {
    // handle error (if needed)
  };