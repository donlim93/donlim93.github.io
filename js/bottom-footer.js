let contentHeight = document.querySelector(".tab-content").offsetHeight;
let container = document.querySelector(".tab-content");
let footer = document.querySelector("footer");

container.style.height = `${contentHeight}px`;
footer.style.top = `${contentHeight}px`;
