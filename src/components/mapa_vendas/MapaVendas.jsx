import React from "react";
import logo from "../../assets/Logo-Atual-leiloes-163px.png";
import mapaVendas from "./mapaVendas.json";
import "./MapaVendas.css";
import TableMapaVendas from "./TableMapaVendas";

function MapaVendas(){
  return(
    <main className="mapa-vendas">
      <section className="container">
      <img className="logo" src={logo} alt="logo" />
      <h1 className="title">Mapa de Vendas</h1>
      <p className="leilao">Leilao: xxxxx </p>

        <div className="flex-heading">
          <p>Leiloeiro: xxxxx</p>
          <p>YOUTUBE</p>
          <p>Emissão: xxxxx</p>
        </div>

        <TableMapaVendas mapaVendas={mapaVendas} />
          
      </section>
      
    </main>
  )
}

export default MapaVendas;