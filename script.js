// Function to handle form submission and generate the resume
function generateResume(event) {
    event.preventDefault(); // Prevent form submission
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var degree = document.getElementById('degree').value;
    var university = document.getElementById('university').value;
    var graduation = document.getElementById('graduation').value;
    var jobTitle = document.getElementById('jobTitle').value;
    var company = document.getElementById('company').value;
    var years = document.getElementById('years').value;
    var skills = document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); });
    // Generate unique URL
    var username = document.getElementById('username').value;
    var uniqueURL = "".concat(window.location.origin, "/resume/").concat(username);
    // Display Personal Information with editable fields
    var personalInfo = "\n      <h1><strong></strong> <span contenteditable=\"true\" class=\"editable\" data-field=\"name\">".concat(name, "</span></h1>\n      <p><strong>Email:</strong> <span contenteditable=\"true\" class=\"editable\" data-field=\"email\">").concat(email, "</span></p>\n      <p><strong>Phone:</strong> <span contenteditable=\"true\" class=\"editable\" data-field=\"phone\">").concat(phone, "</span></p>\n    ");
    document.getElementById('personalInfo').innerHTML = personalInfo;
    // Display Education with editable fields
    var education = "\n      <p><strong>Degree:</strong> <span contenteditable=\"true\" class=\"editable\" data-field=\"degree\">".concat(degree, "</span></p>\n      <p><strong>University:</strong> <span contenteditable=\"true\" class=\"editable\" data-field=\"university\">").concat(university, "</span></p>\n      <p><strong>Year of Graduation:</strong> <span contenteditable=\"true\" class=\"editable\" data-field=\"graduation\">").concat(graduation, "</span></p>\n    ");
    document.getElementById('education').innerHTML = education;
    // Display Work Experience with editable fields
    var workExperience = "\n      <p><strong>Job Title:</strong> <span contenteditable=\"true\" class=\"editable\" data-field=\"jobTitle\">".concat(jobTitle, "</span></p>\n      <p><strong>Company:</strong> <span contenteditable=\"true\" class=\"editable\" data-field=\"company\">").concat(company, "</span></p>\n      <p><strong>Years:</strong> <span contenteditable=\"true\" class=\"editable\" data-field=\"years\">").concat(years, "</span></p>\n    ");
    document.getElementById('workExperience').innerHTML = workExperience;
    // Display Skills with editable fields
    var skillsList = "\n      <p><strong>Skills:</strong></p>\n      <ul id=\"skillsList\">\n        ".concat(skills.map(function (skill) { return "<li contenteditable=\"true\" class=\"editable\">".concat(skill, "</li>"); }).join(''), "\n      </ul>\n    ");
    document.getElementById('skillsList').innerHTML = skillsList;
    // Save resume data in localStorage
    localStorage.setItem("resume_".concat(username), JSON.stringify({
        personalInfo: personalInfo,
        education: education,
        workExperience: workExperience,
        skillsList: skillsList
    }));
    // Show unique URL and download button
    document.getElementById('shareDownload').style.display = 'block';
    document.getElementById('shareLink').innerHTML = "Your unique URL: <a href=\"".concat(uniqueURL, "\" target=\"_blank\">").concat(uniqueURL, "</a>");
    document.getElementById('downloadBtn').onclick = downloadPDF;
}
// Function to handle inline edits
function handleInlineEdits(event) {
    var target = event.target;
    if (target.classList.contains('editable')) {
        target.addEventListener('blur', function (e) {
            var element = e.target;
            var field = element.getAttribute('data-field');
            var newValue = element.innerText;
            console.log("Updated ".concat(field, ": ").concat(newValue));
            // Optionally update form fields or other parts of the resume here
        });
    }
}
// Function to download resume as a PDF
var jsPDF = window.jspdf.jsPDF;
function downloadPDF() {
    var doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(document.getElementById('personalInfo').innerText, 10, 10);
    doc.text(document.getElementById('education').innerText, 10, 40);
    doc.text(document.getElementById('workExperience').innerText, 10, 70);
    doc.text(document.getElementById('skillsList').innerText, 10, 100);
    doc.save('resume.pdf');
}
// Add event listener to the form
var resumeForm = document.getElementById('resumeForm');
resumeForm.addEventListener('submit', generateResume);
// Add event listener to handle inline edits
document.addEventListener('blur', handleInlineEdits, true);
