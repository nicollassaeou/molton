const fs = require("fs");

const memoryFile = "./memory.json";

// cria memória se não existir
if (!fs.existsSync(memoryFile)) {
  fs.writeFileSync(memoryFile, JSON.stringify({ learned: {} }, null, 2));
}

function loadMemory() {
  return JSON.parse(fs.readFileSync(memoryFile, "utf8"));
}

function saveMemory(data) {
  fs.writeFileSync(memoryFile, JSON.stringify(data, null, 2));
}

// normaliza frases
function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim();
}

function respond(input) {
  const memory = loadMemory();
  const clean = normalize(input);

  // ---------- ensinar o bot ----------
  if (clean.startsWith("aprende")) {
    const content = input.slice(input.indexOf(":") + 1).trim();
    const equalIndex = content.indexOf("=");

    if (equalIndex === -1)
      return "formato errado 😭 usa: aprende: frase = resposta";

    const frase = normalize(content.slice(0, equalIndex).trim());
    const resposta = content.slice(equalIndex + 1).trim();

    memory.learned[frase] = resposta;
    saveMemory(memory);

    return `aprendi 😈 quando vc disser "${frase}", respondo "${resposta}"`;
  }

  // ---------- respostas aprendidas ----------
  if (memory.learned[clean]) {
    return memory.learned[clean];
  }

  // ---------- cumprimentos base ----------
  if (
    clean.includes("oi") ||
    clean.includes("ola") ||
    clean.includes("salve") ||
    clean.includes("eae")
  ) {
    return "salve 😎";
  }

  // fallback
  return "n entendi ainda… mas vc pode me ensinar 👀";
}

module.exports = { respond };

// ---------- testando rapidinho ----------
if (require.main === module) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Bot ativo! Fala com ele:");

  readline.on("line", (line) => {
    console.log(respond(line));
  });
}
