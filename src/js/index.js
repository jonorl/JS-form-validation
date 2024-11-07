import "../css/style.css";

// Global variables

const menuButton = document.querySelector(".menuButtonImage");
const menuButtonSubtree = document.querySelector(".menuButtonSubtree");

// Event listeners

menuButton.addEventListener("click", () => {
  menuButtonSubtree.classList.toggle("visible");
});

window.addEventListener("click", function (event) {
  // Check if the menu button of the parent of the children divs are being hit and if not hides the menu again 
  if (!event.target.matches(".menuButtonImage") && !event.target.closest(".menuButtonSubtree")) {
    let childrenDivs = document.querySelectorAll(".menuButtonSubtree");
    let i;
    for (i = 0; i < childrenDivs.length; i++) {
      let openDropdown = childrenDivs[i];
      if (openDropdown.classList.contains("visible")) {
        openDropdown.classList.remove("visible");
      }
    }
  }
});
