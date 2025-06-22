import { fetchData } from "./index.js";
import { ratingMap } from "./index.js";
import { displayErrorPopup } from "./index.js";

const params = new URLSearchParams(window.location.search);
const productid = params.get('id');
let product;



async function findProuct(productid){
    try{
        const fectcheddata = await fetchData();
        const productData = await fectcheddata.find(item => item.id === Number(productid));
        if (!productData){
            document.querySelector(".footer").style.display = "none";
            throw new Error ('Product not found');
        }

        const {id, name, category, price, rating, ratedNumber, images, briefDescription} = productData;

        product = {
            id, 
            name, 
            category, 
            price, 
            rating, 
            ratedNumber,
            images,
            briefDescription
        };
        console.log(productData);

        renderProducts(productData);
        product.quantity = 1;
    } catch (error){
        displayErrorPopup(error);
        document.getElementById("productContainer").innerHTML = error
    }

    
   
}

function renderProducts(productData){
    const {id, name, category, prediscountedPrice, price, promotion, rating, ratedNumber, images,  briefDescription, description, tasteNote, bagSize, features, productInfo} = productData

    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    const imagesContainer = images.map(image => `<img src="${image}" alt="" data-state="images">`);

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
                            <span style="margin-top: 5px;">Small (240 mL)</span>
                        </div>

                        <div class="portion-wrapper">
                            <img src="assets/icons/coffee-paper-cup_85002.png" alt="coffee-paper-cup" class="medium-cup portion-size" 
                            data-tag="portions" 
                            data-percentIncrease="0.2"
                            data-portion="medium">
                            <span style="margin-top: 5px;">Medium (355 mL)</span>
                        </div>
                            
                        <div class="portion-wrapper">
                            <img src="assets/icons/coffee-paper-cup_85002.png" alt="coffee-paper-cup" class="large-cup portion-size" 
                            data-tag="portions" 
                            data-percentIncrease="0.5"
                            data-portion="large">
                            <span style="margin-top: 5px;">Large (475 mL)</span>
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
                    <p>Whole bean or Ground: </p>
                    <div class="custom-select">
                        <div class="selected-wrapper">
                            <div class="selected" data-bean="Whole">Whole</div>
                            <img src="assets/icons/keyboard_arrow_down_20dp_000000_FILL0_wght300_GRAD200_opsz20.png" alt="drop down" class="dropdown-icon">
                        </div>
                        
                        <div class="options">
                            <div class="option" data-bean="Whole">Whole</div>
                            <div class="option" data-bean="Ground">Ground</div>
                        </div>
                </div>

                </div>` : "";

    const tasteNoteText = tasteNote ? `
    <div class="description-grid">
        <p>Taste Note:</p>
        <p>${tasteNote}</p>
    </div>`: "";

    const bagSizeText = bagSize ? `<p 
        style="
        padding: 10px 0px;"
    >Size: ${bagSize}</p>` : "";

    const featuresText = features ? `
    <div class="description-grid">
        <p>Features:</p>
        <p>${features}</p>
    </div>`: "";

    const productInfoText = productInfo ? `
        <div class="description-grid">
            <p>Product Information:</p>
            <p>${productInfo}</p>
        </div>
    `: "";

    productContainer.innerHTML = `
     <div class="product-left-container data-id=${id} data-name=${name}">
            <div class="item-images-container">
                <img src="${images[0]}" alt="" class="main-image" data-state="mainImage">
                <div class="images-wrapper">
                ${imagesContainer.join(" ")}
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
                ${featuresText}
                ${productInfoText}

                <div style="padding: 20px 0px;">
                Quantity: 
                <input type="number" id="quantity" min=1 value=1 style="width: 50px; font-size : 15px"/>
                </div>
                
                <div class="price-wrapper">
                    <p>Price: £</p>
                    <p data-price="${(price)}">£${(price / 100).toFixed(2)}</p>  
                    
                    ${discount}
                </div>

                <div class="product-rating-wrapper">
                    <p>Rating:</p>
                    <img src="${ratingMap[rating]}" alt="" class="product-rating">
                    <p class="product-rating-number">${ratedNumber} ratings</p>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                <button id="addToCart" class="add-to-cart-btn">
                    Add to cart
                </button>
                <img src="assets/icons/check.png" alt="check" class="check-icon">   
                </div>
        </div>
    `
    
    appendEventListeners(productData);
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

function appendPortionSelectionEvent(e, arr, productData){

    arr.forEach(item => 
        item.dataset.tag = "portions"
    )
    const priceSelector = document.querySelector("[data-price]");
    const price = productData.price;
    const percentIncrease = Number(e.target.dataset.percentincrease);
    const updatedPrice = Math.floor(Number(price + (price * percentIncrease)))
    e.target.dataset.tag = "selected-portion";
    priceSelector.dataset.price = updatedPrice;
    priceSelector.textContent = (updatedPrice / 100).toFixed(2);
    product.portion = e.target.dataset.portion;
    product.price = updatedPrice;
}

function appendEventListeners(productData){
    
    const imgaes = document.querySelectorAll("[data-state=images]")
    imgaes.forEach((image,index) => 
        {
            image.addEventListener('click', (e) => 
                
                appendImagesEvent(e))

        }
    );

    const quantityInput = document.getElementById("quantity");
    quantityInput.addEventListener("change", () => {
        product.quantity = Number(quantityInput.value);
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

            product.bean = selected.dataset.bean;
            
        }
    }


    if (product.category === "coffee"){
        const portionSelectors = document.querySelectorAll(".portion-size") || null;

        if(portionSelectors){
            const selected = document.querySelector("[data-tag=selected-portion]");
            product.portion = selected.dataset.portion;

            portionSelectors.forEach((portion) => {
            portion.addEventListener('click', (e) => 
                appendPortionSelectionEvent(e, portionSelectors, productData)
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
                product.temp = selected.dataset.temp;
                optionsContainer.classList.remove("options-shown");
                dropdownIcon.src = "assets/icons/keyboard_arrow_down_20dp_000000_FILL0_wght300_GRAD200_opsz20.png"
                hidden = true;
            });
            });
            product.temp = selected.dataset.temp;
        }
        
    }

    const addToCartBtn = document.getElementById("addToCart");

    addToCartBtn.addEventListener("click", () => {
        const checkIcon = document.querySelector(".check-icon");
        checkIcon.classList.add("checkIcon-spin");
        setTimeout(() => {
            checkIcon.classList.remove("checkIcon-spin");
        }, 2000)
        
        console.log(product)
    })

         

    
}
findProuct(productid);