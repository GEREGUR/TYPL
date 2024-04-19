const simulateClickById = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.click();
  } else {
    console.error(`Element with id '${id}' not found.`);
  }
};
export default simulateClickById;
