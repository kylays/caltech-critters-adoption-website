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

  /**
   * Runs the needed functions for the website upon starting.
   */
  async function init() {
    await populateCart();
    qs("form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      let data = new FormData();
      // TODO populate the FormData
      fetch(BASE_URL + "buy", { method : "POST", body : data })
                                    .then(checkStatus)
                                    .then(resp => resp.text())
                                    .then(buyCallback)
                                    .catch(handleError);
    });
  }

  async function populateCart() {}

  function buyCallback() {}

  init();
})();
