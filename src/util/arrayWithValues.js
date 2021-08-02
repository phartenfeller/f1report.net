function arrayWithValues(arr) {
  if (arr && Array.isArray(arr)) {
    return arr.length > 0;
  }
  return false;
}

export default arrayWithValues;
