import fs from "fs";
let size = [];
//Read
let allCities = JSON.parse(fs.readFileSync("./cities/Cidades.json", "utf-8"));
// prettier-ignore
let allCountries = JSON.parse(fs.readFileSync("./states/Estados.json", "utf-8"));
let states = [
  "AC.json",
  "AL.json",
  "AM.json",
  "AP.json",
  "BA.json",
  "CE.json",
  "DF.json",
  "ES.json",
  "GO.json",
  "MA.json",
  "MG.json",
  "MS.json",
  "MT.json",
  "PA.json",
  "PB.json",
  "PE.json",
  "PI.json",
  "PR.json",
  "RJ.json",
  "RN.json",
  "RO.json",
  "RR.json",
  "RS.json",
  "SC.json",
  "SE.json",
  "SP.json",
  "TO.json",
];
//Main
createFiles();
countCities("AC");
biggestCities();
smallestCities();
biggestNameLengthCity();
smallestNameLenghtCity();

function createFiles() {
  for (let i = 0; i < allCountries.length; i++) {
    const contendFile = allCities.filter((cidade) => {
      return cidade.Estado == i + 1;
    });

    fs.writeFileSync(
      `${allCountries[i].Sigla}.json`,
      `${JSON.stringify(contendFile)}`
    );
  }
}

function countCities(UF) {
  let count = JSON.parse(fs.readFileSync(`${UF}.json`, "utf-8"));
  console.log(`Neste estado tem ${count.length} cidades`);
}

function biggestCities() {
  for (let i = 0; i < states.length; i++) {
    const arr = JSON.parse(fs.readFileSync(states[i], "utf-8"));
    size.push({ UF: [states[i].substr(0, 2)], Quantidade: arr.length });
  }
  const filterSizeCities = size.sort((a, b) => {
    return b.Quantidade - a.Quantidade;
  });

  console.log(filterSizeCities.splice(0, 5));
}

function smallestCities() {
  for (let i = 0; i < states.length; i++) {
    const arr = JSON.parse(fs.readFileSync(states[i], "utf-8"));
    size.push({ UF: [states[i].substr(0, 2)], Quantidade: arr.length });
  }
  const filterSizeCities = size.sort((a, b) => {
    return a.Quantidade - b.Quantidade;
  });

  console.log(filterSizeCities.splice(0, 5));
}

async function biggestNameLengthCity() {
  let tamanhos = [];

  for (let i = 0; i < states.length; i++) {
    const teste = await JSON.parse(
      fs.readFileSync(`${states[i].substr(0, 2)}.json`)
    );

    tamanhos.push({
      Cidade: teste
        .map((cidade) => {
          return cidade.Nome;
        })
        .sort((a, b) => {
          return b.length - a.length;
        })[0],

      UF: states[i].substr(0, 2),
    });
  }

  console.log(tamanhos);
}

async function smallestNameLenghtCity() {
  let tamanhos = [];

  for (let i = 0; i < states.length; i++) {
    const teste = await JSON.parse(
      fs.readFileSync(`${states[i].substr(0, 2)}.json`)
    );

    tamanhos.push({
      Cidade: teste
        .map((cidade) => {
          return cidade.Nome;
        })
        .sort((a, b) => {
          return a.length - b.length;
        })[0],

      UF: states[i].substr(0, 2),
    });
  }

  console.log(tamanhos);
}
