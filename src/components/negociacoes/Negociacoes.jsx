import React from "react";
import logo from "../../assets/Logo-Atual-leiloes-163px.png";
import compradores from "./compradores.json"
import vendedores from "./vendedores.json";
import TableComprasVendas from "./TableComprasVendas";
import TableReceberPagar from "./TableReceberPagar";
import "./Negociacoes.css";

let vendedoresLista = [];
let compradoresLista = [];
let compradoresVendedoresLista = [];



compradores.forEach((compra) => compradoresLista.push(compra));
vendedores.forEach((vende) => vendedoresLista.push(vende));

console.log(compradores.length)






compradoresVendedoresLista = [...vendedoresLista, ...compradoresLista];



// Filtra a lista combinada para manter apenas elementos únicos pelo ID
compradoresVendedoresLista = compradoresVendedoresLista.filter((elemento, index, self) =>
  index === self.findIndex((item) => item.id === elemento.id)
);

console.log(compradoresVendedoresLista.length);


for (let index = 0; index < compradores.length; index++) {
  let comprador = compradores[index];
  for (let index1 = 0; index1 < compradoresVendedoresLista.length; index1++) {
    let compradoresVendedoresLista1 = compradoresVendedoresLista[index1];
    if (comprador.id == compradoresVendedoresLista1.id) {
      // somente no lote do comprador e vendedor sera criado esse array
      // observar para colocar uma condicional para os demais, se não vai quebrar o codigo.
      compradoresVendedoresLista1.compras = []
      compradoresVendedoresLista1.compras.listaVendas = []
      compradoresVendedoresLista1.compras.loteComprado = []
      compradoresVendedoresLista1.compras.loteCondicao = []
      compradoresVendedoresLista1.compras.listaVendas = comprador.listaVendas
      compradoresVendedoresLista1.compras.loteComprado = comprador.loteComprado
      compradoresVendedoresLista1.compras.loteCondicao = comprador.loteCondicao
    }
    else {
    }

  }
}



console.log(compradoresVendedoresLista.length);





function Negociacoes() {
  return (
    <main className="negociacoes">
      {vendedores.map(({ loteId, loteLeilao, loteCondicao, nome, rua, numero, estado, bairro }, index) => (
        <section key={index} className="container">
          <img className="logo" src={logo} alt="" />
          <h1 className="title">Relações de Negociações</h1>

          <div className="flex-heading">
            <p className="leilao">Leilão: {loteLeilao.nome}</p>
            <p className="data">Data: {loteLeilao.data}</p>
          </div>

          <div className="dados">
            <p>Nome: {nome}</p>
            <p>Endereço: {rua + numero}</p>
            <p>Bairro: {bairro}</p>
            <p>Estado/Uf: {estado}</p>
          </div>

          <p className="obs">Prezado(a) senhor(a): Apresentamos a seguir, demonstrativo financeiro de seus negócios realizados em {loteLeilao.data} no LEILÃO no {loteLeilao.local}</p>

          <TableComprasVendas loteId={loteId} loteCondicao={loteCondicao} />
          <TableReceberPagar />

        </section>
      ))}
    </main>
  )
}

export default Negociacoes;