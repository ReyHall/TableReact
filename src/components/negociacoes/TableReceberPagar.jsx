import React from "react";
import { calculateTotals } from "./MethodNegociacoes";

function TableReceberPagar({ listaVendas, loteComprado, loteCondicao }){
  const {
  totalSinalVendas, 
  totalSinalCompras,
  totalCompradorComissao,
  totalVendasComissao,
  valorPagar
  } = calculateTotals(listaVendas, loteComprado, loteCondicao);

  return (
    <table className="table-receber-pagar">
      <thead>
        <tr style={{background: "var(--gray-dark)", color: "var(--white)"}}>
          <td colSpan={3}>A Receber</td>
        </tr>

        <tr>
          <td>Soma das parcelas iniciais</td>
          <td>{(totalSinalVendas.toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(+)")}</td>
        </tr>

        <tr style={{background: "var(--gray-dark)", color: "var(--white)"}}>
          <td colSpan={3}>A Pagar</td>
        </tr>
      </thead>

      <tbody>

        <tr>
          <td>Soma das parcelas iniciais</td>
          <td>{(totalSinalCompras.toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(-)")}</td>
        </tr>

        <tr>
          <td>Comissão do Comprador</td>
          <td>{(totalCompradorComissao.toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(-)")}</td>
        </tr>

        <tr>
          <td>Comissão do Vendedor</td>
          <td>{(totalVendasComissao.toLocaleString("pt-br", {style: "currency", currency: "BRL"}) + "(-)")}</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td>Valor a Pagar</td>
          <td>{(-1 * valorPagar).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</td>
        </tr>

        <tr>
          <td colSpan={2}>
            <div className="receipt">
              <p className="emphasis">Recebemos a importância de {(-1 * calculateTotals(listaVendas, loteComprado, loteCondicao).valorPagar).toLocaleString("pt-br", {style: "currency", currency: "BRL"})} referente a crédito conforme demonstrativo acima</p>

              <p className="signature">Atual Leilões e Eventos</p>
            </div>
          </td>
        </tr>

      </tfoot>
    </table>
  )
}

export default TableReceberPagar;