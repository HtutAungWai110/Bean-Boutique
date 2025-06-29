//Swpier image slider initiation

import { fetchData } from "./index.js";
import { filterData } from "./index.js";
import { ratingMap } from "./index.js";
import { addViewEvent } from "./index.js";
import { domEvents } from "./index.js";

  
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.imageSwiper', {
      // parameters
      loop: true,
      autoplay: {
        delay: 5000,
      },

      // pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // navigation buttons
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

  });

//Pending promise will be temporarily stored in data variable for later use

async function renderCoffeeContainer(){
  try{

  const filtered = await filterData("coffee"); //Fetching all coffee items from data.json
  const trimedData = filtered.splice(0, 10); //Triming array 
  const coffeeContainer = document.getElementById("coffeeContainer")
  if (filtered.length === 0){
    throw new Error ("Products not found")
  } 
  const itemlist = trimedData.map(item =>
    `<div class="item" data-state="item" key=${item.id}>
        <img src="${item.images[0]}" alt="${item.images[0]}" class="item-img">
        <p class="item-name item-padding">${item.name}</p>
          <a href="product.html?id=${item.id}" class="breif-description item-padding">
          ${item.briefDescription}
          </a>
        <div class="rating-wrapper item-padding">
            <img src="${ratingMap[item.rating]}" alt="rating" class="rating">
            <span class="rated-number">
            ${item.ratedNumber}
            </span>
        </div>
        <div class="price-btn-wrapper item-padding">
            <div style="display: flex; gap: 15px; align-items: center;">
            <p class="price">£${(item.price/100).toFixed(2)}</p>
            <p class="diagonal-line">${item?.preDisPrice? (item.preDisPrice / 100).toFixed(2) : ""}</p>
            </div>
                <button class="view-btn" data-id="${item.id}">View
                </button>
        </div>

        <div class="promotion">
        
        ${item?.promotion || ""}
        </div>
      </div>
    `

  );

  

  coffeeContainer.innerHTML = itemlist.join('')
  const promo = document.querySelectorAll('.promotion');
  promo.forEach(promo => {
    if (!promo.textContent.trim()) {
      promo.style.padding = '0';
    }
  
  })

  } catch(error){
    console.error(error)
  coffeeContainer.innerHTML = `<p>${error}</p>`
  }

  addViewEvent(".view-btn");

};

  async function renderBeansContainer(){
  try{

  const filtered = await filterData("beans"); //Fetching all coffee items from data.json
  const trimedData = filtered.splice(0, 5); //Triming array 
  const beansContainer = document.getElementById("beansContainer")
  if (filtered.length === 0){
    throw new Error ("Products not found")
  } 
  const itemlist = trimedData.map(item =>
    `<div class="item" data-state="item" key=${item.id}>
        <img src="${item.images[0]}" alt="${item.images[0]}" class="item-img">
        <p class="item-name item-padding">${item.name}</p>
          <a href="product.html?id=${item.id}" class="breif-description item-padding">
          ${item.briefDescription}
          </a>
        <div class="rating-wrapper item-padding">
            <img src="${ratingMap[item.rating]}" alt="rating" class="rating">
            <span class="rated-number">
            ${item.ratedNumber}
            </span>
        </div>
        <div class="price-btn-wrapper item-padding">         
            <div style="display: flex; gap: 15px; align-items: center;">
              <p class="price">£${(item.price/100).toFixed(2)}</p>
              <p class="diagonal-line">${item?.preDisPrice? (item.preDisPrice / 100).toFixed(2) : ""}</p>
            </div>
                <button class="view-btn" data-id="${item.id}">View
                </button>
        </div>

        <div class="promotion">
        
        ${item?.promotion || ""}
        </div>
      </div>
    `
  );

  
  beansContainer.innerHTML = itemlist.join('')
  const promo = document.querySelectorAll('.promotion');
  promo.forEach(promo => {
    if (!promo.textContent.trim()) {
      promo.style.padding = '0';
    }
  })

  } catch(error){
    console.error(error)
  coffeeContainer.innerHTML = `<p>${error}</p>`
  }

  addViewEvent(".view-btn");
  
};

async function  renderCoffeeMachines() {
  try{

  const filtered = await filterData("espresso machine"); //Fetching all coffee items from data.json
  const trimedData = filtered.splice(0, 5); //Triming array 
  const coffeMachinesContainer = document.getElementById("coffeMachinesContainer")
  if (filtered.length === 0){
    throw new Error ("Products not found")
  } 
  const itemlist = trimedData.map(item =>
    `<div class="item" data-state="item" key=${item.id}>
        <img src="${item.images[0]}" alt="${item.images[0]}" class="item-img">
        <p class="item-name item-padding">${item.name}</p>
          <a href="product.html?id=${item.id}" class="breif-description item-padding">
          ${item.briefDescription}
          </a>
        <div class="rating-wrapper item-padding">
            <img src="${ratingMap[item.rating]}" alt="rating" class="rating">
            <span class="rated-number">
            ${item.ratedNumber}
            </span>
        </div>
        <div class="price-btn-wrapper item-padding">
            <div style="display: flex; gap: 15px; align-items: center;">
              <p class="price">£${(item.price/100).toFixed(2)}</p>
              <p class="diagonal-line">${item?.preDisPrice? (item.preDisPrice / 100).toFixed(2) : ""}</p>
            </div>
                <button class="view-btn" data-id="${item.id}">View
                </button>
        </div>

        <div class="promotion">
        
        ${item?.promotion || ""}
        </div>
      </div>
    `
  );

  

  coffeMachinesContainer.innerHTML = itemlist.join('')
  const promo = document.querySelectorAll('.promotion');
  promo.forEach(promo => {
    if (!promo.textContent.trim()) {
      promo.style.padding = '0';
    }
  })

  } catch(error){
    console.error(error)
  coffeeContainer.innerHTML = `<p>${error}</p>`
  }

  addViewEvent(".view-btn");

  
}

async function  rednerPoupularItems() {
    const fetchedData = await fetchData();
    const sorted = (fetchedData.sort((a, b) => (b.ratedNumber * b.rating) - (a.ratedNumber * a.rating))).slice(0, 10);
    const pouplarItemsContainer = document.getElementById("pouplarItemsContainer");
    const itemlist = sorted.map(item => 
      `<div class="item swiper-slide" data-state="item" key=${item.id}>
        <img src="${item.images[0]}" alt="${item.images[0]}" class="item-img">
        <p class="item-name item-padding">${item.name}</p>
          <a href="product.html?id=${item.id}" class="breif-description item-padding">
          ${item.briefDescription}
          </a>
        <div class="rating-wrapper item-padding">
            <img src="${ratingMap[item.rating]}" alt="rating" class="rating">
            <span class="rated-number">
            ${item.ratedNumber}
            </span>
        </div>
        <div class="price-btn-wrapper item-padding">
            <div style="display: flex; gap: 15px; align-items: center;">
            <p class="price">£${(item.price/100).toFixed(2)}</p>
            <p class="diagonal-line">${item?.preDisPrice? (item.preDisPrice / 100).toFixed(2) : ""}</p>
            </div>
                <button class="view-btn" data-id="${item.id}">View
                </button>
        </div>

        <div class="promotion">
        
        ${item?.promotion || ""}
        </div>
      </div>
    `
    );
    pouplarItemsContainer.innerHTML = itemlist.join('');
    const promo = document.querySelectorAll('.promotion');
      promo.forEach(promo => {
        if (!promo.textContent.trim()) {
          promo.style.padding = '0';
        }
      });

    addViewEvent(".view-btn");
    const mySwiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 6,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1280: {
      slidesPerView: 6,
    },
    1024: {
      slidesPerView: 5,
    },
    860: {
      slidesPerView: 4,
    },
    // when window width is <= 480px
    480: {
      slidesPerView: 3,
    }, 

    300: {
      slidesPerView: 2,
    }
    },
  });

}

  

window.addEventListener("load", () => {
  renderBeansContainer();
  renderCoffeeContainer();
  renderCoffeeMachines();
  rednerPoupularItems();


const exploreBtns = document.querySelectorAll("[data-exploreBtns]");
exploreBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const data =  e.target.dataset.explore.split(" ").join("+")
      const url = `products.html?category=${data}`;
      window.location.href = url;
    })
});
const passwordInputs = document.querySelectorAll("[data-password]");
const toggleShowBtns = document.querySelectorAll("[data-toggleShow]");

toggleShowBtns.forEach((element, index) => {
  element.addEventListener("click", (e) => {
    if (passwordInputs[index].type == "password"){
      passwordInputs[index].type = "text";
      e.target.src = "assets/icons/visibility_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
    } else {
      passwordInputs[index].type = "password"
      e.target.src = "assets/icons/visibility_off_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
    }
  })
})




document.getElementById("bookNowBtn").addEventListener("click", () => {
  window.location.href = "booking.html"})
})


  

let lastScrollTop = 0;
const nav = document.querySelector("nav");

window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll < lastScrollTop) {
        // Scrolling up
        nav.style.top = "0";
    } else {
        // Scrolling down
        nav.style.top = "-150px"; // hides the nav (adjust if your nav height is different)
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

document.addEventListener("DOMContentLoaded", () => {
const welcomePopup = document.querySelector("[data-welcomePopup]");
const closeBtn = document.querySelector("[data-welcomeClose]");


if (!sessionStorage.getItem("welcomePopupClosed")) {
  welcomePopup.style.display = "block"
  welcomePopup.style.opacity = 1;
} else {
  welcomePopup.style.opacity = 0;

  welcomePopup.addEventListener("transitionend", (e) => {
    e.target.style.display = "none"
  });
}


closeBtn.addEventListener("click", () => {
  welcomePopup.style.opacity = 0;

  welcomePopup.addEventListener("transitionend", (e) => {
    e.target.style.display = "none"
  });
  sessionStorage.setItem("welcomePopupClosed", "true");
});
});


domEvents();



