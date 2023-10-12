export const calcValueFormat = (valorLance, variations, condicao) => {
    const valueCalc = (valorLance * variations) * parseFloat(condicao.replace(/x\((.*?)\)/g, ""));
    return valueCalc;
};

export const calcularEFormatarValor = (valorLance, variationsLength, condicao, comissao) => {
    const valorCalculado = calcValueFormat(valorLance, variationsLength, condicao);
    const comissaoCalculada = Number(comissao) / 100;
    const resultado = valorCalculado * comissaoCalculada;
    return resultado.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
};

export const calcValueParcelas = (valorLance, parcelas) => {
    const valueTotalParcela = valorLance * parseFloat(parcelas[0].parcela);
    return valueTotalParcela;
};
  
export const calculateTotals = (listaVendas, loteComprado, loteCondicao) => {
    const totalValorCompras = listaVendas.reduce((acc, incremento, index) =>{
        const lengthVariations = loteComprado[index].variations.length;
        const valorLanceFinal = acc + (Number(incremento.valorLance) * lengthVariations) * parseFloat(loteCondicao[index].nome.replace(/x\((.*?)\)/g, ""));
        return valorLanceFinal;
    }, 0);

    const totalSinalCompras = listaVendas.reduce((acc, incremento, index) => {
        const lengthVariations = loteComprado[index].variations.length;
        const parcela = Number(loteCondicao[index].parcelas[0].parcela);
        const valorSinalFinal = acc + Number(incremento.valorLance * lengthVariations) * parcela;
        return valorSinalFinal;
    }, 0);;

    const totalCompradorComissao = listaVendas.reduce((acc, incremento, index) => {
        const lengthVariations = loteComprado[index].variations.length;
        const valorCondicao = parseFloat(loteCondicao[index].nome.replace(/x\((.*?)\)/g, ""));
        
        const valorCalculado = incremento.valorLance * lengthVariations * valorCondicao;
        const valorComissao = Number(incremento.comissaoComprador) / 100;
        
        const resultadoParcial = valorCalculado * valorComissao;
        const novoTotal = acc + resultadoParcial;
        
        return novoTotal;
    }, 0);
    
    const totalValorVendas = listaVendas.reduce((acc, incremento, index) =>{
        const lengthVariations = loteComprado[index].variations.length;
        const valorLanceFinal = acc + (Number(incremento.valorLance) * lengthVariations) * parseFloat(loteCondicao[index].nome.replace(/x\((.*?)\)/g, ""));
        return valorLanceFinal;
    }, 0);;

    const totalSinalVendas = listaVendas.reduce((acc, incremento, index) =>{
        const lengthVariations = loteComprado[index].variations.length;
        const parcela = Number(loteCondicao[index].parcelas[0].parcela);
        const valorSinalFinal = acc + Number(incremento.valorLance * lengthVariations) * parcela
        return valorSinalFinal;
    }, 0);

    const totalVendasComissao = listaVendas.reduce((acc, incremento, index) => {
        const lengthVariations = loteComprado[index].variations.length;
        const valorCondicao = parseFloat(loteCondicao[index].nome.replace(/x\((.*?)\)/g, ""));
        
        const valorCalculado = incremento.valorLance * lengthVariations * valorCondicao;
        const valorComissao = loteComprado[index].comissaoVendedor.nome / 100;
        
        const resultadoParcial = valorCalculado * valorComissao;
        const novoTotal = acc + resultadoParcial;
        
        return novoTotal;
    }, 0);
    

    const valorPagar = totalSinalVendas + totalSinalCompras + totalCompradorComissao + totalVendasComissao;
  
    return {
      totalValorCompras,
      totalSinalCompras,
      totalCompradorComissao,
      totalValorVendas,
      totalSinalVendas,
      totalVendasComissao,
      valorPagar,
    };
};