import React from "react";
import logo from "../../assets/Logo-Atual-leiloes-163px.png";
import negociacoes from "./negociacoes.json";
import TableComprasVendas from "./TableComprasVendas";
import {calculateTotals} from "./MethodNegociacoes"
import "./Negociacoes.css";
import TableReceberPagar from "./TableReceberPagar";

function Negociacoes(){
  return (
    <main className="negociacoes">
      {negociacoes.map(({loteLeilao, loteComprado, listaVendas, loteCondicao, nome, rua, numero, bairro, estado}, index) =>(
        <section key={index} className="container">
          <img className="logo" src={logo} alt="logo" />
          <h1 className="title">Relações de Negociações</h1>

          <div className="flex-heading">
            <p className="leilao">Leilão: {loteLeilao[0].nome}</p>
            <p className="data">Data: {loteLeilao[0].data}</p>
          </div>
          
          <div className="dados">
            <p>Nome: {nome}</p>
            <p>Endereço: {rua + numero}</p>
            <p>Bairro: {bairro}</p>
            <p>Estado/Uf: {estado}</p>
          </div>

          <p className="obs">Prezado(a) senhor(a):<br/> Apresentamos a seguir, demonstrativo financeiro de seus negócios realizados em {loteLeilao[0].data} no LEILÃO no {loteLeilao[0].local}</p>

          <TableComprasVendas loteComprado={loteComprado} listaVendas={listaVendas} loteCondicao={loteCondicao} />
          <TableReceberPagar listaVendas={listaVendas} loteComprado={loteComprado} loteCondicao={loteCondicao} />
        </section>
      ))}
    </main>
  )
}

export default Negociacoes;