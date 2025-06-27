const cart = JSON.parse(localStorage.getItem("cartData")) || [];

const cartFuncs = {
    subtotal: function(){
        const subTotal = cart.reduce((acc, item) => acc + item.total, 0);
        return subTotal;
    },
    saleTax: function(){
        const subTotal = this.subtotal();
        const saleTax = subTotal * 0.2;
        return saleTax;
    },

    grandTotal: function(){
        const subTotal = this.subtotal();
        const saleTax = this.saleTax();
        const grandTotal = subTotal + saleTax;
        return grandTotal;
    }
    
};




function renderCartList(){
    const cartList = document.querySelector("[data-cartList]");
    const template = document.querySelector("[data-cartTemplate]");

    cartList.innerHTML = "";
    if (cart.length === 0){
        return;
    }

    cart.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("[data-cartImg]").src = item.image;
        clone.querySelector("[data-cartImg]").alt = item.image;
        clone.querySelector("[data-name]").textContent = `${item?.temp || ""} ${item?.portion || ""} ${item.name} `;
        clone.querySelector("[data-brief]").textContent = item.briefDescription;
        clone.querySelector("[data-brief]").href = `product.html?id=${item.id}`;
        clone.querySelector("[data-price]").textContent = `${(item.price / 100).toFixed(2)}`;
        clone.querySelector("[data-quantity]").value = item.quantity;
        clone.querySelector("[data-total]").textContent = `${(item.total / 100).toFixed(2)}`;
        cartList.appendChild(clone);
    });
};

function saveCart(){
    localStorage.setItem("cartData", JSON.stringify(cart));
}

function deleteItem(index){
    cart.splice(index, 1);  
    updateUI();
    
}

function updateUI(){
    const cartTitle = document.querySelector("[data-cartTitle]");
    const cartColums = document.querySelector("[data-cartColums]");
    const totalBox = document.querySelector("[data-totalBox]");
    const subtotal = totalBox.querySelector("[data-subtotal]");
    const saleTax = totalBox.querySelector("[data-saleTax]");
    const grandTotal = totalBox.querySelector("[data-grandTotal]");

    cartTitle.textContent = `Your cart has ${cart.length} items`;
    
    if (cart.length === 0){
        cartTitle.textContent = "Your cart is empty";
        totalBox.style.display = "none";
        cartColums.style.display = "none";
    }

    

    subtotal.textContent = (cartFuncs.subtotal() / 100).toFixed(2);
    saleTax.textContent = (cartFuncs.saleTax() / 100).toFixed(2);
    grandTotal.textContent = (cartFuncs.grandTotal() / 100).toFixed(2);

    saveCart();
    renderCartList();
    addRemoveItemListener();
}

window.addEventListener("load", () => {
    updateUI();
    renderCartList();
    addRemoveItemListener()

});

function addRemoveItemListener(){
    const cartList = document.querySelector("[data-cartList]");
    const removeItem = cartList.querySelectorAll("[data-removeItem]");
    removeItem.forEach((btn, index )=> {
        btn.addEventListener("click", () => {
            deleteItem(index);
        })  
    })
}



console.log(cart)