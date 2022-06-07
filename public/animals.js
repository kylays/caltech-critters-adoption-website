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

  /**
   * Runs the needed functions for the website upon starting.
   */
  async function init() {
    await fetchJSONResponse(BASE_URL + "/images");
    populateGallery();
  }

  async function populateGallery() {
  }

  init();
})();
