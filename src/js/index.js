const values = {
  green: "Green",
  yellow: "Yellow",
  red: "Red"
};

const getColourNames = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(values), 2000);
  });

getColourNames().then(result => {
  Object.keys(result).forEach(i => {
    console.log(i);
    document.querySelector(`.${i}`).innerHTML = `<span>${result[i]}</span>`;
  });
});
