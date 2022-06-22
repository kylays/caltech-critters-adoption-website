/**
 * NAME: Kyla Yu-Swanson
 * DATE: June 2022
 * 
 * This is a the JS file for the contact page. It allows an admin user to login 
 * and post a new animal for adoption.
 */
 (function () {
  "use strict";

  const BASE_URL = "/";
  const LOGIN_DELAY = 1000;
  const ADD_URL = BASE_URL + "admin/add";
  const LOGIN_URL = BASE_URL + "admin/login";

  /**
   * Runs the needed functions for the website upon starting.
   */
  function init() {
    id("login-form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      let data = new FormData(id("login-form"));
      fetch(LOGIN_URL, { method : "POST", body : data })
                                    .then(checkStatus)
                                    .then(resp => resp.text())
                                    .then(loginCallback)
                                    .catch(handleError);
    });
    id("add-form").addEventListener("submit", async (evt) => {
      evt.preventDefault();
      await addAnimal();
    });
  }

  /**
   * Updates the results displayed on the page with the given string and changes 
   * from the login screen to the add form screen after a delay if the login was 
   * successful.
   * @param {string} responseText - string to display as result
   */
  function loginCallback(responseText) {
    id("results").textContent = responseText;
    if (responseText === "Success, logging in...") {
      setTimeout(() => {
        id("login-view").classList.add("hidden");
        id("add-view").classList.remove("hidden");
        id("results").textContent = "";
      }, LOGIN_DELAY);
    }
  }

  /**
   * Submits the post request to add a new animal to the API.
   */
  async function addAnimal() {
    let params = new FormData(id("add-form"));
    let file = params.get("image");
    let imageName = `${params.get("name")}.jpg`;
    if (file.type === "image/png") {
      imagePath = `${params.get("name")}.png`;
    }
    params.append("imageName", imageName);
    let uploadParams = new FormData();
    // The following code to change the name of the file is inspired by 
    // https://stackoverflow.com/questions/30733904/renaming-a-file-object-in-javascript
    let blob = file.slice(0, file.size, file.type); 
    let newFile = new File([blob], imageName, {type: file.type}); 
    uploadParams.append("image", newFile);    
    params.delete("image");

    let responseText = await postTextResponse(ADD_URL, params);
    responseText = responseText + " " + await postTextResponse(BASE_URL + "stock-img/upload", uploadParams);
    id("results").textContent = responseText;
  }

  init();
})();
