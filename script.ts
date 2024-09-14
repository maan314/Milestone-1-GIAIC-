// Function to generate the resume
function generateResume(event: Event) {
    event.preventDefault();
    
    //form values
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const experienceInput = document.getElementById('experience') as HTMLTextAreaElement;
  
    //resume on the page
    document.getElementById('displayName')!.textContent = nameInput.value;
    document.getElementById('displayEmail')!.textContent = emailInput.value;
    document.getElementById('displayPhone')!.textContent = phoneInput.value;
    document.getElementById('displayExperience')!.textContent = experienceInput.value;
  }
  
  //event listener
  const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
  resumeForm.addEventListener('submit', generateResume);
  