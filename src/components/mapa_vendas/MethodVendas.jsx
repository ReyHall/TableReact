// import mapaVendas from "./mapaVendas.json";

export const calcParcelas = (valorTotal, porcentagem) => {
  const parcelas = (valorTotal * porcentagem) / 100;
  return parcelas.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export const calcTotals = (mapaVendas, comissao) => {
  let total = 0;
  

  for (const incremento of mapaVendas) {
    const valorTotal = Number(incremento.valorTotal);
    const comissaoValor = Number(incremento[comissao]);

    if (!isNaN(valorTotal) && !isNaN(comissaoValor)) {
      total += valorTotal * (comissaoValor / 100);
    }
  }

  return total;
};



export const totalGeralVendas = (mapaVendas) => {

  let total = 0;

  for (const incremento of mapaVendas) {
    const valorTotal = Number(incremento.valorTotal);
    total +=  valorTotal
  }

  return total

}








export const abreviar = (nomeCompleto) => {
  const palavras = nomeCompleto.split(" ");

  if (palavras.length === 1) {
    return nomeCompleto;
  }

  const excecoes = ["dos", "das", "do", "da", "de", "se", "sa", "e", "a", "i", "o", "u"];
  const abreviado = palavras.map((palavra, index) => {
    if (index === 0 || excecoes.includes(palavra.toLowerCase()) || index === palavras.length - 1) {
      return palavra;
    }
    return palavra.charAt(0) + ".";
  });

  return abreviado.join(" ");
};