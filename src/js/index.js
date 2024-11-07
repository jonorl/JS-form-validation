import "../css/style.css";

// Global variables

const form = document.querySelector("form");
const email = document.getElementById("email");
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
      } else if (email.validity.typeMismatch) {
        // If it's not an email address,
        error.textContent = "Entered value needs to be an email address.";
      } else if (email.validity.tooShort) {
        // If the value is too short,
        error.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
      }
      // Add the `active` class
      error.className = "error active";
      break;
  }
}
