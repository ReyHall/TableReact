import React from "react";
import logo from "../../assets/Logo-Atual-leiloes-163px.png";
import mapaVendas from "./mapaVendas.json";
import "./MapaVendas.css";
import TableMapaVendas from "./TableMapaVendas";
import { useQuery, useMutation, fetcher, useUpload } from '../../lib/graphql'

function MapaVendas() {


  const GET_ALL_LEILOES = `
    query {
      getAllLeiloes{
        id
        nome
        local
        data
      }
    }
  `
  const { data } = useQuery(GET_ALL_LEILOES)


  // console.log(data.getAllLeiloes[0].nome)
  // let leilaoNome = ''

  //   leilaoNome = data.getAllLeiloes.nome
  // }


  return (
    <main className="mapa-vendas">
      <section className="container">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="title">Mapa de Vendas</h1>


        {data && data.getAllLeiloes && (
          <>
            <p className="leilao">Leilao: {data.getAllLeiloes[0].nome} </p>

            <div className="flex-heading">
              <p>Leiloeiro: xxxxx</p>
              <p>Local: {data.getAllLeiloes[0].local}</p>
              <p>Emissão: {data.getAllLeiloes[0].data}</p>
            </div>
          </>


        )}


        {/* {data && data.getAllLeiloes || <p className="leilao">Leilao: {data.getAllLeiloes.nome} </p>} */}



        <TableMapaVendas mapaVendas={mapaVendas} />

      </section>

    </main>
  )
}

export default MapaVendas;