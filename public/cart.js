/**
 * NAME: Kyla Yu-Swanson
 * DATE: June 2022
 * 
 * This is a the JS file for managing fetches to the the Caltech Adoption API 
 * to populate the animals gallery and dynamically generate the view for each 
 * individual animal.
 */
 (function () {
  "use strict";

  const BASE_URL = "/";
  const CLEAR_CART_URL = BASE_URL + "cart/clear";
  const GET_CART_URL = BASE_URL + "cart"
  const GET_ANIMAL_BASE_URL = BASE_URL + "one-animal/";
  const BUY_URL = BASE_URL + "buy";
  const IMAGE_DIR = "stock-img/";
  const BUY_DELAY = 2000;
  let totalCost = 0;

  /**
   * Runs the needed functions for the website upon starting.
   */
  async function init() {
    await populateCart();
    qs("#buy-section > p").textContent = `\$${totalCost}`;
  }

  /**
   * Populates the page with the items in the cart.
   */
  async function populateCart() {
    let cartItems = await getJSONResponse(GET_CART_URL);
    for (let i = 0; i < cartItems.length; i++) {
      let data = new FormData();
      if (cartItems[i]) {
        let animal = await getJSONResponse(GET_ANIMAL_BASE_URL + cartItems[i]);
        genAnimalCard(animal);
        
        data.append("type", animal.type);
        data.append("name", animal.name);
      }
      qs("form").addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (totalCost !== 0 && qs("#buy-section > form > #agreement").checked) {
        fetch(BUY_URL, { method : "POST", body : data })
                .then(checkStatus)
                .then(resp => resp.text())
                .then(buyCallback)
                .catch(handleError);
        }
        else {
          id("results").textContent = "Please agree to the terms and/or add something to the cart.";
        }
      });
    }
  }

  /**
   * Generates an animal cart card and adds it to the card screen
   * @param {JSONObject} animal - animal to make cart card for
   */
  function genAnimalCard(animal) {
    let card = gen("figure");
    let img = gen("img");
    img.src = IMAGE_DIR + animal.image;
    img.alt = "picture of " + animal.name;

    let figcaption = gen("figcaption");
    let list = gen("ul");
    let point = gen("li");
    point.textContent = "Name: " + animal.name;
    list.appendChild(point);
    point = gen("li");
    point.textContent = "Cost: $" + animal.cost;
    totalCost += parseInt(animal.cost);
    list.appendChild(point);
    figcaption.appendChild(list);

    card.appendChild(img);
    card.appendChild(figcaption);
    id("items-section").appendChild(card);
  }

  /**
   * Updates the results box with the text response and clears the cart.
   * @param {string} textResponse - response to the buy POST request
   */
  function buyCallback(textResponse) {
    id("results").textContent = "Purchasing...";
    setTimeout(() => {
      id("results").textContent = textResponse;
      fetch(CLEAR_CART_URL, { method : "POST" })
                .then(checkStatus)
                .catch(handleError);
      removeAllChildNodes(id("items-section"));
      totalCost = 0;
      qs("#buy-section > p").textContent = `\$${totalCost}`;
    }, BUY_DELAY);
  }

  init();
})();
