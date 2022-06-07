/**
 * NAME: Kyla Yu-Swanson
 * DATE: June 2022
 * 
 * This is a the JS file for the contact page. It allows a user to send feedback.
 */
 (function () {
  "use strict";

  const BASE_URL = "/";

  /**
   * Runs the needed functions for the website upon starting.
   */
  function init() {
    qs("form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      id("results") = fetchTextResponse(BASE_URL + "feedback");
    });
  }

  init();
})();
