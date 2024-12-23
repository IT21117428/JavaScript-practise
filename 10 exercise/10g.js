function buttonToggle(selector) {
  const buttonElem = document.querySelector(selector);
  if (!buttonElem.classList.contains("is-gaming")) {
    turnOffPreviousButton();
    buttonElem.classList.add("is-gaming");
  } else {
    buttonElem.classList.remove("is-gaming");
  }
}

function turnOffPreviousButton() {
  const previousButton = document.querySelector(".is-gaming");
  if (previousButton) {
    previousButton.classList.remove("is-gaming");
  }
}
