//Swpier image slider initiation

import { fetchData } from "./index.js";
import { filterData } from "./index.js";
import { ratingMap } from "./index.js";
import { addViewEvent } from "./index.js";

  
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
  

  const data = fetchData();


  

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

  


  
  renderBeansContainer();
  renderCoffeeContainer();
  renderCoffeeMachines();
  rednerPoupularItems();


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // Optional: if you want it to disappear when not in view
    }
  });
});

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

