import React from "react";
import {calcValueFormat, calcValueParcelas, calcularEFormatarValor, calcTotalVendas, calcTotalCompras} from "./MethodNegociacoes"

function TableComprasVendas({loteId, compras, loteCondicao}){
  const loteOrderId = loteId?.slice().sort((a,b) => a.numero - b.numero);
  const loteCompradoCompras = compras?.loteComprado.slice().sort((a,b) => a.numero - b.numero);
  const listaVendasCompras = compras?.listaVendas.slice().sort((a, b) => a.numerovenda.localeCompare(b.numerovenda, undefined, {numeric: true}));
  const loteCondicaoCompras = compras?.loteCondicao.slice().sort((a,b) => a.nome.localeCompare(b.nome));
  const loteCondicaoVendas = loteCondicao?.slice().sort((a,b) => a.nome.localeCompare(b.nome));

  const tableStyles = {
    headerRow: { background: "var(--gray-alternate)", color: "var(--white)" },
    headerCell: { background: "var(--gray-dark)", color: "var(--white)" }
  }

  const { totalValorVendas, totalSinalVendas, totalComissaoVendas } = calcTotalVendas(loteOrderId, loteCondicaoVendas);

  const { totalValorCompras, totalSinalCompras, totalComissaoCompras } = calcTotalCompras(listaVendasCompras, loteCompradoCompras, loteCondicaoCompras);

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
      {loteOrderId && loteOrderId.length > 0 && loteCompradoCompras && loteCompradoCompras.length > 0 ?(
        <>
          {loteOrderId?.map((lote, index) => (
              <tr key={index}>
                <td style={{width: "7%"}}>{lote.numero}</td>
                <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{calcValueFormat(lote.Vendas.valorLance, lote.variations.length, loteCondicaoVendas[index].nome).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{(calcValueParcelas(lote.Vendas.valorLance, loteCondicaoVendas[index].parcelas) * lote.variations.length).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{calcularEFormatarValor(lote.Vendas.valorLance, lote.variations.length, loteCondicaoVendas[index].nome, lote.comissaoVendedor.nome)}</td>
              </tr>
          ))}
          {loteCompradoCompras?.map((lote, index) =>(
            <tr key={index}>
              <td style={{width: "7%"}}>{lote.numero}</td>
              <td>{calcValueFormat(listaVendasCompras[index].valorLance, lote.variations.length, loteCondicaoCompras[index].nome).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{(calcValueParcelas(listaVendasCompras[index].valorLance, loteCondicaoCompras[index].parcelas) * lote.variations.length).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{calcularEFormatarValor(listaVendasCompras[index].valorLance, lote.variations.length, loteCondicaoCompras[index].nome, listaVendasCompras[index].comissaoComprador)}</td>
              <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
            </tr>
          ))}
        </>
      ) : (
        loteOrderId && loteOrderId.length > 0 ? (
          loteOrderId.map((lote, index) => (
            <tr key={index}>
              <td style={{width: "7%"}}>{lote.numero}</td>
              <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{calcValueFormat(lote.Vendas.valorLance, lote.variations.length, loteCondicaoVendas[index].nome).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{(calcValueParcelas(lote.Vendas.valorLance, loteCondicaoVendas[index].parcelas) * lote.variations.length).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{calcularEFormatarValor(lote.Vendas.valorLance, lote.variations.length, loteCondicaoVendas[index].nome, lote.comissaoVendedor.nome)}</td>
            </tr>
          ))
        ) : (
          loteCompradoCompras && loteCompradoCompras.length > 0 ? (
            loteCompradoCompras.map((lote, index) =>(
              <tr key={index}>
                <td style={{width: "7%"}}>{lote.numero}</td>
                <td>{calcValueFormat(listaVendasCompras[index].valorLance, lote.variations.length, loteCondicaoCompras[index].nome).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{(calcValueParcelas(listaVendasCompras[index].valorLance, loteCondicaoCompras[index].parcelas) * loteCompradoCompras[index].variations.length).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{calcularEFormatarValor(listaVendasCompras[index].valorLance, lote.variations.length, loteCondicaoCompras[index].nome, listaVendasCompras[index].comissaoComprador)}</td>
                <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              </tr>
            ))
          ) : null
        )
      )}
      </tbody>

      <tfoot>
        {loteOrderId && loteOrderId.length > 0 && loteCompradoCompras && loteCompradoCompras.length > 0 ? (
          <tr style={tableStyles.headerRow}>
            <td>Total</td>
            <td>{totalValorCompras?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
            <td>{totalSinalCompras?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
            <td>{totalComissaoCompras?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
            <td>{totalValorVendas?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
            <td>{totalSinalVendas?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
            <td>{totalComissaoVendas?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
          </tr>
        ) : (
          loteOrderId && loteOrderId.length > 0 ?(
            <tr style={tableStyles.headerRow}>
              <td>Total</td>
              <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{totalValorVendas?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{totalSinalVendas?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              <td>{totalComissaoVendas?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
            </tr>
          ) : (
            loteCompradoCompras && loteCompradoCompras.length > 0 ?(
              <tr style={tableStyles.headerRow}>
                <td>Total</td>
                <td>{totalValorCompras?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{totalSinalCompras?.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{totalComissaoCompras.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
                <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
              </tr>
            ) : null
          )
        )}
      </tfoot>
    </table>
  )
}

export default TableComprasVendas;