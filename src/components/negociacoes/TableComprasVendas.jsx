import React from "react";
import compradores from "./compradores.json";
import {calcValueFormat, calcValueParcelas, calcularEFormatarValor} from "./MethodNegociacoes"

function TableComprasVendas({loteId, loteCondicao}){
  const loteOrder = loteId.slice().sort((a,b) => a.numero - b.numero);
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
      </tbody>
    </table>
  )
}

export default TableComprasVendas;