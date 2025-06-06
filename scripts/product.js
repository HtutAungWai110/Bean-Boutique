import { fetchData } from "./index.js";

const params = new URLSearchParams(window.location.search);
const productid = params.get('id');
let product;

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

async function findProuct(productid){
    try{
        const fectcheddata = await fetchData();
        const productData = await fectcheddata.find(item => item.id === Number(productid));
        if (!productData){
            throw new Error ('Product not found')
        }
        product = productData;
        console.log(product)
        renderProducts(productData);
        product.quantity = 1;
    } catch (error){
        console.error(error);
        document.getElementById("productContainer").innerHTML = error
    }

    
   
}

function renderProducts(product){
    const {id, name, category, price, promotion, rating, ratedNumber, images,  briefDescription, description, tasteNote, bagSize} = product

    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    const tempSelection = category === "coffee" ? `<div class="selection-wrapper">
                    <p>Iced or Hot: </p>
                    <div class="custom-select">
                        <div class="selected-wrapper">
                            <div class="selected" data-temp="Hot">Hot</div>
                            <img src="assets/icons/keyboard_arrow_down_20dp_000000_FILL0_wght300_GRAD200_opsz20.png" alt="drop down" class="dropdown-icon">
                        </div>
                        
                        <div class="options">
                            <div class="option" data-temp="Hot">Hot</div>
                            <div class="option" data-temp="Iced">Iced</div>
                        </div>
                </div>

                </div>` :  "";

    const portionSelection = category === "coffee" ? `<div class="size-selection-wrapper">
                    <p class="size-options-text">Size options</p>
                    <div class="size-options">
                        <div class="portion-wrapper">
                            <img src="assets/icons/coffee-paper-cup_85002.png" alt="coffee-paper-cup" class="small-cup portion-size" 
                            data-tag="selected-portion" 
                            data-percentIncrease="0"
                            data-portion="small">
                            <span class="small-text">Small</span>
                        </div>

                        <div class="portion-wrapper">
                            <img src="assets/icons/coffee-paper-cup_85002.png" alt="coffee-paper-cup" class="medium-cup portion-size" 
                            data-tag="portions" 
                            data-percentIncrease="0.2"
                            data-portion="medium">
                            <span class="medium-text">Medium</span>
                        </div>
                            
                        <div class="portion-wrapper">
                            <img src="assets/icons/coffee-paper-cup_85002.png" alt="coffee-paper-cup" class="large-cup portion-size" 
                            data-tag="portions" 
                            data-percentIncrease="0.5"
                            data-portion="large">
                            <span class="large-text">Large</span>
                        </div>
                            
                    </div>
                
                </div>` : "";

    const discount = promotion ? `<div style="padding: 10px 10px;
    background-color: #4c2910;
    width: fit-content;
    border-radius: 10px;
    color: #ffff;
    ">${promotion}</div>` : "";

    const beanSelection = category === "beans" ? `<div class="selection-wrapper">
                    <p>Whole or Ground bean: </p>
                    <div class="custom-select">
                        <div class="selected-wrapper">
                            <div class="selected" data-bean="Whole">Whole</div>
                            <img src="assets/icons/keyboard_arrow_down_20dp_000000_FILL0_wght300_GRAD200_opsz20.png" alt="drop down" class="dropdown-icon">
                        </div>
                        
                        <div class="options">
                            <div class="option" data-bean="Whole">Whole</div>
                            <div class="option" data-bean="Blend">Blend</div>
                        </div>
                </div>

                </div>` : "";

    const tasteNoteText = tasteNote ? `<p 
        style="
        padding: 20px 0px;"
    >Taste Note: ${tasteNote}</p>` : "";

    const bagSizeText = bagSize ? `<p 
        style="
        padding: 20px 0px;"
    >Taste Note: ${bagSize}</p>` : "";

    productContainer.innerHTML = `
     <div class="product-left-container data-id=${id} data-name=${name}">
            <div class="item-images-container">
                <img src="${images[0]}" alt="" class="main-image" data-state="mainImage">
                <div class="images-wrapper">
                    <img src="${images[0]}" alt="" data-state="images">
                    <img src="${images[1]}" alt="" data-state="images">
                    <img src="${images[2]}" alt="" data-state="images">
                </div>
            </div>
        </div>

        <div class="product-right-container">
                <div class="product-name">
                    <p>${briefDescription}</p>
                </div>

                <div class="description-grid">
                    <p>Description:</p>
                    <p>${description}</p>
                </div>

                ${tasteNoteText}
                
                ${tempSelection}
                ${portionSelection}
                ${beanSelection}
                ${bagSizeText}

                <div style="padding: 20px 0px;">
                Quantity: 
                <input type="number" id="quantity" min=1 value=1 style="width: 50px;"/>
                </div>
                
                <div class="price-wrapper">
                    <p>Price: £</p>
                    <p data-price="${(price)}">${(price / 100).toFixed(2)}</p>  
                ${discount}
                </div>

                <div class="product-rating-wrapper">
                    <p>Rating:</p>
                    <img src="${ratingMap[rating]}" alt="" class="product-rating">
                    <p class="product-rating-number">${ratedNumber} user ratings</p>
                </div>

                <button id="addToCart" class="add-to-cart-btn">
                    Add to cart
                </button>
        </div>
    `
    
    appendEventListeners(product);
}

function appendImagesEvent(e){
    const src = e.target.src;
    const mainImage = document.querySelector("[data-state=mainImage]");
    mainImage.style.opacity = 0;
    
    

    mainImage.addEventListener("transitionend", () => {
        mainImage.src = src;
        mainImage.style.opacity = 1;
    })

}

function appendPortionSelectionEvent(e, arr, product){

    arr.forEach(item => 
        item.dataset.tag = "portions"
    )
    const priceSelector = document.querySelector("[data-price]");
    const price = product.price;
    const percentIncrease = Number(e.target.dataset.percentincrease);
    const updatedPrice = Number(price + (price * percentIncrease))
    e.target.dataset.tag = "selected-portion";
    priceSelector.dataset.price = updatedPrice;
    priceSelector.textContent = (updatedPrice / 100).toFixed(2);
    product.portion = e.target.dataset.portion;

}

function appendEventListeners(product){
    
    const imgaes = document.querySelectorAll("[data-state=images]")
    imgaes.forEach((image,index) => 
        {
            image.addEventListener('click', (e) => 
                
                appendImagesEvent(e))

        }
    );

    const quantityInput = document.getElementById("quantity");
    quantityInput.addEventListener("change", () => {
        product.quantity = quantityInput.value;
        console.log(product)
    })

    if (product.category === "beans"){
        const selectBox = document.querySelector('.custom-select') || null;
        if (selectBox){
            const selectWrapper = selectBox.querySelector(".selected-wrapper")
            const dropdownIcon = selectWrapper.querySelector(".dropdown-icon")
            const selected = selectWrapper.querySelector('.selected');
            const optionsContainer = selectBox.querySelector('.options');
            const options = selectBox.querySelectorAll('.option');

            let hidden = true;
            selectWrapper.addEventListener('click', () => {
                if (hidden){
                    optionsContainer.classList.add("options-shown");
                    dropdownIcon.src = "assets/icons/keyboard_arrow_up_20dp_000000_FILL0_wght400_GRAD0_opsz20.png"
                    hidden = false
                    return
                } 

                optionsContainer.classList.remove("options-shown");
                dropdownIcon.src = "assets/icons/keyboard_arrow_down_20dp_000000_FILL0_wght300_GRAD200_opsz20.png"
                hidden = true;
                
                
            });

            options.forEach(option => {
            option.addEventListener('click', () => {
                selected.innerText = option.dataset.bean.trim();
                selected.dataset.bean = option.dataset.bean.trim();
                product.bean = selected.dataset.bean;
                optionsContainer.classList.remove("options-shown");
                dropdownIcon.src = "assets/icons/keyboard_arrow_down_20dp_000000_FILL0_wght300_GRAD200_opsz20.png"
                hidden = true;
            });
            });
            
        }
    }


    if (product.category === "coffee"){
        const portionSelectors = document.querySelectorAll(".portion-size") || null;

        if(portionSelectors){
            const selected = document.querySelector("[data-tag=selected-portion]");
            product.portion = selected.dataset.portion;

            portionSelectors.forEach((portion) => {
            portion.addEventListener('click', (e) => 
                appendPortionSelectionEvent(e, portionSelectors, product)
            )
            });
        }

        const selectBox = document.querySelector('.custom-select') || null;

        if(selectBox){
            const selectWrapper = selectBox.querySelector(".selected-wrapper")
            const dropdownIcon = selectWrapper.querySelector(".dropdown-icon")
            const selected = selectWrapper.querySelector('.selected');
            const optionsContainer = selectBox.querySelector('.options');
            const options = selectBox.querySelectorAll('.option');

            let hidden = true;
            selectWrapper.addEventListener('click', () => {
                if (hidden){
                    optionsContainer.classList.add("options-shown");
                    dropdownIcon.src = "assets/icons/keyboard_arrow_up_20dp_000000_FILL0_wght400_GRAD0_opsz20.png"
                    hidden = false
                    return
                } 

                optionsContainer.classList.remove("options-shown");
                dropdownIcon.src = "assets/icons/keyboard_arrow_down_20dp_000000_FILL0_wght300_GRAD200_opsz20.png"
                hidden = true;
                
                
            });

            options.forEach(option => {
            option.addEventListener('click', () => {
                selected.innerText = option.dataset.temp.trim();
                selected.dataset.temp = option.dataset.temp.trim();
                optionsContainer.classList.remove("options-shown");
                dropdownIcon.src = "assets/icons/keyboard_arrow_down_20dp_000000_FILL0_wght300_GRAD200_opsz20.png"
                hidden = true;
            });
            });
            product.temp = selected.dataset.temp;
        }
        
    }

         

    
}
findProuct(productid);
console.log(product);