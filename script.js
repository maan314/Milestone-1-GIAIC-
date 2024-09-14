// Function to generate the resume
function generateResume(event) {
    event.preventDefault();
    //form values
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');
    var experienceInput = document.getElementById('experience');
    //resume on the page
    document.getElementById('displayName').textContent = nameInput.value;
    document.getElementById('displayEmail').textContent = emailInput.value;
    document.getElementById('displayPhone').textContent = phoneInput.value;
    document.getElementById('displayExperience').textContent = experienceInput.value;
}
//event listener
var resumeForm = document.getElementById('resumeForm');
resumeForm.addEventListener('submit', generateResume);
