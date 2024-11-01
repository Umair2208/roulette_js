const form1 = document.querySelector(".form1");
const bet = document.querySelector(".bet");
const betType = document.querySelector(".input1");

const red_numbers = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];

function isColor(number) {
  if (number === 0) {
    return "green";
  } else if (red_numbers.includes(number)) {
    return "red";
  } else {
    return "black";
  }
}

let balance = 100;
let p = document.createElement("p");
p.classList.add("pp1");
p.innerText = `Your Balance = ${balance}`;
form1.prepend(p);

let div1 = document.createElement("div");
let div2 = document.createElement("div");
div1.classList.add("div1", "mx-auto", "text-center");
div2.classList.add("div2");
div2.appendChild(div1);
form1.prepend(div2);

let p2 = document.createElement("p");
p2.innerText = "you lost";
p2.classList.add("pp2", "text-center");

let p3 = document.createElement("p");
p3.innerText = "you Won";
p3.classList.add("pp3", "text-center");

div2.prepend(p2);
div2.prepend(p3);

form1.addEventListener("submit", (e) => {
  e.preventDefault();

  const randNo = Math.floor(Math.random() * 36 + 1);
  console.log("Number:", randNo);

  const betting_amt = parseInt(bet.value);
  const theBet = betType.value.toLowerCase();
  const winningColor = isColor(randNo);

  div1.style.backgroundColor = `${winningColor}`;
  div2.style.display = "block";
  div1.innerText = randNo;

  if (
    betting_amt <= 0 ||
    !Number.isInteger(betting_amt) ||
    betting_amt > balance
  ) {
    return alert(
      "Enter an appropriate amount that is within your balance and greater than 0"
    );
  }
  p2.style.display = "none";
  p3.style.display = "none";

  let won = false;

  if (theBet === winningColor) {
    // Color bet
    console.log(`You won by betting on color: ${winningColor}`);
    won = true;
    p3.style.display = "block";
  } else if (theBet === "even" && randNo % 2 === 0) {
    console.log(`You won! ${randNo} is even`);
    balance += betting_amt * 2;
    won = true;
    p3.style.display = "block";
  } else if (theBet === "odd" && randNo % 2 !== 0) {
    // Odd number bet
    console.log(`You won! ${randNo} is odd`);
    balance += betting_amt * 2;
    won = true;
    p3.style.display = "block";
  } else if (!isNaN(parseInt(theBet)) && parseInt(theBet) === randNo) {
    console.log(
      `Congratulations! You won by betting on the exact number ${randNo}`
    );
    balance += betting_amt * 36;
    won = true;
    p3.style.display = "block";
  } else {
    balance -= betting_amt;
    p2.style.display = "block";
  }

  p.innerText = `Your Balance = ${balance}`;

  bet.value = "";
  betType.value = "";
  p2.innertext = " ";
});
