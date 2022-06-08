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

  /**
   * Dynamically fills in the filter menu with the species available for adoption.
   */
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

  /**
   * Dynamically fills in the gallery of animals available for adoption using the selected filter.
   */
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
      genAnimalCard(animals[i]);
    }
  }

  /**
   * Generates an animal card as a preview of the animal and adds it to the store page.
   * @param {JSONObject} animal - the animal used to make the card
   */
  function genAnimalCard(animal) {
    let button = gen("button");
      let figure = gen("figure");
      let img = gen("img");
      img.src = IMAGE_DIR + animal.image;
      img.alt = "picture of " + animal.type + " named " + animal.name; 
      let figcaption = gen("figcaption");
      figcaption.textContent = animal.name;
      console.log(animal);
      if (animal.available === "no") {
        figcaption.textContent = animal.name + " (SOLD)";
      }
      figure.appendChild(img);
      figure.appendChild(figcaption);
      button.appendChild(figure);
      button.classList.add("view-animal");
      button.addEventListener("click", () => {
        viewAnimal(animal.type, animal.name);
      });
      qs("#gallery-view > section").appendChild(button);
  }

  /**
   * Displays the single view of a selected animal.
   * @param {string} type - type/species of the animal selected
   * @param {string} name - name of the animal selected 
   */
  async function viewAnimal(type, name) {
    id("gallery-view").classList.add("hidden");
    id("single-view").classList.remove("hidden");
    let animal = await getJSONResponse(BASE_URL + "one-animal/" + type + "/" + name);
    qs("#overview > h2").textContent = animal.name;
    qs("#overview > img").src = IMAGE_DIR + animal.image;
    qs("#overview > img").alt = "picture of " + animal.type + " named " + animal.name; 
    let facts = qsa("#overview > article > ul > li"); 
    facts[0].textContent = "Name: " + animal.name;
    facts[1].textContent = "Species: " + animal.type;
    facts[2].textContent = "Age: " + animal.age;
    facts[3].textContent = "Gender: " + animal.gender;
    facts[4].textContent = "Adoption Price: $" + animal.cost;
    facts[5].textContent = "Available: " + animal.available;
    qs("#about > h3").textContent = "About " + animal.name;
    qs("#about > p").textContent = animal.description;
    addCartAddListener(animal);
  }

  /**
   * Adds an event listener to the adopt button for an animal if available, 
   * otherwise disables the button.
   * @param {JSONObject} animal - animal to add an event listener to 
   */
  function addCardAddListener(animal) {
    if (animal.available === "yes") {
      let oldBtn = qs("#overview > article > button");
      console.log(animal);
      let newBtn = oldBtn.cloneNode(false);
      oldBtn.parentNode.replaceChild(newBtn, oldBtn);
      newBtn.disabled = false;
      newBtn.addEventListener("click", () => {
        let data = new FormData();
        data.append("type", animal.type);
        data.append("name", animal.name);
        fetch(BASE_URL + "cart/add", { method : "POST", body : data })
                                      .then(checkStatus)
                                      .then(resp => resp.text())
                                      .catch(handleError);
      });
    } else {
      qs("#overview > article > button").disabled = true;
    }
  }

  init();
})();
