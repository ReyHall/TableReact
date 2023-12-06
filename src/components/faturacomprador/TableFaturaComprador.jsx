import React from "react";
import { calcValueFormat, calcParcela } from "./MethodFaturaComprador";
import { addMonths, format } from 'date-fns';

const tableStyles = {
  headerRow: { background: "var(--gray-alternate)", color: "var(--white)" },
  headerCell: { background: "var(--gray-dark)", color: "var(--white)" }
}

function TableFaturaComprador({ pares, parcelas, valorLance, count, indexSec }) {
  return (
    <>
      {pares[indexSec].map(({ variations, condicao, numero, comissaoVendedor }, index) => (
        <React.Fragment key={index}>

          <table className="table-fatura-comprador lote">
            <thead>
              <tr style={tableStyles.headerCell}>
                <th>{numero} <p>Lote</p></th>
                <th>Valor do Lance: {(valorLance[count] || 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</th>
                <th>Valor do Lote: {(calcValueFormat(valorLance[count], variations?.length, condicao?.nome) || 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</th>
                <th>Comissão Vendedor: {((comissaoVendedor?.nome) || 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</th>
              </tr>
            </thead>
          </table>


          <p style={{ display: "none" }}>{count += 1}</p>

          <table className="table-fatura-comprador">
            <tbody>
              {parcelas.map((parcela, index) => {
                const startDate = new Date('10/18/2023');
                const date1 = addMonths(startDate, index + Math.ceil(parcelas?.length / parcelas?.length));
                const date2 = addMonths(startDate, index + Math.ceil(parcelas?.length / 4) + 1);
                const date3 = addMonths(startDate, index + Math.ceil(parcelas?.length / 2) + 1);
                const date4 = addMonths(startDate, index + Math.floor(parcelas?.length / 1.25));

                return (
                  index <= Math.ceil(parcelas.length / 4) && (
                    <tr key={index / 9}>
                      <td>{index + (parcelas.length / parcelas.length)} - {format(date1, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count - 1], parcelas[index]?.parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                      <td>{index + (parcelas.length / 4) + 1} - {format(date2, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count - 1], parcelas[index + (parcelas.length / 4)]?.parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                      <td>{index + (parcelas.length / 2) + 1} - {format(date3, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count - 1], parcelas[index + (parcelas.length / 2)]?.parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                      <td>{index + Math.floor((parcelas.length / 1.25))} - {format(date4, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count - 1], parcelas[index + Math.floor((parcelas.length / 1.25)) - 1]?.parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                    </tr>
                  )
                )
              })}
            </tbody>
          </table>
        </React.Fragment>
      ))}
    </>
  )
}

export default TableFaturaComprador;