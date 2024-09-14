

// Function to handle form submission and generate the resume
function generateResume(event: Event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
  
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const university = (document.getElementById('university') as HTMLInputElement).value;
    const graduation = (document.getElementById('graduation') as HTMLInputElement).value;
  
    const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const years = (document.getElementById('years') as HTMLInputElement).value;
  
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim());
  
    // Generate unique URL
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const uniqueURL = `${window.location.origin}/resume/${username}`;
    
    // Display Personal Information with editable fields
    const personalInfo = `
      <h1><strong></strong> <span contenteditable="true" class="editable" data-field="name">${name}</span></h1>
      <p><strong>Email:</strong> <span contenteditable="true" class="editable" data-field="email">${email}</span></p>
      <p><strong>Phone:</strong> <span contenteditable="true" class="editable" data-field="phone">${phone}</span></p>
    `;
    document.getElementById('personalInfo')!.innerHTML = personalInfo;
  
    // Display Education with editable fields
    const education = `
      <p><strong>Degree:</strong> <span contenteditable="true" class="editable" data-field="degree">${degree}</span></p>
      <p><strong>University:</strong> <span contenteditable="true" class="editable" data-field="university">${university}</span></p>
      <p><strong>Year of Graduation:</strong> <span contenteditable="true" class="editable" data-field="graduation">${graduation}</span></p>
    `;
    document.getElementById('education')!.innerHTML = education;
  
    // Display Work Experience with editable fields
    const workExperience = `
      <p><strong>Job Title:</strong> <span contenteditable="true" class="editable" data-field="jobTitle">${jobTitle}</span></p>
      <p><strong>Company:</strong> <span contenteditable="true" class="editable" data-field="company">${company}</span></p>
      <p><strong>Years:</strong> <span contenteditable="true" class="editable" data-field="years">${years}</span></p>
    `;
    document.getElementById('workExperience')!.innerHTML = workExperience;
  
    // Display Skills with editable fields
    const skillsList = `
      <p><strong>Skills:</strong></p>
      <ul id="skillsList">
        ${skills.map(skill => `<li contenteditable="true" class="editable">${skill}</li>`).join('')}
      </ul>
    `;
    document.getElementById('skillsList')!.innerHTML = skillsList;

    // Save resume data in localStorage
    localStorage.setItem(`resume_${username}`, JSON.stringify({
      personalInfo,
      education,
      workExperience,
      skillsList
    }));
  
    // Show unique URL and download button
    document.getElementById('shareDownload')!.style.display = 'block';
    (document.getElementById('shareLink') as HTMLElement).innerHTML = `Your unique URL: <a href="${uniqueURL}" target="_blank">${uniqueURL}</a>`;
    (document.getElementById('downloadBtn') as HTMLElement).onclick = downloadPDF;
}

// Function to handle inline edits
function handleInlineEdits(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('editable')) {
        target.addEventListener('blur', (e) => {
            const element = e.target as HTMLElement;
            const field = element.getAttribute('data-field');
            const newValue = element.innerText;
            console.log(`Updated ${field}: ${newValue}`);
            // Optionally update form fields or other parts of the resume here
        });
    }
}

// Function to download resume as a PDF
const { jsPDF } = window.jspdf;
function downloadPDF() {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text(document.getElementById('personalInfo')!.innerText, 10, 10);
    doc.text(document.getElementById('education')!.innerText, 10, 40);
    doc.text(document.getElementById('workExperience')!.innerText, 10, 70);
    doc.text(document.getElementById('skillsList')!.innerText, 10, 100);

    doc.save('resume.pdf');
}

// Add event listener to the form
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
resumeForm.addEventListener('submit', generateResume);

// Add event listener to handle inline edits
document.addEventListener('blur', handleInlineEdits, true);
