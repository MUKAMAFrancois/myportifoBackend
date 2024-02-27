/*=================PAGINATION=================*/


const cardsPerPage = 2; // Number of cards to show per page 
const dataContainer = document.getElementById('data-container'); 
const pagination = document.getElementById('pagination'); 
const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 
const pageNumbers = document.getElementById('page-numbers'); 
const pageLinks = document.querySelectorAll('.page-link'); 

const cards = 
	Array.from(dataContainer.getElementsByClassName('card')); 

// Calculate the total number of pages 
const totalPages = Math.ceil(cards.length / cardsPerPage); 
let currentPage = 1; 

// Function to display cards for a specific page 
function displayPage(page) { 
	const startIndex = (page - 1) * cardsPerPage; 
	const endIndex = startIndex + cardsPerPage; 
	cards.forEach((card, index) => { 
		if (index >= startIndex && index < endIndex) { 
			card.style.display = 'block'; 
		} else { 
			card.style.display = 'none'; 
		} 
	}); 
} 

// Function to update pagination buttons and page numbers 
function updatePagination() { 
	pageNumbers.textContent = 
		`Page ${currentPage} of ${totalPages}`; 
	prevButton.disabled = currentPage === 1; 
	nextButton.disabled = currentPage === totalPages; 
	pageLinks.forEach((link) => { 
		const page = parseInt(link.getAttribute('data-page')); 
		link.classList.toggle('active', page === currentPage); 
	}); 
} 


// Event listener for "Previous" button 
prevButton.addEventListener('click', (e) => { 
	e.preventDefault(); // Prevent default behavior
	if (currentPage > 1) { 
		currentPage--; 
		displayPage(currentPage); 
		updatePagination(); 
	} 
}); 

// Event listener for "Next" button 
nextButton.addEventListener('click', (e) => { 
	e.preventDefault(); // Prevent default behavior
	if (currentPage < totalPages) { 
		currentPage++; 
		displayPage(currentPage); 
		updatePagination(); 
	} 
}); 

// Event listener for page number buttons 
pageLinks.forEach((link) => { 
	link.addEventListener('click', (e) => { 
		e.preventDefault(); // Prevent default behavior
		const page = parseInt(link.getAttribute('data-page')); 
		if (page !== currentPage) { 
			currentPage = page; 
			displayPage(currentPage); 
			updatePagination(); 
		} 
	}); 
}); 


// Initial page load 
displayPage(currentPage); 
updatePagination();



/*======= menu toggle =========*/
const  menuToggle = document.querySelector('.outer-links');
const closeMenu = document.querySelector('.fa-circle-xmark');
const openMenu = document.querySelector('.fa-bars');
function hideMenu(){
	  menuToggle.style.right = '-220px';
}
function showMenu(){
	menuToggle.style.right = '0px';
}


/* =============COMMENT SYSTEM============ */

const comments= document.querySelector('.comments'),
		userCommnetInput=document.querySelector('.usercomment'),
		publishBtn=document.getElementById('publish'),
		date = new Date().toLocaleString();

userCommnetInput.addEventListener('input', function(){

	if(!userCommnetInput.value){
		publishBtn.setAttribute('disabled', 'disabled');
		publishBtn.classList.remove('abled');
	}
	else{
		publishBtn.removeAttribute('disabled');
		publishBtn.classList.add('abled');
	}
});




function postComment() {
    if (!userCommnetInput.value) return;

    const users = JSON.parse(localStorage.getItem('formData')) || [];
    const commentedEmail = document.getElementById('commented_email').value.toLowerCase();
    const userExist = users.some(user => user.reg_email === commentedEmail);

    if (userExist) {
        // User is registered, allow them to post a comment
        const typedMessage = userCommnetInput.value;
        const published = 
            `<div class="single-commented">
                <img src="./images/comment_imgs/user1.png" alt="">
                <div class="written-comment">
                    <h4>${commentedEmail}</h4>
                    <p>${typedMessage}<br><span id="comment-date">${date}</span></p>
                    <div class="comment-actions">
                        <div class="likes">Likes <span>0</span></div>
                        <div class="dislikes">Dislikes <span>0</span></div>
                    </div>
                </div>
            </div>`;
        comments.innerHTML += published;
        userCommnetInput.value = '';
        publishBtn.classList.remove('abled');

        let allComments = document.querySelectorAll('.single-commented').length;
        document.getElementById("comment").textContent = allComments;
    } else {
        // User is not registered, inform them to register or login
        alert("You can't comment, please Register or Login");
    }
}


publishBtn.addEventListener('click',postComment);









//* =========SEARCH======= */
function searchBlog(){
	const blogSearch=document.getElementById('search-recent-blog');
	let text_being_typed =blogSearch.value.toLowerCase();
	let list_of_blogs=document.querySelectorAll('.summary h2');

	list_of_blogs.forEach(single_blog=>{
		let blog_text =single_blog.textContent.toLowerCase();
		
		if(blog_text.includes(text_being_typed)){
			single_blog.parentElement.parentElement.style.display="block";
		} else{
			single_blog.parentElement.parentElement.style.display="none";
		}
	})

}

document.getElementById('search-recent-blog').addEventListener('input',searchBlog);



/* ==========pagination of recent Blogs======== */



let presentPage = 1;
const itemsPerPage = 2,
 		items = document.querySelectorAll('.single-blog-summary'),
 		all_Pages = Math.ceil(items.length / itemsPerPage),
 		previousBtn=document.querySelector('.previous-btn'),
		nextBtn=document.querySelector('.next-btn')

// Initially hide the Previous button
previousBtn.style.display = 'none';

// Function to show items for the current page
function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Show the initial page
showPage(presentPage);

// Event listener for Next button
nextBtn.addEventListener('click', () => {
    presentPage++;
    if (presentPage > 1) {
        previousBtn.style.display = 'block';
    }
    if (presentPage >= all_Pages) {
        nextBtn.style.display = 'none';
    }
    showPage(presentPage);
});

// Event listener for Previous button
previousBtn.addEventListener('click', () => {
    presentPage--;
    if (presentPage === 1) {
        previousBtn.style.display = 'none';
    }
    if (presentPage < all_Pages) {
        nextBtn.style.display = 'block';
    }
    showPage(presentPage);
});




/* =========	LIKES=========== */



let isLiked = false;
let isDisliked = false;

const toggleLike = () =>{
	const likeBtn = document.getElementById('likeBtn');
	const likeCount = document.getElementById('likeCount');
	if(isLiked){
		likeBtn.classList.remove('like');
		likeCount.textContent = parseInt(likeCount.textContent) + 1;
	}else{
		isLiked = true;
		if(isDisliked){
			isDisliked = false;
			document.getElementById('dislikeBtn').classList.remove('dislike');
			document.getElementById('dislikeCount').textContent = parseInt(document.getElementById('dislikeCount').textContent) - 1;
		}
		likeBtn.classList.add('like');
		likeCount.textContent = parseInt(likeCount.textContent) + 1;
	}
}

const toggleDislike = () =>{
	const dislikeBtn = document.getElementById('dislikeBtn');
	const dislikeCount = document.getElementById('dislikeCount');
	if(isDisliked){
		dislikeBtn.classList.remove('dislike');
		dislikeCount.textContent = parseInt(dislikeCount.textContent) +1;
	}else{
		isDisliked = true;
		if(isLiked){
			isLiked = false;
			document.getElementById('likeBtn').classList.remove('like');
			document.getElementById('likeCount').textContent = parseInt(document.getElementById('likeCount').textContent) - 1;
		}
		dislikeBtn.classList.add('dislike');
		dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
	}
}

document.getElementById('likeBtn').addEventListener('click', toggleLike);
document.getElementById('dislikeBtn').addEventListener('click', toggleDislike);

