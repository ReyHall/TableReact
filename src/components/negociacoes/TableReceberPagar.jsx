import React from "react";
import {calcTotalVendas, calcTotalCompras} from "./MethodNegociacoes"

function TableReceberPagar({loteId, compras, loteCondicao}){
  const tableStyles = {
    headerRow: { background: "var(--gray-alternate)", color: "var(--white)" },
    headerCell: { background: "var(--gray-dark)", color: "var(--white)" }
  }
  const { totalValorVendas, totalSinalVendas, totalComissaoVendas } = calcTotalVendas(loteId, loteCondicao);
  const { totalValorCompras, totalSinalCompras, totalComissaoCompras } = calcTotalCompras(compras?.listaVendas, compras?.loteComprado, compras?.loteCondicao);

  const valorPagar = Number(
    (totalSinalVendas || 0) - (totalSinalCompras || 0) - 
    (totalComissaoCompras || 0) - (totalComissaoVendas || 0)
  );

  return (
    <table className="table-receber-pagar">
      <thead>
        <tr style={tableStyles.headerCell}>
          <th colSpan={2}>A Receber</th>
        </tr>

        <tr>
          <td>Soma das Parcelas Iniciais</td>
          <td>
            {totalSinalVendas 
              ? Number(totalSinalVendas).toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(+)"
              : Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(+)"
            }
          </td>
        </tr>
      </thead>

      <tbody>
        <tr style={tableStyles.headerCell}>
          <th colSpan={2}>A Pagar</th>
        </tr>

        <tr>
          <td>Soma das Parcelas Iniciais</td>
          <td>
            {totalSinalCompras
              ? Number(totalSinalCompras).toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(-)"
              : Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(-)"
            }
          </td>
        </tr>

        <tr>
          <td>Comissão de Comprador</td>
          <td>
            {totalComissaoCompras
              ? Number(totalComissaoCompras).toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(-)"
              : Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(-)"
            }
          </td>
        </tr>

        <tr>
          <td>Comissao de Vendedor</td>
          <td>
            {totalComissaoVendas
              ? Number(totalComissaoVendas).toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(-)"
              : Number(0).toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(-)"
            }</td>
        </tr>
        
      </tbody>

      <tfoot>
        <tr>
          <td>Valor a Pagar</td>
          <td>{(valorPagar?.toLocaleString("pt-br", {style: "currency", currency: "BRL"}) || Number(0).toLocaleString('pt-br', {style: "currency", currency: "BRL"}))}</td>
        </tr>

        <tr>
          <td colSpan={2}>
            <div className="receipt">
              <p className="emphasis">Recebemos a importancia de <span>{valorPagar.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</span> referente a crédito conforme demonstrativo acima.</p>
              <p className="signature">ATUAL LEILÕES</p>
            </div>
          </td>
        </tr>
      </tfoot>

    </table>
  )
}

export default TableReceberPagar;