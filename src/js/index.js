import "../css/style.css";

// Global variables

const form = document.querySelector("form");
const email = document.getElementById("email");
const country = document.getElementById("country");
const countryRegex = /^[A-Za-z\s]+$/;
const postcode = document.getElementById("postcode");
const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i;
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("passwordConfirmation");
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let error;
let targetID;

// Event listeners

form.addEventListener("input", (event) => {
  validate(event);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validate(event);
});

// Auxiliary functions

function showError(event, error) {
  let target = event.target;
  switch (target.id) {
    case "email":
      if (target.validity.valueMissing) {
        // If empty
        error.textContent = "You need to enter an email address.";
        error.className = "error active";
      } else if (email.validity.typeMismatch) {
        // If it's not an email address,
        error.textContent = "Entered value needs to be an email address.";
        error.className = "error active";
      } else if (email.validity.tooShort) {
        // If the value is too short,
        error.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
        error.className = "error active";
      }
      // Add the `active` class
      else error.className = "error";
      break;

    case "country":
      if (country.value.length !== 0 && !countryRegex.test(country.value)) {
        error.textContent = "Invalid country name";
      } else if (country.value.length === 0) {
        error.textContent = "Please enter a country name";
      } else error.textContent = "";
      break;

    case "postcode":
      if (postcode.value.length !== 0 && !postcodeRegex.test(postcode.value)) {
        error.textContent = "Invalid postcode";
      } else if (postcode.value.length === 0) {
        error.textContent = "Please enter a postocde";
      } else error.textContent = "";
      break;

    case "password":
      if (password.value.length !== 0 && !passwordRegex.test(password.value)) {
        error.textContent =
          "Password must have 1 upper, 1 lowercase, 1 digit, and special char and min 8 chars";
        error.className = "error active";
      } else if (password.value.length === 0) {
        error.textContent = "Please enter your password";
        error.className = "error active";
      } else error.textContent = "";
      break;

    case "passwordConfirmation":
      if (
        passwordConfirmation.value.length !== 0 &&
        !passwordRegex.test(passwordConfirmation.value)
      ) {
        error.textContent =
          "Password must have 1 upper, 1 lowercase, 1 digit, and special char and min 8 chars";
        error.className = "error active";
      } else if (passwordConfirmation.value !== password.value) {
        error.textContent = "Passwords don't match";
        error.className = "error active";
      } else if (passwordConfirmation.value.length === 0) {
        error.textContent = "Please enter your password";
        error.className = "error active";
      } else error.textContent = "";
      break;
  }
}

function validate(event) {
  targetID = event.target.id;

  // This IF statement is for when clicking on the submit button, to make it loop through every element to validate
  if (targetID === "") {
    error = document.querySelector(`#submit + span.error`);
    const array = [email, country, postcode, password, passwordConfirmation];
    array.forEach((element) => {
      event = {
        target: element,
      };
      validate(event);
    });
  } else {
    error = document.querySelector(`#${targetID} + span.error`);
  }

  switch (event.target) {
    case email:
      if (email.validity.valid) {
        error.textContent = ""; // Remove the message content
        error.className = "error"; // Removes the `active` class
      } else {
        // If there is still an error, show the correct error
        showError(event, error);
        break;
      }
    case country:
      if (countryRegex.test(country.value)) {
        error.textContent = ""; // Remove the message content
        error.className = "error"; // Removes the `active` class
      } else {
        // If there is still an error, show the correct error
        showError(event, error);
        break;
      }
    case postcode:
      if (postcodeRegex.test(postcode.value)) {
        error.textContent = ""; // Remove the message content
        error.className = "error"; // Removes the `active` class
      } else {
        // If there is still an error, show the correct error
        showError(event, error);
        break;
      }
    case password:
      if (passwordRegex.test(password.value)) {
        error.textContent = ""; // Remove the message content
        error.className = "error"; // Removes the `active` class
      } else {
        // If there is still an error, show the correct error
        showError(event, error);
        break;
      }
    case passwordConfirmation:
      if (
        passwordRegex.test(passwordConfirmation.value) &&
        passwordConfirmation.value === password.value
      ) {
        error.textContent = ""; // Remove the message content
        error.className = "error"; // Removes the `active` class
      } else {
        // If there is still an error, show the correct error
        showError(event, error);
        break;
      }
  }
}
