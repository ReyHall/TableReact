import React from "react";
import logo from "../../assets/Logo-Atual-leiloes-163px.png";
import compradoresFaturaCompradores from "./compradoresFaturaCompradores.json";
import { calcValueFormat, calcParcela } from "./MethodFaturaComprador";
import { addMonths, format } from 'date-fns';
import "./FaturaComprador.css";

let listaComprador = {}
for (let i = 0; i < compradoresFaturaCompradores.length; i++) {
  let comp = compradoresFaturaCompradores[i].id
  if (!listaComprador[comp]) {
    listaComprador[comp] = []
  }

  for (let j = 0; j < compradoresFaturaCompradores[i].loteComprado.length; j++) {
    for (let k = 0; k < compradoresFaturaCompradores[i].loteComprado[j].vendedores.length; k++) {

      if (!listaComprador[comp][compradoresFaturaCompradores[i].loteComprado[j].vendedores[k].vendedor.id]) {
        listaComprador[comp][compradoresFaturaCompradores[i].loteComprado[j].vendedores[k].vendedor.id] = [compradoresFaturaCompradores[i].loteComprado[j]]
        listaComprador[comp][compradoresFaturaCompradores[i].loteComprado[j].vendedores[k].vendedor.id].push(compradoresFaturaCompradores[i].listaVendas[j])

      } else {
        listaComprador[comp][compradoresFaturaCompradores[i].loteComprado[j].vendedores[k].vendedor.id].push(compradoresFaturaCompradores[i].loteComprado[j])

        listaComprador[comp][compradoresFaturaCompradores[i].loteComprado[j].vendedores[k].vendedor.id].push(compradoresFaturaCompradores[i].listaVendas[j])


      }
    }
  }
}
/*let texto1 = ''
let status = ''
let compradores = ''

for (const comp1 in listaComprador) {
  let status1 = ''
  let table = ''
  let compra = Object.entries(listaComprador[comp1])
  compra = compra[0][1][1].compradores[0].comprador;
  compradores =
    `
      <div class="status">
        <h2>Comprador</h2>
        <p>Nome: ${compra?.nome}</p>
        <p>Endereço: ${compra?.rua + " " + compra?.numero}</p>
        <p>Bairro: </p>
        <p>Telefones: </p>
        <p>CPF/CPNJ:</p>
      </div>
            `

  for (const legal in listaComprador[comp1]) {
    let exist
    for (let index = 0; index < listaComprador[comp1][legal].length; index++) {
      if (index % 2 == 0) {
        let vende = listaComprador[comp1][legal][index].vendedores[0].vendedor;

        if (!exist) {
          exist = vende.id;
          status1 +=
            `
            <div class="status">
              <h2>Vendedor</h2>
              <p>Nome: ${vende.nome}</p>
              <p>Endereço:</p>
              <p>Bairro:</p>
              <p>Telefones:</p>
              <p>CPF/CPNJ:</p>
            </div>
          `
        }
        status1 += `<table>${listaComprador[comp1][legal][index]?.numero}</table>`
      }
    }
  };

  status = compradores + status1
  texto1 +=
    `<section class="container">
      <img class="logo" src=${logo} alt="" />
      <h1 class="title">Relações de Negociações</h1>
      <div class="flex-status">
        ${status}
      </div>
      ${table}
    </section>
    `
}

let depoisNoisVe = `
{compradoresFaturaCompradores.map(({loteComprado, loteLeilao, loteCondicao, listaVendas}, index) =>(
  <section key={index} className="container">
    <img src={logo} alt="" />
    <h1 className="title">Fatura de Comprador</h1>

    {Array.isArray(loteLeilao) ? (
    <div className="flex-heading">
      <p className="leilao">Leilão: {loteLeilao[0].nome}</p>
      <p className="data">Data: {loteLeilao[0].data}</p>
    </div>
    ) : (
      typeof loteLeilao === "object" && loteLeilao !== null ? (
      // Se loteLeilao for um objeto
      <div className="flex-heading">
        <p className="leilao">Leilão: {loteLeilao.nome}</p>
        <p className="data">Data: {loteLeilao.data}</p>
      </div>
      ) : null
    )}

    <div className="flex-status">
      <div className="status">
        <h2>Comprador</h2>
        <p>Nome: {listaVendas[0].compradores[0].comprador.nome}</p>
        <p>Endereço: {listaVendas[0].compradores[0].comprador.rua + listaVendas[0].compradores[0].comprador.numero}</p>
        <p>Bairro: {listaVendas[0].compradores[0].comprador.bairro}</p>
        <p>Telefones: {listaVendas[0].compradores[0].comprador.telefones.map((tel) => tel.telefone).join(" / ")}</p>
        <p>CPF/CPNJ: {listaVendas[0].compradores[0].comprador.cpf}</p>
      </div>

      <div className="status">
        <h2>Vendedor</h2>
        <p>Nome: {loteComprado[0].vendedores[0].vendedor.nome}</p>
        <p>Endereço: {loteComprado[0].vendedores[0].vendedor.rua + loteComprado[0].vendedores[0].vendedor.numero}</p>
        <p>Bairro: {loteComprado[0].vendedores[0].vendedor.bairro}</p>
        <p>Telefones: {loteComprado[0].vendedores[0].vendedor.telefones.map((tel) => tel.telefone).join(" / ")}</p>
        <p>CPF/CPNJ: {loteComprado[0].vendedores[0].vendedor.cpf}</p>
      </div>
    </div>

    <TableFaturaComprador listaVendas={listaVendas} loteComprado={loteComprado} loteCondicao={loteCondicao} />
  </section>
))}
`*/

function FaturaVendedor() {
  const section = Object.entries(listaComprador);
  const dados = Object.entries(listaComprador).map((dates) => {
    return Object.entries(dates[1])[0][1];
  });

  const pares = Object.entries(listaComprador).map((dates, index) => {
    return Object.entries(dates[1])[0][1].filter((item, index) => index % 2 === 0).sort((a, b) => a.numero - b.numero);
  });

  const impares = Object.entries(listaComprador).map((dates) => {
    return Object.entries(dates[1])[0][1].filter((item, index) => index % 2 === 1).sort((a, b) => a.numerovenda.localeCompare(b.numerovenda));
  });

  let parcelas = []
  let parcelasPar = []
  let valorLance = []
  let count = 0;

  for (let index = 0; index < pares.length; index++) {
    for (let kindex = 0; kindex < pares[index].length; kindex++) {
      parcelas = [...pares[index][kindex].condicao.parcelas].filter((newParcela, index) => newParcela.parcela === "1");
    }
  }

  for (let index = 0; index < pares.length; index++) {
    for (let kindex = 0; kindex < pares[index].length; kindex++) {
      parcelasPar = [...pares[index][kindex].condicao.parcelas].filter((newParcela, index) => newParcela.parcela === "2");
    }
  }

  const quantidadeInsercoes = Math.min(parcelasPar.length, parcelas.length);
  for (let i = 0; i < quantidadeInsercoes; i++) {
    parcelas.splice(i * parcelasPar.length, 0, { "parcela": "2" });
  }

  for (let index = 0; index < impares.length; index++) {
    for (let kindex = 0; kindex < impares[index].length; kindex++) {
      valorLance.push(impares[index][kindex].valorLance)
    }
  }

  const tableStyles = {
    headerRow: { background: "var(--gray-alternate)", color: "var(--white)" },
    headerCell: { background: "var(--gray-dark)", color: "var(--white)" }
  }

  return (
    <main className="fatura-comprador">
      {section.map((sec, index) => {
        const idsCompradoresProcessados = new Set();
        const idsVendedoresProcessados = new Set();

        return (
          <section key={index} className="container">
            <img src={logo} alt="" />
            <h1 className="title">Fatura de Comprador</h1>

            <div className="flex-status">
              {dados[index].map((dates, i) => {
                if (i % 2 === 0) {
                  const vendedorId = dates.vendedores[0].vendedor.id;
                  if (!idsVendedoresProcessados.has(vendedorId)) {
                    idsVendedoresProcessados.add(vendedorId);

                    return (
                      <div className="status" key={vendedorId}>
                        <h2>Vendedor</h2>
                        <p>Nome: {dates.vendedores[0].vendedor.nome}</p>
                        <p>Endereço: {dates.vendedores[0].vendedor.rua + " " + dates.vendedores[0].vendedor.numero}</p>
                        <p>Bairro: {dates.vendedores[0].vendedor.bairro}</p>
                        <p>Telefones: {dates.vendedores[0].vendedor.telefones.map((tel) => tel.telefone).join(" / ")}</p>
                        <p>CPF/CNPJ: {dates.vendedores[0].vendedor.cpf}</p>
                      </div>
                    );
                  }
                } else {
                  const compradorId = dates.compradores[0].comprador.id;
                  if (!idsCompradoresProcessados.has(compradorId)) {
                    idsCompradoresProcessados.add(compradorId);
                    return (
                      <div className="status" key={compradorId}>
                        <h2>Comprador</h2>
                        <p>Nome: {dates.compradores[0].comprador.nome}</p>
                        <p>Endereço: {dates.compradores[0].comprador.rua}</p>
                        <p>Bairro: {dates.compradores[0].comprador.bairro + " " + dates.compradores[0].comprador.numero}</p>
                        <p>Telefones: {dates.compradores[0].comprador.telefones.map((tel) => tel.telefone).join(" / ")}</p>
                        <p>CPF/CPNJ: {dates.compradores[0].comprador.cpf}</p>
                      </div>
                    );
                  }
                }
                return null;
              })}
            </div>

            {pares[index].map((parer, indexPares) => (
              <React.Fragment key={indexPares}>
                <table className="table-fatura-comprador lote">
                  <thead>
                    <tr style={tableStyles.headerCell}>
                      <th>{parer?.numero} <p>Lote</p></th>
                      <th>Valor do Lance: {(valorLance[count] || 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</th>
                      <th>Valor do Lote: {(calcValueFormat(valorLance[count], parer?.variations?.length, parer?.condicao?.nome) || 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                      </th>
                      <th>Comissão Vendedor: {((parer?.comissaoVendedor?.nome) || 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</th>
                    </tr>
                  </thead>
                </table>

                <p style={{ display: "none" }}>{count += 1}</p>

                <table className="table-fatura-comprador">
                  <tbody>
                    {parcelas.map((parcela, index) => {
                      const startDate = new Date('10/18/2023');
                      const date1 = addMonths(startDate, (index / 4) + 1);
                      const date2 = addMonths(startDate, (index / 4) + 10);
                      const date3 = addMonths(startDate, (index / 4) + 19);
                      const date4 = addMonths(startDate, (index / 4) + 28);

                      return (
                        index % 4 === 0 && (
                          <tr key={index / 9}>
                            <td>{(index / 4) + 1} - {format(date1, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count - 1], parcelas[index].parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                            <td>{(index / 4) + 10} - {format(date2, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count - 1], parcelas[index + 1].parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                            <td>{(index / 4) + 19} - {format(date3, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count - 1], parcelas[index + 1].parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                            <td>{(index / 4) + 28} - {format(date4, 'dd/MM/yyyy')}/ - {(calcParcela(valorLance[count - 1], parcelas[index + 1].parcela || 0)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</td>
                          </tr>
                        )
                      );
                    })}
                  </tbody>
                </table>

              </React.Fragment>

            ))}
          </section>
        );
      })}
    </main>
  );
}

export default FaturaVendedor;

