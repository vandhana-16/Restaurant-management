import { cartProducts } from "../dish-relations.js";

const ordersContainerEl=document.querySelector(".order-container");
const noOrderEl=document.querySelector(".no-order");

// Price Details
const totalItemsEl=document.querySelector(".total-items");
const totalRealPriceEl=document.querySelector(".total-real-price");
const totalDiscountPriceEl=document.querySelector(".discount");
const totalAmountEl=document.querySelector(".amount");
var totalRealPrice=Number(0),totalDiscountPrice=Number(0);

let foodOverviewHtml=``;

cartProducts.forEach((dish)=>{
    totalRealPrice+=Number((dish.realPrice)*dish.quantity);
    totalDiscountPrice+=Number((dish.realPrice-dish.currPrice)*dish.quantity);
    foodOverviewHtml+=`
        <div class="dishes-overview">
            <div class="dish-img">
                <img src="${dish.img}" alt="${dish.name}">
            </div>
            <div class="food-details">
                <div class="name-price-details">
                    <div class="food-name">${dish.name}</div>
                    <div class="price-container">
                        <del class="real-price">₹${dish.realPrice}</del>
                        <div class="curr-price">₹${dish.currPrice}</div>
                        <div class="offer-percent">%${Math.ceil(100-(dish.currPrice/dish.realPrice)*100)} off</div>
                    </div>
                </div>
                <div class="updater-container">
                    <div class="update">
                        <div class="minus ${dish.quantity==1?"blur":""}"><i class="fa-solid fa-minus"></i></div>
                        <div class="quantity">${dish.quantity}</div>
                        <div class="plus ${dish.quantity==10?"blur":""}"><i class="fa-solid fa-plus"></i></div>
                    </div>
                    <div class="remove">
                        Remove
                    </div>
                </div>
            </div>
        </div>
    `;   
});

const foodsContainerEl=document.querySelector(".dishes-container");
foodsContainerEl.innerHTML=foodOverviewHtml;

const foodsEl=document.querySelectorAll(".dishes-overview");
const removeEl=document.querySelectorAll(".remove");
const dishNameEl=document.querySelectorAll(".food-name");
const dishImgEl=document.querySelectorAll(".dish-img>img");
var orderCount=foodsEl.length;
const removeItemContainerEl=document.querySelector(".remove-item-container");
const removeItemEl=document.querySelector(".remove-item");
const cancelEl=document.querySelector(".cancel");
var removeItemIdx;
const overlayEl=document.querySelector(".overlay");
const plusEl=document.querySelectorAll(".plus");
const minusEl=document.querySelectorAll(".minus");
const quantityEl=document.querySelectorAll(".quantity");

removeEl.forEach((element,index)=>{
    element.addEventListener("click",()=>{
        removeItemIdx=index;
        removeItemContainer();
    });
});

removeItemEl.addEventListener("click",removeItem);
cancelEl.addEventListener("click",removeItemContainer);
function blurBackground(){
    overlayEl.classList.toggle("active");
}

function removeItemContainer(){
    removeItemContainerEl.classList.toggle("active");
    blurBackground();
}

function removeItem(){
    const name=foodsEl[removeItemIdx].querySelector(".food-name").textContent;
    foodsContainerEl.removeChild(foodsEl[removeItemIdx]);
    var idx=findIndex(name);
    totalDiscountPrice-=Number((cartProducts[idx].realPrice-cartProducts[idx].currPrice)*cartProducts[idx].quantity);
    totalRealPrice-=Number((cartProducts[idx].realPrice)*cartProducts[idx].quantity);
    cartProducts.splice(idx,1);
    localStorage.setItem("cartProducts",JSON.stringify(cartProducts));
    removeItemContainer();
    orderCount--;
    totalOrder();
    displayPriceDetails();
}
function findIndex(name){
    return cartProducts.findIndex(dish=> dish.name==name);
}

totalOrder();
function totalOrder(){
    if(orderCount==0){
        ordersContainerEl.style.display=`none`;
        noOrderEl.style=`
        display: flex;
        flex-direction: column;
        `;
    }
}

plusEl.forEach((plus,index)=>{
    plus.addEventListener("click",()=>{
        var idx=findIndex(foodsEl[index].querySelector(".food-name").textContent);
        var quantity=cartProducts[idx].quantity;
        if(quantity<10){
            totalRealPrice+=cartProducts[idx].realPrice;
            totalDiscountPrice+=(cartProducts[idx].realPrice-cartProducts[idx].currPrice);            
            quantityEl[index].innerHTML=quantity+1;
            cartProducts[idx].quantity++;
            minusEl[index].classList.remove("blur");
            displayPriceDetails();
        }
        if(quantity==9){
            plus.classList.add("blur");
        }
        localStorage.setItem("cartProducts",JSON.stringify(cartProducts));
    });
});

minusEl.forEach((minus,index)=>{
    minus.addEventListener("click",()=>{
        var idx=findIndex(foodsEl[index].querySelector(".food-name").textContent);
        var quantity=cartProducts[idx].quantity;
        if(quantity>1){
            totalRealPrice-=cartProducts[idx].realPrice;
            totalDiscountPrice-=(cartProducts[idx].realPrice-cartProducts[idx].currPrice);
            cartProducts[idx].quantity--;
            plusEl[index].classList.remove("blur");
            quantityEl[index].innerHTML=quantity-1;
            displayPriceDetails();
        }
        if(quantity==2){
            minus.classList.add("blur");
        }
        localStorage.setItem("cartProducts",JSON.stringify(cartProducts));
    });
});

function displayPriceDetails(){
    totalRealPriceEl.innerHTML=`₹${totalRealPrice}`;
    totalDiscountPriceEl.innerHTML=`₹${totalDiscountPrice}`;
    totalItemsEl.innerHTML=cartProducts.length;
    totalAmountEl.innerHTML=`₹${totalRealPrice-totalDiscountPrice}`;
}

displayPriceDetails();


// mobile view 
const moreOptHeaderEl=document.getElementById('more-opt');
const moreOptions=document.querySelector(".more-options-details");
const morOpt=document.querySelector(".more-options-container");
const closeMoreOpt=document.querySelector(".fa-xmark");

moreOptions.addEventListener("click",()=>hideMoreOptions());
closeMoreOpt.addEventListener("click",()=>hideMoreOptions());
moreOptHeaderEl.addEventListener("click",()=>showMoreOptions());

function showMoreOptions(){// To show Mobile View Options
    morOpt.style=`transform:translateX(0%)`;
}
function hideMoreOptions(){// to hide Mobile view Options
    morOpt.style=`transform:translateX(-100%)`;
}

const foodsOrderContainerEl=document.querySelector(".foods-orders-container");
const overlayEl2=document.querySelector(".overlay2");
const closeOrderEl=foodsOrderContainerEl.querySelector(".close-order");

dishImgEl.forEach((dish,index)=>{
    dish.addEventListener("click",()=>{
        const name=dishNameEl[index].textContent.trim();
        displayDish(name);
    });
});
dishNameEl.forEach((dish)=>{
    dish.addEventListener("click",()=>{
        const name=dish.textContent.trim();
        displayDish(name);
    });
});

function displayDish(name){
    const nameEl=foodsOrderContainerEl.querySelector(".foodName");
    const priceEl=foodsOrderContainerEl.querySelector(".price");
    const descriptionEl=foodsOrderContainerEl.querySelector(".food-description");
    const imgEl=foodsOrderContainerEl.querySelector(".foods-orders-container>.order-dish-img");
    var dish=cartProducts[findIndex(name)];
    console.log(dish);
    nameEl.innerHTML=dish.name;
    priceEl.innerHTML=`₹${dish.currPrice}`;
    descriptionEl.innerHTML=dish.description;
    imgEl.src=dish.img;
    foodsOrderContainerEl.style=`left:50vw`;
    overlayEl2.classList.add("active")
}

function hideFoodDetails(){
    overlayEl2.classList.remove("active");
    foodsOrderContainerEl.style=`left:-50vw`;
}

closeOrderEl.addEventListener("click",hideFoodDetails)
overlayEl2.addEventListener("click",hideFoodDetails);

// payment 

const paymentSuccessEl=document.querySelector(".payment-success-container");
const paymentGoBackEl=document.querySelector(".go-back");
const placeOrderEl=document.querySelector(".buy-now");

placeOrderEl.addEventListener("click",()=>{
    paymentSuccessEl.classList.add("payment-done");
    overlayEl.classList.add("active");
});

paymentGoBackEl.addEventListener("click",()=>{
    paymentSuccessEl.classList.remove("payment-done");
    overlayEl.classList.remove("active");
    cartProducts.splice(0,cartProducts.length);
    localStorage.setItem("cartProducts",JSON.stringify(cartProducts));
    orderCount=0;
    totalOrder();
});