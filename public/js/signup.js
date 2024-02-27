
// // sign up form validation.

// const signup_form = document.querySelector('#signup'), // Changed selector to use the form's ID
//     signup_email = document.querySelector('.registration-email'),
//     signup_password = document.querySelector('.registration-password'),
//     password2 = document.querySelector('#confirm-password-registration');

// function setError(element, message) {
//     const inputField = element.parentElement;
//     const errorDisplay = inputField.querySelector('small');
//     errorDisplay.innerText = message;
//     errorDisplay.classList.add('error');
//     errorDisplay.classList.remove('success');
// }

// function setSuccess(element) {
//     const inputField = element.parentElement;
//     const errorDisplay = inputField.querySelector('small');
//     errorDisplay.innerText = '';
//     errorDisplay.classList.add('success');
//     errorDisplay.classList.remove('error');
// }

// function isValidEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

// function signup_validation() {
//     const signupEmail = signup_email.value.trim(),
//         signupPassword = signup_password.value.trim(),
//         signupPassword2 = password2.value.trim();

//     if (signupEmail === '') {
//         setError(signup_email, "email can not be blank");
//     } else if (!isValidEmail(signupEmail)) {
//         setError(signup_email, "Provide valid Email");

//     } else {
//         setSuccess(signup_email);
//     }

//     if (signupPassword === '') {
//         setError(signup_password, "password can not be blank");
//     } else if (signupPassword.length < 8) {
//         setError(signup_password, 'Password must be at least 8 characters');
//     } else {
//         setSuccess(signup_password);
//     }

//     if (signupPassword2 === '') {
//         setError(password2, 'Confirm password is required');
//     } else if (signupPassword2 !== signupPassword) {
//         setError(password2, 'Passwords do not match');
//     } else {
//         setSuccess(password2);
//     }
// }



// document.addEventListener('DOMContentLoaded', function () {
//     // Changed selector to use the form's ID
//     document.querySelector('#signup').addEventListener('submit', e => {
//         e.preventDefault();
//         signup_validation();
//     });

//     document.querySelector('.signup-button').addEventListener('click', registration);
// });
