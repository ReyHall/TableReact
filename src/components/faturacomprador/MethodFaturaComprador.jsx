export const calcValueFormat = (valorLance, variations, loteCondicao) => {
  const valueCalc = (valorLance * variations) * parseFloat(loteCondicao.replace(/x\((.*?)\)/g, ""));
  return valueCalc;
}

export const calcParcela = (valorLance, parcela) => {
  const valueParcela = valorLance * parcela;
  return valueParcela;
}