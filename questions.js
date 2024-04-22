/**
 * @file questions.js
 * @description This file contains programming exercises for Week 6 of the
 *              Mobile Application Development course. It includes a series of
 *              JavaScript challenges that focus regular expression and fetch API.
 *
 *              Students are expected to write their code solutions within this
 *              file in the designated sections for each exercise. The provided
 *              exercises are designed to enhance understanding of basic JavaScript
 *              syntax and problem-solving skills within the context of web and
 *              mobile app development.
 *
 * @author Larry Wen
 * @created [27/04/2024]
 *
 * INSTRUCTIONS:
 * - Follow the prompts for each exercise and write your code in the specified
 *   areas.
 * - Run the provided tests after completing the exercises to check your work.
 * - Do not modify the structure of the file or the provided code snippets.
 * - Seek assistance if you encounter difficulty understanding the exercises or
 *   implementing the solutions.
 */

// Question 1: Using Regular Expression Function: `.test()`
// Implement the following functions that utilize regular expressions:
// 1. containDigit - Check if the input string contains at least one digit.
// 2. containCapital - Check if the input string contains at least one uppercase letter.
// 3. validPlate - Check if the input string is a valid license plate with the format: Three uppercase letters followed by three digits.

function containDigit(str) {
  return /\d+/.test(str);
}

function containCapital(str) {
  return /[A-Z]+/.test(str);
}

function validPlate(str) {
  return /^[A-Z]{3}\d{3}$/.test(str);
}

// Question 2 Using Regular Expression Function `.match()`
// 1. findWordsWithVowels: Return all words containing vowels from a given string.
// 2. findWordsEndingWithDigit: Return all words that end with a digit.
// 3. findWordsWithPattern: Return words that start with [b, k, d, l] and end with 'e'
// [note]: All these questions are case-insensitive, and the returned words should be
// in lowercase. For instance, both "My" and "my" should return "my"
function findWordsWithVowels(str) {
  return str.toLowerCase().match(/[a-z]*[aeiuo][a-z]*/gi) || [];
}
function findWordsEndingWithDigit(str) {
  return str.match(/[a-z]*\d+/gi) || [];
}
function findWordsWithPattern(str) {
  return str.match(/\b[bkdl][a-z]*e/gi) || [];
}

// Question 3: Format an array of product strings into an array of objects with 'id' and 'title' properties.
// The 'id' should be a camel-cased, lowercase version of the product name with special characters removed.
// The 'title' should capitalize each word for display, making it human-readable.
// Usage of Array's map function and the replace method with regular expressions is mandatory.
// Example:
// Input: ['shoes', "women's cloth"]
// Output: [
//    { id: 'shoes', title: 'Shoes' },
//    { id: 'womensCloth', title: "Women's Cloth" }
// ]

//? function formatProductNames(products) {
//*   return products.map((product) => ({
//*     id: product
//*       .replace(/[^a-z ]/gi, "")
//*       .split(" ")
//*       .map((word, index) =>
//*         index === 0
//*           ? word.toLowerCase()
//*           : word[0].toUpperCase() + word.slice(1).toLowerCase()
//*       )
//*       .join(""),
//*     title: product.replace(/(^[a-z])| [a-z]/g, (word) =>
//*       word[0] === " " ? ` ${word[1].toUpperCase()}` : `${word[0].toUpperCase()}`
//*     ),
//*   }));
//* }

function formatProductNames(products) {
  return products.map((product) => {
    let newProduct = product.replace(/[^a-z ]/gi, "");
    let newID = newProduct
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word[0].toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
    let newTitle = product.replace(/(^[a-z]| [a-z])/g, (word) =>
      word[0] === " " ? ` ${word[1].toUpperCase()}` : `${word[0].toUpperCase()}`
    );
    return { id: newID, title: newTitle };
  });
}
// Question 4: Write an asynchronous function `getCategories` that retrieves a list of categories from the Fake Store API.
// The function should make a network request to 'https://fakestoreapi.com/products/categories' and return an array of category strings provided by the API.
// This function should use async/await for handling asynchronous operations.
// Note: you can find the api documents at: https://fakestoreapi.com/docs
async function getCategories() {
  return (await fetch("https://fakestoreapi.com/products/categories")).json();
}

// Question 5: Write an asynchronous function `getGoodProducts` that retrieves products from a specified category with a rating equal to or higher than a given minimum.
// This function should take two parameters: `category` (a string) and `minRate` (a number).
// Make a network request to 'https://fakestoreapi.com/products/' and filter the results to include only those products that match the category and have a rating greater or equal to `minRate`.
// The function should return an array of objects, each containing 'id', 'rate', 'title', and 'price' of the product.
// You should use high order array function map and filter.
// Note: you can find the api documents at: https://fakestoreapi.com/docs
async function getGoodProducts(category, minRate) {
  const data = await (await fetch("https://fakestoreapi.com/products/")).json();
  return data
    .filter(
      (product) =>
        product.category === category && product.rating.rate >= minRate
    )
    .map((product) => ({
      id: product.id,
      rate: product.rating.rate,
      title: product.title,
      price: product.price,
    }));
}

module.exports = {
  containDigit,
  containCapital,
  validPlate,
  findWordsWithVowels,
  findWordsEndingWithDigit,
  findWordsWithPattern,
  formatProductNames,
  getCategories,
  getGoodProducts,
};
