const defaultTheme = () => {
   alert('switch to default theme');
   document.querySelector("body > div").className = "default";
};

const oceanTheme = () => {
   alert('switch to ocean theme');
   document.querySelector("body > div").className = "ocean";
};

const desertTheme = () => {
   alert('switch to desert theme');
   document.querySelector("body > div").className = "desert";
};


document.querySelector("a#default").onclick = defaultTheme;
document.querySelector("a#ocean").onclick = oceanTheme;
document.querySelector("a#desert").onclick = desertTheme;

