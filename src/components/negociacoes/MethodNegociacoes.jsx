export const calcValueFormat = (valorLance, variations, loteCondicao) => {
  const valueCalc = (valorLance * variations) * parseFloat(loteCondicao.replace(/x\((.*?)\)/g, ""));
  return valueCalc;
};

export const calcValueParcelas = (valorLance, parcelas) => {
  const valueTotalParcela = valorLance * parseFloat(parcelas[0].parcela);
  return valueTotalParcela;
};

export const calcularEFormatarValor = (valorLance, variationsLength, condicao, comissao) => {
  const valorCalculado = calcValueFormat(valorLance, variationsLength, condicao);
  const comissaoCalculada = Number(comissao) / 100;
  const resultado = valorCalculado * comissaoCalculada;
  return resultado.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
};