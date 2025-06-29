import { fetchData, filterData } from "./index.js";
import { ratingMap } from "./index.js";
import { addViewEvent } from "./index.js";
import { domEvents } from "./index.js";

const params = new URLSearchParams(window.location.search);
const category = params.get('category');

let productsData;




async function getProducts(){
  try{
      const fetchedData = await filterData(category)
      productsData = fetchedData;
      
      if (!fetchedData) {
        document.querySelector(".footer").style.display = "none";
        throw new Error("Products not found")

      };
    renderProducts();

  } catch (error){
    document.querySelector(".items-wrapper").innerHTML = error
    console.error(error)
  }
   
} 


function renderProducts(){
    const itemsContainer = document.getElementById("products-page-item-list");
    itemsContainer.innerHTML = "";
    const itemsList = productsData.map(item => 
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
    )
    document.querySelector(".category-header").textContent = category.toUpperCase();
    document.querySelector(".result").textContent = `${productsData.length} results`;
    itemsContainer.innerHTML = itemsList.join("");
    const promo = document.querySelectorAll('.promotion');
    promo.forEach(promo => {
      if (!promo.textContent.trim()) {
        promo.style.padding = '0';
      }
    })
    addViewEvent(".view-btn");
};





function addEventListeners(){
  const sortData = document.getElementById("sortData");
  const overlayLoading = document.querySelector(".overlay-loading");
  sortData.addEventListener("change", (e) => {
    const selected = e.target.value;
    switch (true){
      case selected === "default":
        productsData.sort((a, b) => a.id - b.id);
        break;
      case selected === "popularity":
        productsData.sort((a, b) => (b.ratedNumber * b.rating) - (a.ratedNumber * a.rating));
        break;
      case selected === "lowToHigh":
        productsData.sort((a, b) => a.price - b.price);
        break;

      case selected === "highToLow":
        productsData.sort((a, b) => b.price - a.price);
        break;
      
    }
    overlayLoading.style.visibility = "visible";
    setTimeout(() => {
      renderProducts();
      overlayLoading.style.visibility = "hidden";
    }, 1000)
    

  })


}



window.addEventListener("load", () => {
  getProducts();
  addEventListeners();
})


domEvents();