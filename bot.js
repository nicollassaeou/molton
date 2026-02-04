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

  // ---------- ensinar ----------
  if (clean.startsWith("aprende") && input.includes(":") && input.includes("=")) {
    const content = input.slice(input.indexOf(":") + 1).trim();
    const equalIndex = content.indexOf("=");

    if (equalIndex === -1) {
      return "formato errado 😭 usa: aprende: frase = resposta";
    }

    const frase = normalize(content.slice(0, equalIndex));
    const resposta = content.slice(equalIndex + 1).trim();

    if (!frase || !resposta) {
      return "frase ou resposta vazia 💀 tenta dnv";
    }

    memory.learned[frase] = resposta;
    saveMemory(memory);

    return `aprendi 😈 quando vc disser "${frase}", respondo "${resposta}"`;
  }

// ---------- ajuda ----------
if (clean === "ajuda" || clean === "help") {
  return `
🤖 Molton — comandos disponíveis:

• cumprimentos:
  oi | ola | salve | eae

• ensinar algo novo:
  aprende: frase = resposta
  exemplo:
  aprende: salve cria = eae meu mano 😈

• falar algo aprendido:
  é só digitar a frase exata

• listar:
lista tudo que ele aprendeu é so digitar listar

• resetar a memoria :
digite reset ou resetar memoria e a memoria é resetada

• status:
mostra os status de algumas coisas é so digitar status

• ajuda:
  ajuda | help

obs: eu aprendo de vdd e lembro msm depois de fechar 😎
`.trim();
}

// ---------- status ----------
if (clean === "status") {
  const total = Object.keys(memory.learned).length;

  if (total === 0) {
    return "🧠 memória vazia… ainda n aprendi nada 😶";
  }

  return `🧠 memória ativa 😈 aprendi ${total} coisa(s) até agora`;
}

// ---------- sobre ----------
if (clean === "sobre") {
  return `
🤖 Molton

sou um bot simples, mas real.
aprendo com humanos, guardo memória e evoluo aos poucos.

feito em Node.js 🟢
memória persistente 💾
sem marketing, sem hype — só existência.

team: Team Fhoton ⚡
status: underrated por escolha 😌

dica: me ensina coisas com
aprende: frase = resposta
`.trim();
}

// ---------- listar ----------
if (clean === "listar") {
  const frases = Object.keys(memory.learned);

  if (frases.length === 0) {
    return "📭 ainda n aprendi nada… me ensina algo 👀";
  }

  let resposta = "🧠 eu sei responder isso aqui:\n\n";
  frases.forEach((f, i) => {
    resposta += `${i + 1}. ${f}\n`;
  });

  return resposta.trim();
}

// ---------- resetar memória ----------
if (clean === "reset" || clean === "resetar memoria") {
  const memory = { learned: {} };
  saveMemory(memory);
  return "memória resetada 💀 tudo zerado, bora recomeçar!";
}

  // ---------- respostas aprendidas (prioridade máxima) ----------
  if (memory.learned[clean]) {
    return memory.learned[clean];
  }

  // ---------- cumprimentos base ----------
  const greetings = ["oi", "ola", "salve", "eae"];
  if (greetings.includes(clean)) {
    const replies = [
      "salve 😎",
      "eae cria 🔥",
      "fala aí 😈",
      "opa 👀",
      "chegou bem",
    ];

    return replies[Math.floor(Math.random() * replies.length)];
  }

  return "n entendi ainda… mas vc pode me ensinar 👀";
}

// 🔴 ISSO AQUI É O QUE TAVA FALTANDO
module.exports = { respond };

// ---------- modo terminal ----------
if (require.main === module) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Molton online 🔥 digita algo:");

  readline.on("line", (line) => {
    console.log(respond(line));
  });
}
