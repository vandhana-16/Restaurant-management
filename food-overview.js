import { foodMap as foodRelations} from "./dish-relations.js";
import { dishes } from "./dishes.js";
import { foodDescription as headerDescription } from "./dish-relations.js";
import { cartProducts } from "./dish-relations.js";

const header=document.querySelector("header");
const mainEl=document.querySelector("main");
const footerEl=document.querySelector("footer");

var lastScroll=0;
window.addEventListener('scroll',()=>{
    const curr=window.scrollY;
    if(curr<lastScroll){
        header.style=`top:0px;`;
    }else{
        header.style=`top:-30%`;
    }
    lastScroll=curr;
});


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

const foodsContainerEl=document.querySelector(".foods-overview-container");
var foodHtml='';
const foodName = new URLSearchParams(window.location.search).get("name");
const foodHeaderEl=document.querySelector(".food-header>h1");
const headerDescriptionEl=document.querySelector(".food-header>div");
const foodVarieties=foodRelations.get(foodName.toLocaleLowerCase());
var selectedDish;

// inserting food
foodVarieties.forEach((index)=>{
    var dish=dishes[index];
    foodHtml+=`
    <div class="foods-overview">
        <div class="food-order">
            <img src="${dish.img}" alt="picture">
        </div>
        <div class="food-details">
            <div class="food-name">
                ${dish.name}
            </div>
            <div class="price-ratings">
                <div class="ratings-container">
                <div class="rating-star">
                    <img src="images/symbol/rating-star.svg">
                </div> 
                <div class="ratings">${dish.rating}</div>
                </div>
                <div class="price">
                    <del>₹${dish.realPrice}</del>
                    <div>₹${dish.currPrice}</div>
                </div>
            </div>
            <div class="description">
                ${dish.description}
            </div>
        </div>
    </div>
    `;
});
foodHeaderEl.innerHTML=foodName;
foodsContainerEl.innerHTML=foodHtml;
headerDescriptionEl.innerHTML=headerDescription.get(foodName.toLowerCase());

const foodsEl=document.querySelectorAll(".foods-overview");
const foodDisplayEl=document.querySelector(".foods-orders-container");
const foodPrice=document.querySelector('.foods-orders-container .price');
const foodNameEl=document.querySelector('.foodName');
const foodImg=document.querySelector('.foods-orders-container>img');
const foodDescription=document.querySelector('.food-description');
const closeOrder=document.querySelector('.close-order');
const orderbtn=document.querySelector(".ordering");
const orderSuccess=document.querySelector(".ordered-successfull-container");
const totalOrderEl=orderSuccess.querySelector(".total-orders");
const overlayEl=document.querySelector(".overlay")

closeOrder.addEventListener("click",closeOrderFunc);

function closeOrderFunc(){
    foodDisplayEl.style=`
        left:-50vw;
    `;
    blurBackground();
}
function blurBackground(){
    overlayEl.classList.toggle("active");
}

overlayEl.addEventListener("click",()=>{
    closeOrderFunc();
});
foodsEl.forEach((food)=>{
    food.addEventListener("click",()=>{
        foodDisplayEl.style=`
            left:50vw;
        `;
        selectedDish={
            name:food.querySelector('.food-name').textContent.trim(),
            description:food.querySelector('.description').textContent.trim(),
            img:food.querySelector('img').src,
            realPrice:Number(food.querySelector('.price>del').textContent.substring(1)),
            currPrice:Number(food.querySelector(`.price>div`).textContent.substring(1)),
            rating:food.querySelector('.ratings-container>div:last-child').textContent.trim(),
            quantity:1
        };
        foodNameEl.innerHTML=selectedDish.name;
        foodPrice.innerHTML="₹"+selectedDish.currPrice;
        foodImg.src=selectedDish.img;
        foodDescription.innerHTML=selectedDish.description;
        blurBackground();
    });
});
orderbtn.addEventListener("click",()=>{
    closeOrderFunc();
    orderSuccess.style=`
        transform: translate(-50%,0%);
    `;
    var idx=cartProducts.findIndex(dish=>dish.name==selectedDish.name)
    if(idx!=-1){
        if(cartProducts[idx].quantity<10){
            console.log(cartProducts[idx]);
            cartProducts[idx].quantity++;
        }
    }else{
        cartProducts.push(selectedDish);
    }
    localStorage.setItem("cartProducts",JSON.stringify(cartProducts));
    totalOrderEl.innerHTML=`${cartProducts.length} item${cartProducts.length>1?"s":""} Added`;
    setTimeout(()=>{
        orderSuccess.style=`transform: translate(-50%,110%);`;
    },4500);
});


function shuffleArray(array) {
    function random(){
        return Math.random()-0.5;
    }
    array.sort(random);
    return array;
}
