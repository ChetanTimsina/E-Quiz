let heading = document.querySelector("#heading");

heading.addEventListener("click", () => {
  let nameElement = document.querySelector("#name");
  if (nameElement) {
    let Uname = nameElement.textContent.trim(); // Trim spaces
    localStorage.setItem("Uname", Uname);
    console.log("Stored:", Uname); // Debugging log
  } else {
    console.error("#name element not found");
  }
});
