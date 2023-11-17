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

export const calcTotalVendas = (loteOrderId, loteCondicao) =>{
  const totalValorVendas = loteOrderId?.reduce((acc, incremento, index) =>{
    const lengthVariations = incremento.variations.length;
    const valorLanceFinal = acc + (Number(incremento.Vendas.valorLance) * lengthVariations) * parseFloat(loteCondicao[index].nome.replace(/x\((.*?)\)/g, ""));
    return valorLanceFinal;
  }, 0);

  const totalSinalVendas = loteOrderId?.reduce((acc, incremento, index) =>{
    const lengthVariations = incremento.variations.length;
    const parcela = Number(loteCondicao[index].parcelas[0].parcela);
    const valorSinalFinal = acc + Number(incremento.Vendas.valorLance * lengthVariations) * parcela;
    return valorSinalFinal;
  }, 0);

  const totalComissaoVendas = loteOrderId?.reduce((acc, incremento, index) =>{
    const lengthVariations = incremento.variations.length;
    const condicao = parseFloat(loteCondicao[index].nome.replace(/x\((.*?)\)/g, ""));
    const calculado = incremento.Vendas.valorLance * lengthVariations * condicao;
    const comissao = Number(incremento.comissaoVendedor.nome) / 100;
    const parcial = calculado * comissao;
    const novoTotal = acc + parcial;

    return novoTotal;
  }, 0)

  return {
    totalValorVendas,
    totalSinalVendas,
    totalComissaoVendas,
  }

}

export const calcTotalCompras = (listaVendasCompras, loteCompradorCompras, loteCondicaoCompras) =>{
  const totalValorCompras = listaVendasCompras?.reduce((acc, incremento, index) =>{
    const lengthVariations = loteCompradorCompras[index].variations.length;
    const valorLanceFinal = acc + (Number(incremento.valorLance) * lengthVariations) * parseFloat(loteCondicaoCompras[index].nome.replace(/x\((.*?)\)/g, ""));
    return valorLanceFinal;
  }, 0)

  const totalSinalCompras = listaVendasCompras?.reduce((acc, incremento, index) =>{
    const lengthVariations = loteCompradorCompras[index].variations.length;
    const parcela = Number(loteCondicaoCompras[index].parcelas[0].parcela);
    const valorSinalFinal = acc + Number(incremento.valorLance * lengthVariations) * parcela;
    return valorSinalFinal;
  }, 0)

  const totalComissaoCompras = listaVendasCompras?.reduce((acc, incremento, index) =>{
    const lengthVariations = loteCompradorCompras[index].variations.length;
    const condicao = parseFloat(loteCondicaoCompras[index].nome.replace(/x\((.*?)\)/g, ""));
    const calculado = incremento.valorLance * lengthVariations * condicao;
    const comissao = Number(incremento.comissaoComprador) / 100;
    const parcial = comissao * calculado;
    const novoTotal = acc + parcial;
    return novoTotal;
  }, 0)

  return {
    totalValorCompras,
    totalSinalCompras,
    totalComissaoCompras,
  }
}