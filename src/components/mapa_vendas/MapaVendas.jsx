import React from "react";
import logo from "../../assets/Logo-Atual-leiloes-163px.png";
// import mapaVendas from "./mapaVendas.json";
import "./MapaVendas.css";
import TableMapaVendas from "./TableMapaVendas";
import { useQuery, useMutation, fetcher, useUpload } from '../../lib/graphql'




import moment from 'moment'



function compare(a, b) {
  if (a.numLote < b.numLote) {
    return -1;
  }
  if (a.numLote > b.numLote) {
    return 1;
  }
  return 0;
}


let mapaVendas

const GET_ALL_VENDAS = `
  query{
    getAllVendas{
      id
      numerovenda
      leilao
      lote
      nomeLeiloeiro
      valorLance
      avalista
      compradores{
        comprador
        porcentagem
      }
      comissaoComprador
      condicao
    }
  }
`

const GET_ALL_CLIENTES = `
  query {
    getAllClientes{
      id
      nome
      cpf
      rg
      email
      telefones{
        telefone
      }
      nascimento
      rua
      numero
      complemento
      bairro
      cidade
      estado
      pais
      cep
    }
  }
`

const GET_ALL_CONDICOES = `
query {
  getAllCondicoes{
    id
    nome
    parcelas{
      parcela
    }
  }
}
`

const GET_ALL_COMISSOES = `
  query{
    getAllComissoes{
      id
      nome
    }
  }
`


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
const GET_ALL_LOTES = `
  query{
    
    getAllLotes{
      id
      leilao
      numero
      vendedores{
        vendedor
        porcentagem
      }
      condicao
      comissao
      variations{
        nome
        nascimento
        sexo
        pelagem
        porcentagem
        raca
      }
    }
    


  }
`

const GET_ALL_RACAS = `
query{
  getAllRacas {
    id
    nome
  }
}
`
moment.locale('pt-br')
let dateH = ""
dateH = moment().format('LTS');

let compradores2 = []






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


  const { data: vendas } = useQuery(GET_ALL_VENDAS)
  const { data: lotes } = useQuery(GET_ALL_LOTES)
  const { data: condicoes } = useQuery(GET_ALL_CONDICOES)
  const { data: comissoes } = useQuery(GET_ALL_COMISSOES)
  const { data: clientes } = useQuery(GET_ALL_CLIENTES)
  const { data: racas } = useQuery(GET_ALL_RACAS)



  let totalComissaoVendedor = 0
  let totalComissaoComprador = 0

  let listaComissoes = []
  if (comissoes && comissoes.getAllComissoes) {
    listaComissoes = comissoes.getAllComissoes.map(item => {

      return {
        id: item.id,
        label: item.nome
      }
    })
  }


  let listaLotes = []
  if (lotes && lotes.getAllLotes) {
    listaLotes = lotes.getAllLotes.map(item => {
      return {
        id: item.id,
        lote: item.numero,
        comissao: item.comissao,
        numVendedores: item.vendedores.length,
        numAnimais: item.variations.length,
        listaID_Vendedores: item.vendedores,
        listaID_Animais: item.variations
      }
    })
  }
  let total = 0


  let listaCondicoes = []
  if (condicoes && condicoes.getAllCondicoes) {
    listaCondicoes = condicoes.getAllCondicoes.map(item => {

      return {
        id: item.id,
        label: item.nome
      }
    })
  }



  let listaRacas = []
  if (racas && racas.getAllRacas) {
    listaRacas = racas.getAllRacas.map(item => {

      return {
        id: item.id,
        nome: item.nome
      }
    })
  }



  let listaClientes = []
  if (clientes && clientes.getAllClientes) {
    listaClientes = clientes.getAllClientes.map(item => {
      return {
        id: item.id,
        nome: item.nome
      }
    })
  }

  let nomeLeiloeiro = ""
  let listaVendas = []
  if (vendas && vendas.getAllVendas) {
    listaVendas = vendas.getAllVendas.map(item => {
      let condicaoMultiplica = ''
      nomeLeiloeiro = item.nomeLeiloeiro
      for (let i = 0; i < listaCondicoes.length; i++) {
        if (item.condicao == listaCondicoes[i].id) {
          condicaoMultiplica = parseInt(listaCondicoes[i].label.split("x")[0])

        }
      }


      let condicaoMultiplicaAnimais = ''
      let numLote = ""
      let vendedor = []
      let comissaoVend = ""
      let animais = []
      for (let i = 0; i < listaLotes.length; i++) {
        if (item.lote == listaLotes[i].id) {
          condicaoMultiplicaAnimais = parseInt(listaLotes[i].numAnimais)
          numLote = listaLotes[i].lote
          // vendedor = listaLotes[i].listaID_Vendedores[0].vendedor
          vendedor = listaLotes[i].listaID_Vendedores
          animais = listaLotes[i].listaID_Animais
          comissaoVend = listaLotes[i].comissao

        }

        // console.log(vendedor, "vendedor")

      }


      let qntAnimalSexoF = 0
      let qntAnimalSexoM = 0
      let qntAnimalSexoT = 0
      let animalRaca = ""
      for (let i = 0; i < animais.length; i++) {
        if (animais[i].sexo === "F") {
          qntAnimalSexoF = qntAnimalSexoF + 1
        }
        if (animais[i].sexo === "M") {
          qntAnimalSexoM = qntAnimalSexoM + 1
        }
        if (animais[i].sexo === "T") {
          qntAnimalSexoT = qntAnimalSexoT + 1
        }
        animalRaca = animais[i].raca


      }

      for (let i = 0; i < listaRacas.length; i++) {
        if (animalRaca == listaRacas[i].id) {
          animalRaca = listaRacas[i].nome
        }
      }
      // console.log(comissaoVend, "comissaoVend")

      let multi = item.valorLance * condicaoMultiplica * condicaoMultiplicaAnimais
      total = total + multi
      let nomeVendedor = ''
      // console.log(vendedor, "venddddedor")
      for (let i = 0; i < listaClientes.length; i++) {
        if (vendedor == listaClientes[i].id) {
          nomeVendedor = listaClientes[i].nome
        }
      }



      let nomeVendedorFinal = []


      for (let j = 0; j < vendedor.length; j++) {
        for (let i = 0; i < listaClientes.length; i++) {
          if (vendedor[j].vendedor == listaClientes[i].id) {
            let tesst = {}
            tesst.nome = listaClientes[i].nome
            tesst.porcentagem = vendedor[j].porcentagem

            nomeVendedorFinal.push(tesst)
          }
        }
      }






      let nomeCompradorFinal = []

      // console.log(item.compradores)
      // item.compradores
      for (let j = 0; j < item.compradores.length; j++) {
        for (let i = 0; i < listaClientes.length; i++) {
          if (item.compradores[j].comprador == listaClientes[i].id) {
            let tesst = {}
            tesst.nome = listaClientes[i].nome
            tesst.porcentagem = item.compradores[j].porcentagem

            nomeCompradorFinal.push(tesst)
          }
        }
      }

      let totalAnimais = qntAnimalSexoF + qntAnimalSexoM + qntAnimalSexoT



      for (let i = 0; i < listaComissoes.length; i++) {
        if (comissaoVend == listaComissoes[i].id) {
          comissaoVend = listaComissoes[i].label
        }
      }









      return {
        id: item.id,
        numerovenda: item.numerovenda,
        leilao: item.leilao,
        lote: item.lote,
        valorLance: item.valorLance,
        avalista: item.avalista,
        comprador: nomeCompradorFinal,
        comissaoComprador: item.comissaoComprador,
        condicao: item.condicao,
        valorTotal: item.valorLance * condicaoMultiplica * condicaoMultiplicaAnimais,
        numLote: numLote,
        vendedor: nomeVendedorFinal,
        animais: animais,
        qntAnimalSexoF: qntAnimalSexoF,
        qntAnimalSexoM: qntAnimalSexoM,
        qntAnimalSexoT: qntAnimalSexoT,
        animalRaca: animalRaca,
        totalAnimais: totalAnimais,
        condicaoMultiplica: condicaoMultiplica,
        comissaoVend: comissaoVend

      }

    })
  }



  let compradores = []


  let nome = ""
  let valor = ""

  let nome1 = ""
  let totalVendas = 0



  for (let i = 0; i < listaVendas.length; i++) {
    for (let j = 0; j < listaClientes.length; j++) {
      if (listaVendas[i].comprador == listaClientes[j].id) {


        geradorCores().then((res) => {
          var compradores1 = {}
          nome = listaClientes[j].label
          valor = [listaVendas[i].valorTotal]
          compradores1.id = listaVendas[i].comprador
          compradores1.nome = nome
          compradores1.data = valor

          compradores1.borderColor = res.rgb
          compradores1.backgroundColor = res.rgba
          compradores.push(compradores1)
          compradores2 = compradores

        })
      }
    }
    totalVendas = listaVendas[i].valorTotal + totalVendas

    totalComissaoComprador = (listaVendas[i].valorTotal * (parseInt(listaVendas[i].comissaoComprador) / 100)) + totalComissaoComprador
    totalComissaoVendedor = (listaVendas[i].valorTotal * (parseInt(listaVendas[i].comissaoVend) / 100)) + totalComissaoVendedor

  }

  let totalGeralComissao = totalComissaoComprador + totalComissaoVendedor
  listaVendas.sort(compare);
  // console.log(totalComissaoVendedor)


  mapaVendas = listaVendas
  console.log(mapaVendas)


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


        {mapaVendas && (
          <TableMapaVendas mapaVendas={mapaVendas} />
        )
        }
      </section>

    </main>
  )
}

export default MapaVendas;