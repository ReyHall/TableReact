import React from 'react';
import { calcValueFormat, calcValueParcelas, calculateTotals } from './MethodNegociacoes';

function TabelaComprasVendas({ listaVendas, loteComprado, loteCondicao }) {
  const lotesOrdenados = loteComprado.slice().sort((a, b) => a.numero - b.numero);
  const listaVendasOrdenadas = listaVendas.slice().sort((a, b) => a.numerovenda.localeCompare(b.numerovenda, undefined, {numeric: true}));
  const loteCompradoOrdenados = loteComprado.slice().sort((a, b) => a.numero - b.numero);
  const loteCondicaoOrdenados = loteCondicao.slice().sort((a, b) => a.nome.localeCompare(b.nome));
  let countSize = 1.6;

  const {
    totalValorCompras,
    totalSinalCompras,
    totalCompradorComissao,
    totalValorVendas,
    totalSinalVendas,
    totalVendasComissao,
  } = calculateTotals(listaVendas, loteComprado, loteCondicao);

  const tableStyles = {
    headerRow: { background: "var(--gray-alternate)", color: "var(--white)" },
    headerCell: { background: "var(--gray-dark)", color: "var(--white)" }
  }

  return (
    <table className="table-compras-vendas">
      <thead>
        <tr style={tableStyles.headerRow}>
          <th rowSpan={2}>Lotes</th>
          <th colSpan={3}>Compras</th>
          <th colSpan={3}>Vendas</th>
        </tr>
        <tr style={tableStyles.headerCell}>
          <th>Valor</th>
          <th>Sinal</th>
          <th>Comissao</th>
          <th>Valor</th>
          <th>Sinal</th>
          <th>Comissao</th>
        </tr>
      </thead>
      <tbody>
        {lotesOrdenados.map((lote, index) =>(
          <tr key={index}>
            <td className='lote' style={{fontSize: lote.numero > 10 && `${(countSize -= 0.01)}rem`}}>{lote.numero}</td>
            <td>{calcValueFormat(listaVendasOrdenadas[index].valorLance, loteCompradoOrdenados[index].variations.length, loteCondicaoOrdenados[index].nome).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
            <td>{(calcValueParcelas(listaVendasOrdenadas[index].valorLance, loteCondicaoOrdenados[index].parcelas) * loteCompradoOrdenados[index].variations.length).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
            <td>
              {(() => {
                const valorCalculadoComprador = calcValueFormat(
                  listaVendasOrdenadas[index].valorLance,
                  loteCompradoOrdenados[index].variations.length,
                  loteCondicaoOrdenados[index].nome
                );
                const comissaoCalculada = Number(listaVendasOrdenadas[index].comissaoComprador) / 100;
                const resultado = valorCalculadoComprador * comissaoCalculada;
                return resultado.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
              })()}
            </td>

            <td>{calcValueFormat(listaVendasOrdenadas[index].valorLance, loteCompradoOrdenados[index].variations.length, loteCondicaoOrdenados[index].nome).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>

            <td>{(calcValueParcelas(listaVendasOrdenadas[index].valorLance, loteCondicaoOrdenados[index].parcelas) * loteCompradoOrdenados[index].variations.length).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
            <td>
            {(() => {
                const valorCalculadoVendas = calcValueFormat(
                  listaVendasOrdenadas[index].valorLance,
                  loteCompradoOrdenados[index].variations.length,
                  loteCondicaoOrdenados[index].nome
                );
                const comissaoCalculada = loteComprado[index].comissaoVendedor.nome / 100;
                const resultado = valorCalculadoVendas * comissaoCalculada;
                
                return resultado.toLocaleString("pt-br", {style: "currency", currency: "BRL"});
              })()}
            </td>

          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr style={tableStyles.headerRow}>
          <td>Total</td>
          <td>{totalValorCompras.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
          <td>{totalSinalCompras.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
          <td>{totalCompradorComissao.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
          <td>{totalValorVendas.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
          <td>{totalSinalVendas.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
          <td>{totalVendasComissao.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default TabelaComprasVendas;
