let topMenu = document.querySelector('.menu-list-top');
function clickingX_Symbolmenu(){
    topMenu.style.right="-220px";

}


function openMenu(){
    // remember that we have set the right to be -220px (not showing), then here we will show it.
    topMenu.style.right="0";

}


// comment section validation.
        const contactForm = document.getElementById('contact-form');
        const nameInput = document.getElementById('your_name_contact');
        const emailInput = document.getElementById('your_email_contact');
        const messageInput = document.getElementById('your_message_contact');
        const nameError = document.getElementById('your_name_error');
        const emailError = document.getElementById('your_email_error');
        const messageError = document.getElementById('your_message_error');

        function displayFlashMessage(message) {
            const flashMessage = document.createElement('div');
            flashMessage.textContent = message;
            flashMessage.classList.add('flash-message');
            document.body.appendChild(flashMessage);

            setTimeout(() => {
                flashMessage.remove();
            }, 3000);
        }

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let isValid = true;

            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Please enter your name.';
                isValid = false;
            } else {
                nameError.textContent = '';
            }

            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Please enter your email.';
                isValid = false;
            } else {
                const emailPattern =   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
                if (!emailPattern.test(emailInput.value)) {
                    emailError.textContent = 'Please enter a valid email.';
                    isValid = false;
                } else {
                    emailError.textContent = '';
                }
            }

            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Please enter your message.';
                isValid = false;
            } else {
                messageError.textContent = '';
            }

            if (isValid) {
                // Submit the form
                contactForm.submit();
                displayFlashMessage('Your comment has been submitted.');
                window.location.href="./form_validation.html";
            }
        });
