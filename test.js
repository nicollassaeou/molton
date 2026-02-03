const { respond } = require("./bot");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("bot ligado 🤖 digita algo");

// loop de chat
rl.on("line", (input) => {
  const resposta = respond(input);
  console.log("bot:", resposta);
});
