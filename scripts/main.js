//Swpier image slider initiation

import { fetchData } from "./index.js";
import { filterData } from "./index.js";


  
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

  const ratingMap = {
    0: "assets/ratings/rating-0.png",
    0.5: "assets/ratings/rating-05.png",
    1: "assets/ratings/rating-10.png",
    1.5: "assets/ratings/rating-15.png",
    2: "assets/ratings/rating-20.png",
    2.5: "assets/ratings/rating-25.png",
    3: "assets/ratings/rating-30.png",
    3.5: "assets/ratings/rating-35.png",
    4: "assets/ratings/rating-40.png",
    4.5: "assets/ratings/rating-45.png",
    5: "assets/ratings/rating-50.png",
  } //Rating map to match rating images with rating scores fetched from data.json
  

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
              <p class="price">£${(item.price/100).toFixed(2)}</p>
              <a href="product.html?id=${item.id}" class="view-link">
                  <button class="view-btn">View product
                      <img src="assets/icons/arrow_right_alt_20dp_FFFFFF_FILL0_wght300_GRAD200_opsz20.png" alt="arrow"
                      class="view-btn-arrow">
                  </button>
              </a>
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
              <p class="price">£${(item.price/100).toFixed(2)}</p>
              <a href="product.html?id=${item.id}" class="view-link">
                  <button class="view-btn">View product
                      <img src="assets/icons/arrow_right_alt_20dp_FFFFFF_FILL0_wght300_GRAD200_opsz20.png" alt="arrow"
                      class="view-btn-arrow">
                  </button>
              </a>
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
              <p class="price">£${(item.price/100).toFixed(2)}</p>
              <a href="product.html?id=${item.id}" class="view-link">
                  <button class="view-btn">View product
                      <img src="assets/icons/arrow_right_alt_20dp_FFFFFF_FILL0_wght300_GRAD200_opsz20.png" alt="arrow"
                      class="view-btn-arrow">
                  </button>
              </a>
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
              <p class="price">£${(item.price/100).toFixed(2)}</p>
              <a href="product.html?id=${item.id}" class="view-link">
                  <button class="view-btn">View product
                      <img src="assets/icons/arrow_right_alt_20dp_FFFFFF_FILL0_wght300_GRAD200_opsz20.png" alt="arrow"
                      class="view-btn-arrow">
                  </button>
              </a>
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
      })
      console.log(itemlist);

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