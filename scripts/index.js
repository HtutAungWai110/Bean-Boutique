const fetchUrl = "data/data.json"; //json file url
  export async function fetchData(){
    try{
    const res = await fetch(fetchUrl);
    //fetching data from data.json file
    const fetchedData = res.json();
    //formatting response into json format

    //Error handling
    if(!res.ok){
      throw new Error("Could not fetch resources!")
    //404 status data not found
    }
    return fetchedData;
    //Returning data
    }
    catch(error){
      console.error(error);
      displayErrorPopup(error);
      //catching errors and displaying them
    }
    
  }

export function displayErrorPopup (error){
//Error popup function to display error occurance
const popup  = document.querySelector(".overlay-popup");
const closePopup = document.getElementById("closePopup"); 
const errorMessage = document.querySelector(".error-message");
//selecting html elements

popup.style.visibility = "visible";
popup.style.opacity = 1;

//Displaying popup box if an error occurs

errorMessage.textContent = error;

//Adding eventlistener and passing closePopupBox function
closePopup.addEventListener('click', () => 
    closePopupBox(popup))
}

function closePopupBox(popup){
popup.style.opacity = 0;
popup.addEventListener("transitionend", (e) => {
  e.target.style.visibility = "hidden"; //Setting visibility to hidden after transition
})
document.getElementById("closePopup").removeEventListener('click', closePopupBox) //Removes eventlistener after clicking
}

  export async function filterData(target){
    try{
      const fetchedData = await fetchData();
      if (fetchedData === undefined){
        throw new Error ("Could not fectch resources")
      }
      const filteredData = await fetchedData.filter(item => 
        item.category === target //if item category matches, return current item 
      )
      if (filteredData.length === 0){
        throw new Error("Items not found!")//if an array is empty, 0 items is found
      }
      return filteredData;
    } catch(error){
      displayErrorPopup(error);
    }
    //Data filtering function to filter data based on category
      
  };

   export const ratingMap = {
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

export function addViewEvent(target){
const btns = document.querySelectorAll(target);
btns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
      gotoProductPage(id);
    }
  })
})
}

function gotoProductPage(id){
  // Encode the ID to be safe in the URL
const encodedId = encodeURIComponent(id);

// Construct the new URL with query parameter
const url = `product.html?id=${encodedId}`;

window.location.href = url;
}


export function domEvents(){

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

let hidden = true;
const dropdDown = document.getElementById("dropDown")
const hoverDropdown = dropdDown.querySelector(".hover-dropdown");
window.addEventListener("DOMContentLoaded", () => {
    hoverDropdown.addEventListener("click", () => {
    const dropDownBox = dropdDown.querySelector(".navdropdown-box");
    if (hidden){
        
        dropDownBox.classList.toggle("navdropdown-box-show");
        dropdDown.querySelector('.arrowIcon').src = "assets/icons/keyboard_arrow_up_20dp_000000_FILL0_wght400_GRAD0_opsz20.png"
        hidden = false;
    } else {
        dropDownBox.classList.toggle("navdropdown-box-show");
        dropdDown.querySelector('.arrowIcon').src = "assets/icons/keyboard_arrow_down_20dp_000000_FILL0_wght300_GRAD200_opsz20.png"
        hidden = true;
    }
    
})

const searchTrigger = document.getElementById('searchTrigger');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('[data-searchBtn]')
const closeBtn = document.getElementById('closeSearch');

searchTrigger.addEventListener('click', () => {
    searchOverlay.style.top = "0";
    setTimeout(() => {
        searchInput.focus();
    }, 300); // Wait for slide-in animation
});

closeBtn.addEventListener('click', () => {
    searchOverlay.style.top = "-100px";
});



searchInput.addEventListener('focus', () => {
    window.addEventListener('keydown', (e) => {
        if (e.key === "Enter"){
        search();   
        }
    })
});

searchBtn.addEventListener("click", () => {
    search();
})

function search(){
    if (searchInput.value === ""){
                return;
    }
    const safeSearch = searchInput.value.replace(/[^\w\s]/gi, '').split(" ").join("+"); 
    const url = `search-page.html?search=${encodeURIComponent(safeSearch)}`;
    window.location.href = url;
}

const cartBtn = document.querySelector("[data-cart]");
cartBtn.addEventListener("click", () => {
    window.location.href = "cart-page.html"
})
})


const cartData = JSON.parse(localStorage.getItem("cartData")) || []
const cartCount = document.querySelector("[data-cartCount]");
cartCount.textContent = cartData.length;

const menuBtn = document.querySelector("[data-menu]");
const navMenu = document.querySelector("[data-responsiveNav]");
const navClose = document.querySelector("[data-navClose]");

menuBtn.addEventListener("click", () => {
  navMenu.style.width = "100%";
})

navClose.addEventListener("click", () => {
  navMenu.style.width = "0%";
})

}