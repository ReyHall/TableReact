import React from "react";
import logo from "../../assets/Logo-Atual-leiloes-163px.png";
import compradores from "./compradores.json"
import vendedores from "./vendedores.json";
import TableComprasVendas from "./TableComprasVendas";
import TableReceberPagar from "./TableReceberPagar";
import "./Negociacoes.css";

let vendedoresLista = [];
let compradoresLista = [];

// Usando forEach para copiar elementos dos arrays
compradores.forEach(compra => compradoresLista.push({ ...compra }));
vendedores.forEach(vende => vendedoresLista.push({ ...vende }));

// Combinando os arrays de compradores e vendedores
let compradoresVendedoresLista = [...vendedoresLista, ...compradoresLista];

// Removendo duplicatas pelo ID
compradoresVendedoresLista = compradoresVendedoresLista.filter(
  (elemento, index, self) => index === self.findIndex(item => item.id === elemento.id)
);

// Atualizando as compras usando forEach
compradores.forEach(comprador => {
  let compradoresVendedoresLista1 = compradoresVendedoresLista.find(item => item.id === comprador.id);

  if (compradoresVendedoresLista1) {
    compradoresVendedoresLista1.compras = {
      listaVendas: [...comprador.listaVendas],
      loteComprado: [...comprador.loteComprado],
      loteCondicao: [...comprador.loteCondicao],
    };
  }
});

console.log(compradoresVendedoresLista);

function Negociacoes(){
  return (
    <main className="negociacoes">
      {compradoresVendedoresLista.map(({loteId, loteLeilao, loteCondicao, compras, nome, rua, numero, estado, bairro}, index) =>(
        <section key={index} className="container">
          <img className="logo" src={logo} alt="" />
          <h1 className="title">Relações de Negociações</h1>

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

          <div className="dados">
            <p>Nome: {nome}</p>
            <p>Endereço: {rua + numero}</p>
            <p>Bairro: {bairro}</p>
            <p>Estado/Uf: {estado}</p>
          </div>

          <p className="obs">Prezado(a) senhor(a): Apresentamos a seguir, demonstrativo financeiro de seus negócios realizados em {loteLeilao.data} no LEILÃO no {loteLeilao.local}</p>

          <TableComprasVendas loteId={loteId} loteCondicao={loteCondicao} compras={compras} />
          <TableReceberPagar />

        </section>
      ))}
    </main>
  )
}

export default Negociacoes;