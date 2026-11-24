
const products=[
{id:1,name:"Classic Jacket",price:2499},
{id:2,name:"Urban Sneakers",price:1999},
{id:3,name:"Classic Sunglasses",price:899},
{id:4,name:"Luxury Watch",price:3499}
];

let cart=[];

function add(id){
const product=products.find(p=>p.id===id);
const item=cart.find(p=>p.id===id);
if(item)item.quantity++;
else cart.push({...product,quantity:1});
update();
}

function change(id,value){
const item=cart.find(p=>p.id===id);
if(!item)return;
item.quantity+=value;
if(item.quantity<=0)cart=cart.filter(p=>p.id!==id);
update();
}

function remove(id){
cart=cart.filter(p=>p.id!==id);
update();
}

function update(){
const box=document.getElementById("cartItems");
let count=0,total=0;
box.innerHTML="";
if(cart.length===0)box.textContent="Your bag is empty.";

cart.forEach(item=>{
count+=item.quantity;
total+=item.price*item.quantity;
box.innerHTML+=`
<div class="cart-item">
<span>${item.name}</span>
<span>₹${(item.price*item.quantity).toLocaleString("en-IN")}</span>
<button onclick="change(${item.id},-1)">−</button>
<span>${item.quantity}</span>
<button onclick="change(${item.id},1)">+</button>
<button onclick="remove(${item.id})">Remove</button>
</div>`;
});

document.getElementById("count").textContent=count;
document.getElementById("total").textContent=total.toLocaleString("en-IN");
}

document.getElementById("search").addEventListener("input",function(){
const value=this.value.toLowerCase();
document.querySelectorAll(".product").forEach(card=>{
card.style.display=card.dataset.name.toLowerCase().includes(value)?"":"none";
});
});
