// Selecting form and input elements
const registerForm = document.getElementById('registerForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const ageSelect = document.getElementById('age');
const genderInputs = document.getElementsByName('gender');
const termsCheckbox = document.getElementById('terms');
const successMessage = document.getElementById('successMessage');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const ageError = document.getElementById('ageError');
const genderError = document.getElementById('genderError');
const termsError = document.getElementById('termsError');

// Toggle password visibility
passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    passwordToggle.classList.toggle('fa-eye');
    passwordToggle.classList.toggle('fa-eye-slash');
});

// Form submission handler
registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    let isValid = true;

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    ageError.textContent = '';
    genderError.textContent = '';
    termsError.textContent = '';
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    passwordError.classList.remove('show');
    ageError.classList.remove('show');
    genderError.classList.remove('show');
    termsError.classList.remove('show');
    successMessage.classList.remove('show');

    // 1. Full Name Validation: Not empty and at least 2 characters
    const fullName = fullNameInput.value.trim();
    if (fullName.length === 0) {
        nameError.textContent = 'Full name cannotទ: cannot be empty.';
        nameError.classList.add('show');
        isValid = false;
    } else if (fullName.length < 2) {
        nameError.textContent = 'Full name must be at least 2 characters long.';
        nameError.classList.add('show');
        isValid = false;
    }

    // 2. Email Validation: Not empty and contains '@' and '.'
    const email = emailInput.value.trim();
    if (email.length === 0) {
        emailError.textContent = 'Email cannot be empty.';
        emailError.classList.add('show');
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.add('show');
        isValid = false;
    }

    // 3. Password Validation: Not empty and at least 8 characters
    const password = passwordInput.value;
    if (password.length === 0) {
        passwordError.textContent = 'Password cannot be empty.';
        passwordError.classList.add('show');
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        passwordError.classList.add('show');
        isValid = false;
    }

    // 4. Age Range Validation: Must be selected
    const age = ageSelect.value;
    if (age === '') {
        ageError.textContent = 'Please select your age range.';
        ageError.classList.add('show');
        isValid = false;
    }

    // 5. Gender Validation: One option must be selected
    let genderSelected = false;
    for (const genderInput of genderInputs) {
        if (genderInput.checked) {
            genderSelected = true;
            break;
        }
    }
    if (!genderSelected) {
        genderError.textContent = 'Please select your gender.';
        genderError.classList.add('show');
        isValid = false;
    }

    // 6. Terms Checkbox Validation: Must be checked
    if (!termsCheckbox.checked) {
        termsError.textContent = 'You must agree to the Terms and Conditions.';
        termsError.classList.add('show');
        isValid = false;
    }

    // If all validations pass, show success message
    if (isValid) {
        successMessage.classList.add('show');
        registerForm.reset(); // Reset form after successful submission
    }
});