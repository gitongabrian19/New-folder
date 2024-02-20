const book = document.querySelector('.btn1');
const serverUrl = 'http://localhost:3000/submitBookNow';


function showFormBookNow(){
    document.getElementById("bookingForm").classList.toggle("hidden")
   }
  
  const resetFields = () =>{
      document.getElementById('name').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('check-in').value = '';
      document.getElementById('check-out').value = '';
      document.getElementById('guest').value = '';
  }
  
const submitForm = async () =>{   
const fname = document.querySelector('.name');
const phone = document.querySelector('.phone');
const checkIn = document.querySelector('.check-in');
const checkOut = document.querySelector('.check-out');
const guests = document.querySelector('.guest');

const name2 = fname.value;
const phone2 = phone.value;
const checkIn2 = checkIn.value;
const checkOut2 = checkOut.value;
const guest2 = guests.value;

  try{
      const response = await  fetch(serverUrl, {
          method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({name2, phone2, checkIn2,checkOut2,guest2 })
         })
     if(response.ok){
      const serverResponse = await response.json();
      console.log(serverResponse);
  
       if(serverResponse.message == 1){
           alert("booking done successfuly");
       }else{
          alert("error occured when booking ");
       }
     }
  }catch(error){
      console.log('error occured',error);
  }
    }

  book.addEventListener("click",submitForm);