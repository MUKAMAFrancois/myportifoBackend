
// function login(event) {
//     console.log("Button clicked");
//     event.preventDefault();

//     let login_email = document.querySelector('.login-email').value;
//     let data = JSON.parse(localStorage.getItem('formData')) || [];
    
//     if (!data.length) {
//         document.querySelector('.message-validation').innerHTML="Please create your account. It's your first time here.";
//     } 
    
//     else {
//         let exist = data.some(existdata => existdata.reg_email === login_email);
        
//         if (!exist) {
//             document.querySelector('.message-validation').innerHTML="User with this email does not exist. Please sign up.";
//         } else {
//             window.location.href = "/index.html"; 
//         }
//     }


// }
// document.querySelector('#logging-in').addEventListener('click', login);






