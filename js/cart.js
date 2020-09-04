/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
  var cartCounter = document.getElementById('itemCount');
  cartCounter.textContent = `${cart.items.length}`;
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  document.getElementById('cart').children[1].innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var tBodyEl = document.getElementById('cart').children[1];

  
  // TODO: Iterate over the items in the cart
  for (var i in cart.items){
    var trEl = document.createElement('tr');
    tBodyEl.appendChild(trEl);
    var tdRemove = document.createElement('td');
    tdRemove.textContent = 'X';
    trEl.appendChild(tdRemove);
    var tdQuantity = document.createElement('td');
    tdQuantity.textContent = cart.items[i].quantity;
    trEl.appendChild(tdQuantity);
    var tdProduct = document.createElement('td');
    tdProduct.textContent = cart.items[i].product;
    trEl.appendChild(tdProduct);
  }
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(event) {

  for (var i = 0; i <cart.items.length; i++){
    var removeMe = event.target.parentNode.lastChild.innerHTML;
    if (removeMe === cart.items[i].product){
      cart.items.splice(i, 1); //splice(index location, number of items to remove counting up)
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart.items));
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  renderCart();
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}
var mainEl = document.getElementsByTagName('main')[0];
function makeButton(){
  // console.log(mainEl);
  var buttonEl = document.createElement('div');
  buttonEl.id = 'submitButton';
  buttonEl.textContent = 'Place Order';
  mainEl.append(buttonEl);
}
makeButton();
function orderHandler(event){

  localStorage.removeItem('cart');
  var confirm = document.createElement('section');
  confirm.id = "confirm";
  confirm.textContent = 'Order Confirmed';
  mainEl.append(confirm);
  submitButton.removeEventListener('click', orderHandler);
}

var submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', orderHandler);

// This will initialize the page and draw the cart on screen
renderCart();
