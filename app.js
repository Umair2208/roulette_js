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

form1.addEventListener("submit", (e) => {
  e.preventDefault();

  const randNo = Math.floor(Math.random() * 36 + 1);
  console.log("Number:", randNo);

  const betting_amt = parseInt(bet.value);
  const theBet = betType.value.toLowerCase(); // convert to lowercase for consistency
  const winningColor = isColor(randNo);

  // Validate betting amount
  if (
    betting_amt <= 0 ||
    !Number.isInteger(betting_amt) ||
    betting_amt > balance
  ) {
    return alert(
      "Enter an appropriate amount that is within your balance and greater than 0"
    );
  }

  let won = false;

  // Check color bet
  if (theBet === winningColor) {
    console.log(`You won by betting on color: ${winningColor}`);
    balance += betting_amt * 2;
    won = true;
  } else {
    console.log(
      `You lost the color bet. The winning color was ${winningColor}`
    );
    balance -= betting_amt;
  }

  // Check even/odd bet
  if (theBet === "even" && randNo % 2 === 0) {
    console.log(`You won! ${randNo} is even`);
    balance += betting_amt * 2;
    won = true;
  } else if (theBet === "odd" && randNo % 2 !== 0) {
    console.log(`You won! ${randNo} is odd`);
    balance += betting_amt * 2;
    won = true;
  } else if (theBet === "even" || theBet === "odd") {
    console.log(`You lost the even/odd bet. The winning number was ${randNo}`);
    balance -= betting_amt;
  }

  // Check specific number bet
  if (parseInt(theBet) === randNo) {
    console.log(
      `Congratulations! You won by betting on the exact number ${randNo}`
    );
    balance += betting_amt * 36; // Higher payout for exact number bet
    won = true;
  } else if (!won && !isNaN(parseInt(theBet))) {
    console.log(
      `You lost the exact number bet. The winning number was ${randNo}`
    );
    balance -= betting_amt;
  }

  // Update displayed balance
  p.innerText = `Your Balance = ${balance}`;

  // Clear the input fields
  bet.value = "";
  betType.value = "";
});
