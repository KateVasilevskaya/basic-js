const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  let transformArr = [];

  arr.forEach((elem, index, arr) => {
    if (elem === "--double-next") {
      if (arr[index + 1]) {
        transformArr[index] = arr[index + 1];
      }
      return;
    } else if (elem === "--double-prev") {
      if (arr[index - 1]) {
        transformArr[index] = arr[index - 1];
      }
      return;
    } else if (elem === "--discard-next") {
      arr[index + 1] = null;
      return;
    } else if (elem === "--discard-prev") {
      if (arr[index - 1]) {
        transformArr.splice(index - 1, 1);
      }
      return;
    }

    if (arr[index]) {
      transformArr = [...transformArr, arr[index]];
    }
  });

  return transformArr;
}

module.exports = {
  transform,
};

transform([1, 2, 3, "--double-next", 1337, "--double-prev", 4, 5]);
