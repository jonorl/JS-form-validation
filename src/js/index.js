import "../css/style.css";

// Global variables

const form = document.querySelector("form");
const email = document.getElementById("email");
const country = document.getElementById("country");
const countryRegex = /^[A-Za-z\s]+$/;
const postcode = document.getElementById("postcode");
const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i
let error;
let targetID;

// Event listeners

form.addEventListener("input", (event) => {
  targetID = event.target.id;
  error = document.querySelector(`#${targetID} + span.error`);
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
      }
    case postcode:
      if (postcodeRegex.test(postcode.value)) {
        error.textContent = ""; // Remove the message content
        error.className = "error"; // Removes the `active` class
      } else {
        // If there is still an error, show the correct error
        showError(event, error);
      }
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

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
      else
      // Add the `active` class
      error.className = "error";
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
        error.textContent = "Please enter a country name";
      } else error.textContent = "";
      break;
  }
}
