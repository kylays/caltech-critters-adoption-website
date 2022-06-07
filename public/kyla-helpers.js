/**
 * NAME: Kyla Yu-Swanson
 * DATE: June 2022
 * 
 * This is a the JS file with some more helpers that are used across the website.
 */

const DEBUG = true;

/**
 * Runs the needed functions for the website upon starting.
 */
function init() {
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
    id('result').textContent = "Something went wrong on the server. Please try again later.";
}

/**
 * Fetches JSON data from the given URL.
 * @param {string} url - the URL to fetch
 * @returns {JSON} - the data obtained
 */
async function fetchJSONResponse(url) {
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
 * Fetches text data from the given URL.
 * @param {string} url - the URL to fetch
 * @returns {string} - the data obtained
 */
async function fetchTextResponse(url) {
  try {
    let resp = await fetch(url);
    resp = checkStatus(resp);
    const data = await resp.text();
    return data;
  } catch (err) {
    handleError(err);
  }
}
