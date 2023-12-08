import React from "react";
import logo from "../../assets/Logo-Atual-leiloes-163px.png";
import compradoresFaturaCompradores from "./compradoresFaturaCompradores.json";
import VendedorStatus from "./VendedorStatus";
import CompradorStatus from "./CompradorStatus";
import TableFaturaComprador from "./TableFaturaComprador";
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

function FaturaComprador() {
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
  let valorLance = []
  let count = 0;

  for (let index = 0; index < pares.length; index++) {
    for (let kindex = 0; kindex < pares[index].length; kindex++) {
      parcelas = [...pares[index][kindex].condicao.parcelas];
    }
  }

  for (let index = 0; index < impares.length; index++) {
    for (let kindex = 0; kindex < impares[index].length; kindex++) {
      valorLance.push(impares[index][kindex].valorLance)
    }
  }

  return (
    <main className="fatura-comprador">
      {section.map((sec, indexSec) => {
        const idsCompradoresProcessados = new Set();
        const idsVendedoresProcessados = new Set();

        return (
          <section key={indexSec} className="container">
            <img src={logo} alt="" />
            <h1 className="title">Fatura de Comprador</h1>

            <div className="flex-status">
              {dados[indexSec].map(({ vendedores, compradores }, index) => {
                if (index % 2 === 0) {
                  const vendedorId = vendedores[0].vendedor.id;
                  if (!idsVendedoresProcessados.has(vendedorId)) {
                    idsVendedoresProcessados.add(vendedorId);
                    return <VendedorStatus key={vendedorId} vendedores={vendedores} />;
                  }
                } else {
                  const compradorId = compradores[0].comprador.id
                  if (!idsCompradoresProcessados.has(compradorId)) {
                    idsCompradoresProcessados.add(compradorId);
                    return <CompradorStatus key={compradorId} compradores={compradores} />;
                  }
                }
              })}
            </div>

            {pares[indexSec].map((parer, index) => (
              <TableFaturaComprador key={index} parer={parer} valorLance={valorLance} parcelas={parcelas} count={count < valorLance?.length && count++} />
            ))}
          </section>
        );
      })}
    </main>
  );
}

export default FaturaComprador;

