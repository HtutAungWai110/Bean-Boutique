import { fetchData } from "./index.js";
import { ratingMap } from "./index.js";
import { addViewEvent } from "./index.js";

const params = new URLSearchParams(window.location.search);
const searchTarget = params.get('search');

let searchResults;
let maxResults = 10;


async function search() {
  const fetchedData = await fetchData();
  const searchTerms = searchTarget.toLowerCase().split(" "); 

  const scoredResults = fetchedData.map(item => {
    const name = item.name.toLowerCase();
    const category = item.category.toLowerCase();
    let score = 0;
    for (let term of searchTerms){
      if (name.includes(term)) score += 2;
      if (name.startsWith(term)) score += 1;
      if (category === term) score += 3;
    }
    return {item, score};
  }).filter(entry => entry.score > 0);
  
  searchResults = scoredResults.sort((a,b) => b.score - a.score).map(entry => entry.item);



  if (searchResults.length === 0) {
    document.querySelector('.result-sort-wrapper').style.display = "none";
    document.querySelector('.footer').style.display = "none";
  }
  if (searchResults.length < 10) {
    document.querySelector(".loadmore-btn").style.display = "none";
  }

  renderResults();
}


function renderResults(){
    const trimedData = searchResults.slice(0, maxResults);
    const itemsContainer = document.getElementById("products-page-item-list");
    itemsContainer.innerHTML = "";
    if (trimedData.length ===  searchResults.length){
      document.getElementById("loadmoreBtn").style.display = "none"
    }
    const itemsList = trimedData.map(item => 
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
    document.querySelector(".search-results").textContent = `Search Results for "${searchTarget}"`
    document.querySelector(".result").textContent = `Showing ${trimedData.length} of ${searchResults.length} results`;
 
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
    console.log(selected)
    switch (true){
      case selected === "default":
        searchResults.sort((a, b) => a.id - b.id);
        break;
      case selected === "popularity":
        searchResults.sort((a, b) => (b.ratedNumber * b.rating) - (a.ratedNumber * a.rating));
        break;
      case selected === "lowToHigh":
        searchResults.sort((a, b) => a.price - b.price);
        break;

      case selected === "highToLow":
        searchResults.sort((a, b) => b.price - a.price);
        break;
      
    }
    overlayLoading.style.visibility = "visible";
    setTimeout(() => {
      renderResults();
      overlayLoading.style.visibility = "hidden";
    }, 1000)
    

  })


}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // Optional: if you want it to disappear when not in view
    }
  });
});


window.addEventListener("load", ()=>{
    search();
    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
    addEventListeners();
    const loadmoreBtn = document.getElementById('loadmoreBtn');
    loadmoreBtn.addEventListener("click", () => {
      maxResults += 10;
      renderResults();
    })
})
