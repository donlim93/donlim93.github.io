document.addEventListener("DOMContentLoaded", function () {
  const expandableHeaders = document.querySelectorAll(".header");
  const expandableContents = document.querySelectorAll(".content");
  const expandButtons = document.querySelectorAll(".expandButton");

  expandableHeaders.forEach((header, index) => {
    header.addEventListener("click", function () {
      expandableContents[index].classList.toggle("active");
      if (expandableContents[index].classList.contains("active")) {
        expandButtons[index].textContent = "-";
      } else {
        expandButtons[index].textContent = "+";
      }
    });
  });
});
