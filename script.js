let sportpoints = Number(localStorage.getItem("sportpoints")) || 0;
let mathpoints = Number(localStorage.getItem("mathpoints")) || 0;
let mappoints = Number(localStorage.getItem("mappoints")) || 0;
let historypoints = Number(localStorage.getItem("historypoints")) || 0;
let chemistrypoints = Number(localStorage.getItem("chemistrypoints")) || 0;
let biologypoints = Number(localStorage.getItem("biologypoints")) || 0;
let Uname = localStorage.getItem("Uname") || "Guest";
let greet = document.querySelector("#greet");
let deletes;

let total =
  sportpoints +
  mathpoints +
  mappoints +
  historypoints +
  chemistrypoints +
  biologypoints;

let display_points = document.querySelector("#display_points");
display_points.innerHTML = total;
let Change = document.querySelectorAll(".Change");
Change.forEach((c) => {
  c.addEventListener("dblclick", () => {
    deletes = prompt("This will reset your points.Type 'Yes' or 'No'");
    if (deletes.toLowerCase() == "yes") {
      localStorage.setItem("sportpoints", 0);
      localStorage.setItem("mathpoints", 0);
      localStorage.setItem("mappoints", 0);
      localStorage.setItem("historypoints", 0);
      localStorage.setItem("chemistrypoints", 0);
      localStorage.setItem("biologypoints", 0);
      total = 0;
      display_points.innerHTML = total;
      alert("All points have been reset.");
    }
  });
});
greet.innerHTML = `Hi ${Uname}`;
document.getElementById("showToastBtn").addEventListener("click", function () {
  let toastElement = document.getElementById("myToast");
  let toast = new bootstrap.Toast(toastElement);
  toast.show();
});
