function buttonToggle(selector) {
  const buttonElem = document.querySelector(selector);
  if (!buttonElem.classList.contains("is-gaming")) {
    buttonElem.classList.add("is-gaming");
  } else {
    buttonElem.classList.remove("is-gaming");
  }
}
