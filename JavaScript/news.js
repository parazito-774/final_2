const nextElBtn = document.querySelector(".next-button");
const prevElBtn = document.querySelector(".prev-button");
let productsUrl = "https://dummyjson.com/products";
let productData = [];
let itemsPerPage;
let currentPage = 1;

if (window.matchMedia("(max-width: 1031px)").matches) {
  itemsPerPage = 4;
  dataCard();
} else if (window.matchMedia("(max-width: 1439px)").matches) {
  itemsPerPage = 8;
  dataCard();
} else {
  itemsPerPage = 9;
  dataCard();
}

//Fetching Data Function
async function productCard() {
  try {
    const data = await fetch(productsUrl);
    const resolve = await data.json();
    productData = resolve.products;
  } catch (error) {
    console.log(error);
  }
}

//Pagination and Create Cards Function
async function dataCard() {
  await productCard();

  const pages = [];
  for (let i = 0; i <= Math.ceil(productData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstPage, indexOfLastPage);

  document.querySelector(".main-news-container").innerHTML = currentItems
    .map(
      (products) =>
        `
        <div class="main-news-card">
          <div class="main-news-card-imagebox" style="background: url(${products.images[0]}), lightgray 50% / cover no-repeat; background-size: 100% 100%;"></div>
            <div class="main-news-card-container">
              <p class="main-news-card-category">${products.category}</p>
              <h3 class="main-news-card-title">${products.title}</h3>
              <p class="main-news-card-description">
                ${products.description}
              </p>
              <div class="main-news-card-person-container">
                <div style="display: flex; gap: 16px">
                  <div class="main-news-card-person-img"></div>
                  <div>
                  <h3 class="main-news-card-person-price">Price ${products.price}$</h4>
                  <p class="main-news-card-person-stock">Stock ${products.stock}</p>
                  </div>
                </div>

                <div class="main-news-card-person-reacts-container">
                  <img src="./Assets/Images/like.svg" alt="like-icon" class="like">
                  <img src="./Assets/Images/comment.svg" alt="comment-icon" class="comment">
                  <img src="./Assets/Images/share.svg" alt="share-icon" class="share">
                </div>
              </div>
            </div>
          </div>
        </div>
    `
    )
    .join("");
}

//Pagination of cards
const pageOne = document.querySelector(".page-1");
const pageTwo = document.querySelector(".page-2");
const pageThree = document.querySelector(".page-3");
const pageFour = document.querySelector(".page-4");

pageOne.addEventListener("click", () => {
  currentPage = 1;
  dataCard();
  document.querySelector(".prev-button").style.color = "rgba(0, 0, 0, 0.5)";
  pageOne.classList.add("active-page");
  pageTwo.classList.remove("active-page");
  pageThree.classList.remove("active-page");
  pageFour.classList.remove("active-page");
  nextElBtn.style.cssText = "pointer-events: auto; color: #4f46e5";
});

pageTwo.addEventListener("click", () => {
  currentPage = 2;
  dataCard();
  document.querySelector(".prev-button").style.color = "#4f46e5";
  pageOne.classList.remove("active-page");
  pageThree.classList.remove("active-page");
  pageFour.classList.remove("active-page");
  pageTwo.classList.add("active-page");
  nextElBtn.style.cssText = "pointer-events: auto; color: #4f46e5";
});

pageThree.addEventListener("click", () => {
  currentPage = 3;
  dataCard();
  document.querySelector(".prev-button").style.color = "#4f46e5";
  pageTwo.classList.remove("active-page");
  pageOne.classList.remove("active-page");
  pageFour.classList.remove("active-page");
  pageThree.classList.add("active-page");
  nextElBtn.style.cssText = "pointer-events: auto; color: #4f46e5";
});

pageFour.addEventListener("click", () => {
  currentPage = 4;
  dataCard();
  document.querySelector(".prev-button").style.color = "#4f46e5";
  pageTwo.classList.remove("active-page");
  pageThree.classList.remove("active-page");
  pageOne.classList.remove("active-page");
  pageFour.classList.add("active-page");
  nextElBtn.style.cssText = "pointer-events: none; color: rgba(0, 0, 0, 0.5)";
});

//Previous and Next Buttons
document.querySelector(".prev-button").addEventListener("click", () => {
  if ((currentPage - 1) * itemsPerPage) {
    currentPage--;
    dataCard();
  }
  if (currentPage === 1) {
    document.querySelector(".prev-button").style.color = "rgba(0, 0, 0, 0.5)";
    pageOne.classList.add("active-page");
    pageTwo.classList.remove("active-page");
    pageThree.classList.remove("active-page");
    pageFour.classList.remove("active-page");
  }
  if (currentPage === 2) {
    pageOne.classList.remove("active-page");
    pageThree.classList.remove("active-page");
    pageFour.classList.remove("active-page");
    pageTwo.classList.add("active-page");
  }
  if (currentPage === 3) {
    pageTwo.classList.remove("active-page");
    pageOne.classList.remove("active-page");
    pageFour.classList.remove("active-page");
    pageThree.classList.add("active-page");
  }
  if (currentPage === 4) {
    pageTwo.classList.remove("active-page");
    pageThree.classList.remove("active-page");
    pageOne.classList.remove("active-page");
    pageFour.classList.add("active-page");
  }
  if (currentPage === 3) {
    nextElBtn.style.cssText = "pointer-events: auto; color: #4f46e5";
  }
});

nextElBtn.addEventListener("click", () => {
  if ((currentPage * itemsPerPage) / productData.length) {
    currentPage++;
    dataCard();
  }
  if (currentPage != 1) {
    document.querySelector(".prev-button").style.color = "#4f46e5";
  }
  if (currentPage === 2) {
    pageOne.classList.remove("active-page");
    pageThree.classList.remove("active-page");
    pageFour.classList.remove("active-page");
    pageTwo.classList.add("active-page");
  }
  if (currentPage === 3) {
    pageTwo.classList.remove("active-page");
    pageOne.classList.remove("active-page");
    pageFour.classList.remove("active-page");
    pageThree.classList.add("active-page");
  }
  if (currentPage === 4) {
    pageTwo.classList.remove("active-page");
    pageThree.classList.remove("active-page");
    pageOne.classList.remove("active-page");
    pageFour.classList.add("active-page");
  }
  if (currentPage > 4) {
    pageTwo.classList.remove("active-page");
    pageThree.classList.remove("active-page");
    pageOne.classList.remove("active-page");
    pageFour.classList.remove("active-page");
  }
  if (currentPage === 4) {
    nextElBtn.style.cssText = "pointer-events: none; color: rgba(0, 0, 0, 0.5)";
  }
});

//Read More Button
const readMore = document.querySelector(".main-readmore");
readMore.addEventListener("click", () => {
  itemsPerPage += 4;
  dataCard();
});

//Modal cards when click
async function modalCard() {
  await productCard();

  document.querySelectorAll(".main-news-card-imagebox").forEach((el, index) =>
    el.addEventListener("click", () => {
      const products = productData[index];

      const cardsModal = document.createElement("div");
      cardsModal.classList.add("cards-modal");

      const cardsModalImage = document.createElement("div");
      cardsModalImage.classList.add("cards-modal-image");
      cardsModalImage.style.cssText = `background: url(${products.images[0]}), lightgray 50% / cover no-repeat; background-size: 100% 100%`;

      const cardsModalCategory = document.createElement("p");
      cardsModalCategory.classList.add("cards-modal-category");
      cardsModalCategory.textContent = products.category;

      const cardsModalTitle = document.createElement("h3");
      cardsModalTitle.classList.add("cards-modal-title");
      cardsModalTitle.textContent = products.title;

      const cardsModalDescription = document.createElement("p");
      cardsModalDescription.classList.add("cards-modal-description");
      cardsModalDescription.textContent = products.description;

      const cardsModalPrice = document.createElement("h2");
      cardsModalPrice.classList.add("cards-modal-price");
      cardsModalPrice.textContent = `Price ${products.price}$`;

      const cardsModalClose = document.createElement("button");
      cardsModalClose.classList.add("cards-modal-close");
      cardsModalClose.textContent = "Close";

      cardsModal.appendChild(cardsModalImage);
      cardsModal.appendChild(cardsModalCategory);
      cardsModal.appendChild(cardsModalTitle);
      cardsModal.appendChild(cardsModalDescription);
      cardsModal.appendChild(cardsModalPrice);
      cardsModal.appendChild(cardsModalClose);

      document.body.appendChild(cardsModal);

      cardsModalClose.addEventListener("click", () => {
        cardsModal.remove();
      });
    })
  );
}

//Run function for not being
modalCard();
prevElBtn.addEventListener("click", modalCard);
nextElBtn.addEventListener("click", modalCard);
readMore.addEventListener("click", modalCard);

/* შექმენით მთელი რიცხვების მასივი, ვთქვათ originalArray, მინიმუმ 10 ელემენტით. დაწერეთ ფუნქცია, სახელად filterArray, რომელიც იღებს ორიგინალურ მასივს და აბრუნებს ახალ მასივს, რომელიც შეიცავს მხოლოდ ლუწი ელემენტებს ორიგინალური მასივიდან. */

const originalArray = [23, 8, 14, 17, 20, 30, 11, 6, 9, 12];

function filterArray(originalArray) {
  return originalArray.filter(originalArray % 2 === 0);
}

filterArray();
