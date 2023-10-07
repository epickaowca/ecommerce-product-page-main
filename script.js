const bodyEl = document.querySelector("body");
const navEl = document.querySelector(".navigation-header nav");
const menuEl = document.querySelector(".navigation-header .menu");
const navBackdropEl = document.querySelector(
  ".navigation-header .nav-backdrop"
);
const closeIconEl = document.querySelector(".navigation-header .close-icon");
const navItems = Array.from(document.querySelectorAll(".navigation-header li"));
const quantityInput = document.querySelector("#quantity-input");
const quantityBtns = Array.from(document.querySelectorAll(".quantity-btn"));
const addToCartBtns = Array.from(document.querySelectorAll(".add-to-cart-btn"));
const mainSection = document.querySelector(".main-section");
const cartContainer = document.querySelector(".cart-container");
const cartIcon = document.querySelector(".cart");

cartIcon.addEventListener("click", () => {
  const isDialogOpen = cartContainer.open;
  if (isDialogOpen) {
    cartContainer.close();
  } else {
    cartContainer.show();
  }
});

addToCartBtns.forEach((el) => {
  el.addEventListener("click", () => {
    const parent = el.closest(".product-description-container");
    const imageDiv = parent
      .closest("main")
      .querySelector(".product-image-container .thumbnail-1");
    const imageUrl = window.getComputedStyle(imageDiv).backgroundImage;

    const headingText = parent.querySelector(".heading").innerText;
    const price = parseFloat(parent.querySelector(".price").innerText.slice(1));
    const quantity = parseInt(quantityInput.value);
    if (quantity > 0) {
      const itemEl = document.createElement("div");
      const imageEl = document.createElement("div");
      const deleteIcon = document.createElement("img");
      deleteIcon.src = "./assets/icon-delete.svg";
      deleteIcon.alt = "delete-icon";
      deleteIcon.classList.add("delete-icon");
      const checkoutBtn = document.querySelector(".checkout-btn");
      const emptySpan = document.querySelector(".empty-span");
      const isCheckoutVisible = checkoutBtn.classList.contains("visible");
      const isEmptySpanVisible = emptySpan.classList.contains("visible");

      deleteIcon.addEventListener("click", (e) => {
        e.target.parentNode.remove();
        if (!mainSection.querySelector(".item")) {
          toggleVisibleClass(checkoutBtn);
          toggleVisibleClass(emptySpan);
        }
      });

      imageEl.style.backgroundImage = imageUrl;
      imageEl.classList.add("image");
      itemEl.classList.add("item");

      itemEl.innerHTML = `
      <div class="description">
        <p>${headingText}</p>
        <span>
        <p class="price-quantity">$${price} x ${quantity}</p>
        <p class="price">$${price * quantity}</p>
        </span>
      </div>`;
      itemEl.prepend(imageEl);
      itemEl.append(deleteIcon);

      if (isEmptySpanVisible) {
        toggleVisibleClass(emptySpan);
      }
      if (!isCheckoutVisible) {
        toggleVisibleClass(checkoutBtn);
      }
      mainSection.prepend(itemEl);
    }
  });
});

quantityBtns.forEach((el) => {
  el.addEventListener("click", () => {
    const { sign } = el.dataset;
    const quantity = +quantityInput.value;
    if (sign === "plus") {
      quantityInput.value = quantity + 1;
    } else if (sign === "minus" && quantity !== 1) {
      quantityInput.value = quantity - 1;
    }
  });
});

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
