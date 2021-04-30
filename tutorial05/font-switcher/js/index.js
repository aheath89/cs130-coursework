const makeBigger = () => {
   alert('make bigger!');
   var curr = document.querySelector("div.content").style.fontSize;
   if (!curr) {
      document.querySelector("div.content").style.fontSize = "1.5em";
   }
   else {
      document.querySelector("div.content").style.fontSize = parseFloat(curr) + .1 + "em";
   }
};

const makeSmaller = () => {
   alert('make smaller!');
   var curr = document.querySelector("div.content").style.fontSize;
   if (!curr) {
      document.querySelector("div.content").style.fontSize = "1.3em";
   }
   else {
      document.querySelector("div.content").style.fontSize = parseFloat(curr) - .1 + "em";
   }
};


document.querySelector('a.a1').onclick = makeBigger;
document.querySelector('a.a2').onclick = makeSmaller;

