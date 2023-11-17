import React from "react";
import compradores from "./compradores.json";
import {calcValueFormat, calcValueParcelas, calcularEFormatarValor} from "./MethodNegociacoes"

function TableComprasVendas({loteId, compras}){
  const loteOrderId = loteId?.slice().sort((a,b) => a.numero - b.numero);
  const loteCompradoCompras = compras?.loteComprado.slice().sort((a,b) => a.numero - b.numero);
  const listaVendasCompras = compras?.listaVendas.slice().sort((a, b) => a.numerovenda.localeCompare(b.numerovenda, undefined, {numeric: true}));
  const loteCondicaoCompras = compras?.loteCondicao.slice().sort((a,b) => a.nome.localeCompare(b.nome));

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
      {loteOrderId && loteOrderId.length > 0 ? loteOrderId.map((lote) => (
        <tr key={lote.numero}>
          <td>{lote.numero}</td>
        </tr>
      )) : loteCompradoCompras && loteCompradoCompras.length > 0 && loteCompradoCompras.map((lote, index) => (
        <tr key={lote.numero}>
          <td>{lote.numero}</td>
          <td>{calcValueFormat(listaVendasCompras[index].valorLance, loteCompradoCompras[index].variations.length, loteCondicaoCompras[index].nome).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
          <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
          <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
          <td>{Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default TableComprasVendas;