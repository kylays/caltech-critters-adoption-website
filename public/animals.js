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
    await getJSONResponse(BASE_URL + "images");
    populateFilterMenu();
    populateGallery();
    id("search").addEventListener("click", populateGallery);
    qs("#single-view > button").addEventListener("click", () => {
      id("gallery-view").classList.remove("hidden");
      id("single-view").classList.add("hidden");
    });
  }

  async function populateFilterMenu() {
    let menu = id("menu");
    let types = await getJSONResponse(BASE_URL + "categories");
    for (let i = 0; i < types.length; i++) {
      let option = gen("option");
      option.value = types[i];
      option.textContent = capitalize(types[i]);
      menu.appendChild(option);
    }
  }

  async function populateGallery() {
    removeAllChildNodes(qs("#gallery-view > section"));
    let filter = id("menu").value;
    let animals = [];
    if (filter === "all") {
      animals = await getJSONResponse(BASE_URL + "all-animals");
    }
    else {
      animals = await getJSONResponse(BASE_URL + "animals/" + filter);
    }
    for (let i = 0; i < animals.length; i++) {
      let animal = animals[i];
      let button = gen("button");
      let figure = gen("figure");
      let img = gen("img");
      img.src = IMAGE_DIR + animal.image;
      img.alt = "picture of " + animal.type + " named " + animal.name; 
      let figcaption = gen("figcaption");
      figcaption.textContent = animal.name;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      button.appendChild(figure);
      button.classList.add("view-animal");
      button.addEventListener("click", () => {
        viewAnimal(animal.type, animal.name);
      });
      qs("#gallery-view > section").appendChild(button);
    }
  }

  async function viewAnimal(type, name) {
    id("gallery-view").classList.add("hidden");
    id("single-view").classList.remove("hidden");
    let animal = await getJSONResponse(BASE_URL + "one-animal/" + type + "/" + name);
    qs("#overview > h2").textContent = animal.name;
    qs("#overview > img").src = IMAGE_DIR + animal.image;
    qs("#overview > img").alt = "picture of " + animal.type + " named " + animal.name; 
    let facts = qsa("#overview > article > ul > li"); 
    console.log(facts);
    facts[0].textContent = "Name: " + animal.name;
    facts[1].textContent = "Species: " + animal.type;
    facts[2].textContent = "Age: " + animal.age;
    facts[3].textContent = "Gender: " + animal.gender;
    facts[4].textContent = "Adoption Price: $" + animal.cost;
    qs("#about > h3").textContent = "About " + animal.name;
    qs("#about > p").textContent = animal.description;
  }

  init();
})();
