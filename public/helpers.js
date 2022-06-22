/**
 * NAME: Kyla Yu-Swanson
 * DATE: June 2022
 * 
 * Global helper functions used internally across the website.
 */

const DEBUG = true;

/**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} idName - element ID
 * @returns {object} DOM object associated with id (null if none).
 */
function id(idName) {
  return document.getElementById(idName);
}

/**
 * Returns the first element that matches the given CSS selector.
 * @param {string} selector - CSS query selector string.
 * @returns {object} first element matching the selector in the DOM tree (null if none)
 */
function qs(selector) {
  return document.querySelector(selector);
}

/**
 * Returns the array of elements that match the given CSS selector.
 * @param {string} selector - CSS query selector
 * @returns {object[]} array of DOM objects matching the query (empty if none).
 */
function qsa(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Returns a new element with the given tagname
 * @param {string} tagName - name of element to create and return
 * @returns {object} new DOM element with the given tagname
 */
function gen(tagName) {
  return document.createElement(tagName);
}

/**
 * Helper function to return the Response data if successful, otherwise
 * returns an Error that needs to be caught.
 * @param {object} response - response with status to check for success/error.
 * @returns {object} - The Response object if successful, otherwise an Error that
 * needs to be caught.
 */
function checkStatus(response) {
  if (!response.ok) { // response.status >= 200 && response.status < 300
    throw Error(`Error in request: ${response.statusText}`);
  } // else, we got a response back with a good status code (e.g. 200)
  return response; // A resolved Response object.
}

/**
 * This function removes all child nodes from a DOM parent node.
 * @param {DOMElement} parent - the parent node to remove all children from
 */
 function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/**
 * Displays an error message on the page using the message given to the Error.
 * @param {Error} - error object with error message.
 */
function handleError(err) {
  if (id('results')) {
    id('results').textContent = "Something went wrong on the server. Please try again later.";
  } else {
    console.log("Something went wrong on the server. Please try again later.");
  }
}

/**
 * Removes displayed error message from HTML page if a message exists.
 */
function clearErrorMessage() {
  if (id('results')) {
    id('results').textContent = "";
  }
}

/**
 * Fetches JSON data from the given URL using GET request.
 * @param {string} url - the URL to fetch
 * @returns {JSON} - the data obtained
 */
async function getJSONResponse(url) {
  try {
    let resp = await fetch(url);
    resp = checkStatus(resp);
    const data = await resp.json();
    return data;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Fetches text data from the given URL using GET request.
 * @param {string} url - the URL to fetch
 * @returns {string} - the data obtained
 */
async function getTextResponse(url) {
  try {
    let resp = await fetch(url);
    resp = checkStatus(resp);
    const data = await resp.text();
    return data;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Fetches a text response from the given URL and params using a POST request.
 * @param {string} url - the URL to fetch
 * @param {string} params - the body of the post request
 * @returns {string} - the text response
 */
async function postTextResponse(url, params) {
  try {
    let resp = await fetch(url, { method : "POST", body : params });
    resp = checkStatus(resp);
    let data = await resp.text();
    return data;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Capitalizes first letter of the given string
 * @param {string} s - string to capitalize
 * @returns the string with its first letter capitalized
 */
function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}
