# Molton

Molton é um bot simples feito em Node.js que roda no terminal.
Ele conversa com o usuário e aprende respostas a partir de comandos ensinados manualmente.

Projeto experimental / beta  
Team: Team Fhoton ⚡

O foco do projeto é aprendizado, diversão e experimentação — não é uma IA avançada.

---

## O que o Molton faz

- Responde mensagens simples no terminal
- Aprende novas frases ensinadas pelo usuário
- Salva tudo que aprende em um arquivo de memória
- Mantém o aprendizado mesmo após reiniciar

---

## Arquivos do projeto

- `test.js`  
  Arquivo principal do bot.  
  É ele que você executa para iniciar o Molton.

- `memory.json`  
  Memória do bot.  
  Tudo que ele aprende fica salvo aqui.  
  Se apagar esse arquivo, o bot esquece tudo.

---

## Requisitos

- Windows
- Node.js instalado  
  (https://nodejs.org)

---

## Como rodar o bot

1. Baixe ou clone este repositório
2. Abra a pasta do projeto
3. Abra um terminal dentro da pasta
4. Execute:

node test.js


5. O bot vai iniciar e você já pode conversar com ele

---

## Como ensinar o Molton

O Molton aprende usando o seguinte formato:

aprende: frase = resposta

shell
Copiar código

### Exemplo

aprende: salve cria = eae meu mano 😈

yaml
Copiar código

Depois disso, quando você digitar:

salve cria

yaml
Copiar código

O bot vai responder:

eae meu mano 😈


---

## Importante sobre o aprendizado

- O formato precisa ser seguido corretamente
- Frase e resposta podem ter espaços
- O aprendizado é baseado em texto exato
- Não é IA de verdade (ainda 👀)

---

## Sobre a memória

- O arquivo `memory.json` é atualizado automaticamente
- Ele funciona como um “baú de memória” do bot
- Reiniciar o bot não apaga o que foi aprendido
- Apagar o arquivo reseta o bot

---

## Status do projeto

- 🧪 Beta / experimental
- Código simples e em evolução
- Feito para estudo e diversão
- Sem dependência de APIs externas

---

## Ideias futuras (talvez)

- Comandos extras pré-definidos(meio feito com o update)
- Melhor interpretação de frases
- Camada de IA com limites
- Interface visual no futuro(este é um futuro mto distante)

---

## Aviso final

Este projeto não foi feito para ser perfeito.
Ele foi feito para existir.

Se você achou interessante, ótimo.
Se não, tudo bem também.
