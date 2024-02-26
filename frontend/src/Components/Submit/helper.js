export function validNum(input, type) {
  if (type === "float") {
    if (parseFloat(input) || input.length === 0 || input.value === "0") {
      return true;
    } else {
      return false;
    }
  } else if (type === "int") {
    if (parseInt(input) || input.length === 0 || input.value === "0") {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
