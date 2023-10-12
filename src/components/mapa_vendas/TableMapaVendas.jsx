import React from "react";
import { abreviar, calcParcelas, calcTotals, totalGeralVendas } from "./MethodVendas";

function TableMapaVendas({ mapaVendas }) {
  var bottom = 0;
  var pagNum = 2; 
  const linkStyle = document.createElement("link");

  const colspanNum = document.querySelectorAll(".table-mapa-vendas tbody td").length;

  React.useEffect(() => {
    document.querySelectorAll("tbody tr:nth-child(17n)").forEach(function(paragraph) {
      bottom -= 100;
      var botString = bottom.toString();
      var counter = document.querySelector('h3.pag1').cloneNode(true);
      counter.classList.remove('pag1');
      counter.style.bottom = botString + "vh";
      var numString = pagNum.toString();
      counter.classList.add("pag" + numString);
      paragraph.parentNode.insertBefore(counter, paragraph);
      pagNum = parseInt(numString);
      pagNum++; /* Next number */
    });

    var pagTotal = document.querySelectorAll('.pag').length; /* Gets the total amount of pages by total classes of paragraphs */
    var pagTotalString = pagTotal.toString();
    document.querySelectorAll("h3[class^=pag]").forEach(function(element) {
      /* Gets the numbers of each classes and pages */
      var numId = element.className.match(/\d+/)[0];
      document.styleSheets[0].addRule('h3.pag' + numId + '::before', 'content: " ' + numId + ' de ' + pagTotalString + '";');
    });
  }, []);

  const tableStyles = {
    headerRow: { background: "var(--gray-alternate)", color: "var(--white)" },
    headerCell: { background: "var(--gray-dark)", color: "var(--white)" }
  };

  const totalComissaoVendas = calcTotals(mapaVendas, "comissaoVend");
  const totalComissaoComprador = calcTotals(mapaVendas, "comissaoComprador");
  const totalGeralComissao = totalComissaoComprador + totalComissaoVendas;

  return (
    <React.Fragment>
      <table className="table-mapa-vendas">
        <thead>
          <tr style={tableStyles.headerCell}>
            <td>Lt</td>
            <td>Rt</td>
            <td>Vendedores</td>
            <td>Rt</td>
            <td>Compradores</td>
            <td>Qtd x Sexo / Raça</td>
            <td>Lance x Qtd</td>
            <td>Parcelas</td>
            <td>Total do Lote</td>
          </tr>
        </thead>

        <tbody>
          {mapaVendas.map(({ numLote, comprador, vendedor, animais, qntAnimalSexoF, qntAnimalSexoM, qntAnimalSexoT, animalRaca, valorLance, condicaoMultiplica, comissaoVend, comissaoComprador, valorTotal }, index) => (
            <tr key={index} className={index % 2 == 0 ? "even" : "odd"}>
              <td>{numLote}</td>
              <td>{vendedor[0].porcentagem + "%"}</td>
              <td style={{ width: "15%" }}>{abreviar(vendedor[0].nome)}</td>
              <td>{comprador[0].porcentagem + "%"}</td>
              <td style={{ width: "15%" }}>{abreviar(comprador[0].nome)}</td>
              <td style={{ width: "15%" }}>
                <p> F: {qntAnimalSexoF} M: {qntAnimalSexoM} T: {qntAnimalSexoT}</p>
                <p>{animalRaca}</p>
              </td>
              <td>{valorLance} x {animais.length}</td>
              <td>
                <p>{condicaoMultiplica + "x"}</p>
                <p>Vend. {comissaoVend + "%"} = {calcParcelas(valorTotal, comissaoVend)}</p>
                <p>Comp. {comissaoComprador + "%"} = {calcParcelas(valorTotal, comissaoComprador)}</p>
              </td>
              <td>{valorTotal.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="table-total-mapa-vendas">
        <tfoot>
          <tr style={tableStyles.headerRow}>
            <td colSpan={colspanNum}>
              <div className="flex">
                <p>Total Geral de Vendas = {totalGeralVendas.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                <p>Total Comissão Vendedor = {totalComissaoVendas.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                <p>Total Comissão Comprador = {totalComissaoComprador.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                <p>Total Geral Comissão = {totalGeralComissao.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <h3 className="pag pag1"></h3>
      <div className="insert"></div>
    </React.Fragment>
  );
}

export default TableMapaVendas;
