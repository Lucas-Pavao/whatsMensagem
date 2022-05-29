const puppeteer = require("puppeteer");
const readlinesync = require("readline-sync");

let contato = readlinesync.question("Digite o Nome do Contato: ");
let mensagem = readlinesync.question("Digite o que deseja Enviar: ");
let qtd = readlinesync.question("Digite a quantidade de vezes a ser enviado: ");

async function Bot() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com", { waitUntil: "networkidle0" });
  await page.waitForSelector("._1lPgH");
  await page.waitForTimeout(1000);

  await page.type('._16C8p div[title="Search input textbox"]', contato); //Pesquisa o contato
  await page.click('._3OvU8 span[title="' + contato + '"]');
  await page.waitForTimeout(1000);
  for (let i = 0; i < parseInt(qtd); i++) {
    await page.type("._1UWac._1LbR4", " " + (i + 1) + "°- " + mensagem);
    await page.waitForTimeout(1000);

    await page.click(
      ' ._2lMWa button[class="tvf2evcx oq44ahr5 lb5m6g5c svlsagor p2rjqpw5 epia9gcq"]'
    );
  }
  await page.waitForTimeout(1000);

  await browser.close();
}
Bot();
