const puppeteer = require("puppeteer");
const readlinesync = require("readline-sync");

let numCOntatos = readlinesync.questionInt(
  "Para quantas pessoas voce deseja enviar mensagem: "
);
let contatos = [];
for (let j = 0; j < numCOntatos; j++) {
  let contato = readlinesync.question("Digite o Nome do Contato: ");
  contatos.push(contato);
}

let mensagem = readlinesync.question("Digite o que deseja Enviar: ");
let qtd = readlinesync.questionInt(
  "Digite a quantidade de vezes a ser enviado: "
);
let bool = readlinesync.question("Deseja ultilizar contador na mensagem y/N: ");

async function Bot() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com", { waitUntil: "networkidle0" });
  await page.waitForSelector("._1lPgH", { timeout: 50000 });
  await page.waitForTimeout(1000);
  for (contato of contatos) {
    await page.type('._16C8p div[title="Search input textbox"]', contato); //Pesquisa o contato
    await page.click('._3OvU8 span[title="' + contato + '"]');
    await page.waitForTimeout(3000);
    for (let i = 0; i < qtd; i++) {
      if (bool.toLowerCase() === "y") {
        await page.type("._1UWac._1LbR4", " " + (i + 1) + "°- " + mensagem);
      } else {
        await page.type("._1UWac._1LbR4", " " + mensagem);
      }
      await page.waitForTimeout(1000);

      await page.click(
        ' ._2lMWa button[class="tvf2evcx oq44ahr5 lb5m6g5c svlsagor p2rjqpw5 epia9gcq"]'
      );
    }
    await page.waitForTimeout(1000);
  }

  await browser.close();
}
Bot();
