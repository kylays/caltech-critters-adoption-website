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
  const IMAGE_DIR = "stock-img/";
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
    let cartItems = await getJSONResponse(BASE_URL + "cart");
    for (let i = 0; i < cartItems.length; i++) {
      let data = new FormData();
      if (cartItems[i]) {
        let animal = await getJSONResponse(BASE_URL + "one-animal/" + cartItems[i]);
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
        
        data.append("type", animal.type);
        data.append("name", animal.name);
      }
      qs("form").addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (totalCost !== 0 && qs("#buy-section > form > #agreement").checked) {
        fetch(BASE_URL + "buy", { method : "POST", body : data })
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
   * Updates the results box with the text response.
   * @param {string} textResponse - response to the buy POST request
   */
  function buyCallback(textResponse) {
    id("results").textContent = textResponse;
    fetch(BASE_URL + "cart/clear", { method : "POST" })
              .then(checkStatus)
              .catch(handleError);
    removeAllChildNodes(id("items-section"));
    totalCost = 0;
    qs("#buy-section > p").textContent = `\$${totalCost}`;
  }

  init();
})();
