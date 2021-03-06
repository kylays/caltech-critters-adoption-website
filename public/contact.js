/**
 * NAME: Kyla Yu-Swanson
 * DATE: June 2022
 * 
 * This is a the JS file for the contact page. It allows a user to send feedback.
 */
 (function () {
  "use strict";

  const BASE_URL = "/";
  const FEEDBACK_URL = BASE_URL + "feedback";

  /**
   * Runs the needed functions for the website upon starting.
   */
  function init() {
    qs("form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      let data = new FormData(qs("form"));
      if (!data.get("name") || !data.get("email") || !data.get("feedback")) {
        id("results").textContent = "Please enter something for all fields.";
      } else {
        fetch(FEEDBACK_URL, { method : "POST", body : data})
          .then(checkStatus)
          .then(resp => resp.text())
          .then(updateResults)
          .catch(handleError);
      }
    });
  }

  /**
   * Updates the results displayed on the page with the given string.
   * @param {string} responseText - string to display as result
   */
  function updateResults(responseText) {
    id("results").textContent = responseText;
  }

  init();
})();
