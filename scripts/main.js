//Swpier image slider initiation

import { fetchData } from "./index.js";
import { filterData } from "./index.js";


  
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper', {
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




  renderCoffeeContainer();