//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop < 20 ||
    document.documentElement.scrollTop < 20 ||
    document.body.scrollTop == 0 ||
    document.documentElement.scrollTop == 0
  ) {
    mybutton.style.display = "none";
  } else {
    mybutton.style.display = "block";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
