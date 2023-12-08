import React from "react";
import { calcValueFormat, calcParcela } from "./MethodFaturaComprador";
import { addMonths, format } from 'date-fns';

function TableFaturaComprador({ parer, valorLance, parcelas, count }) {

  const tableStyles = {
    headerRow: { background: "var(--gray-alternate)", color: "var(--white)" },
    headerCell: { background: "var(--gray-dark)", color: "var(--white)" }
  };

  return (
    <>
      <table className="table-fatura-comprador lote">
        <thead>
          <tr style={tableStyles.headerCell}>
            <th>{parer?.numero} <p>Lote</p></th>
            <th>Valor do Lance: {(valorLance[count] || 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</th>
            <th>Valor do Lote: {(calcValueFormat(valorLance[count], parer?.variations?.length, parer?.condicao?.nome) || 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</th>
            <th>Comissão Vendedor: {((parer?.comissaoVendedor?.nome) || 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</th>
          </tr>
        </thead>
      </table>

      <table className="table-fatura-comprador">
        <tbody>
          {parcelas.map((parcela, index) => {
            const startDate = new Date('10/18/2023');
            const date1 = addMonths(startDate, index + Math.floor(parcelas?.length / parcelas?.length));
            const date2 = addMonths(startDate, index + Math.floor(parcelas?.length / 4) + 1);
            const date3 = addMonths(startDate, index + Math.floor(parcelas?.length / 2) + 1);
            const date4 = addMonths(startDate, index + Math.floor(parcelas?.length / 1.25));

            return (
              index < Math.ceil(parcelas.length / 4) && (
                <tr key={index}>
                  <td>{index + Math.floor(parcelas.length / parcelas.length)} - {format(date1, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count], parcelas[index]?.parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                  <td>{index + Math.floor(parcelas.length / 4) + 1} - {format(date2, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count], parcelas[index + (parcelas.length / 4)]?.parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                  <td>{index + Math.floor(parcelas.length / 2) + 1} - {format(date3, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count], parcelas[index + (parcelas.length / 2)]?.parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                  <td>{index + Math.floor((parcelas.length / 1.25))} - {format(date4, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count], parcelas[index + Math.floor((parcelas.length / 1.25)) - 1]?.parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                </tr>
              )
            )
          })}
        </tbody>
      </table>
    </>
  );
}

export default TableFaturaComprador;