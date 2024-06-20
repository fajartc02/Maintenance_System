function isNotEmpty(input) {
  console.log(input);
  if (input == "" || input == "null" || input == -1) {
    return false;
  } else {
    return true;
  }
}

module.exports = isNotEmpty;
