const bodyEl = document.querySelector("body");
const navEl = document.querySelector(".navigation-header nav");
const menuEl = document.querySelector(".navigation-header .menu");
const navBackdropEl = document.querySelector(
  ".navigation-header .nav-backdrop"
);
const closeIconEl = document.querySelector(".navigation-header .close-icon");
const navItems = Array.from(document.querySelectorAll(".navigation-header li"));

[menuEl, navBackdropEl, closeIconEl, ...navItems].forEach((element) => {
  element.addEventListener("click", () => {
    const wasNavHidden = getComputedStyle(navEl)["display"] === "none";
    toggleOverflow(bodyEl, !wasNavHidden);
    toggleVisibleClass(navEl);
  });
});

function toggleVisibleClass(el) {
  el.classList.toggle("visible");
}

function toggleOverflow(el, isOverflow) {
  if (isOverflow) {
    el.style.overflow = "visible";
  } else {
    el.style.overflow = "hidden";
  }
}
