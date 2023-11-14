import React from "react";
import logo from "../../assets/Logo-Atual-leiloes-163px.png";
// import negociacoes from "./negociacoes.json";
import TableComprasVendas from "./TableComprasVendas";
import {calculateTotals} from "./MethodNegociacoes"
import "./Negociacoes.css";
import TableReceberPagar from "./TableReceberPagar";

import moment from 'moment'
import { useQuery, useMutation, fetcher, useUpload } from '../../lib/graphql'


const GET_ALL_VENDAS = `
  query{
    getAllVendas{
        id
        avalista
        leilao
        condicao
        valorLance
        numerovenda
        compradores{
          comprador
          porcentagem
        }
        comissaoComprador
        lote
        nomeLeiloeiro
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

const GET_ALL_LEILOES = `
    query {
        getAllLeiloes{
            id
            arroba
            data
            local
            dolar
            nome
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

const GET_ALL_COMISSOES = `
query{
    getAllComissoes{
      id
      nome
    }
}
`
moment.locale('pt-br')
let dateH = ""
dateH = moment().format('LTS');



function ordemCrescente(a, b) {
    if (a.lote < b.lote) {
        return -1;
    }
    if (a.lote > b.lote) {
        return 1;
    }
    return 0;
}









function Negociacoes(){



  const { data: vendas } = useQuery(GET_ALL_VENDAS)
  const { data: leiloes } = useQuery(GET_ALL_LEILOES)
  const { data: lotes } = useQuery(GET_ALL_LOTES)
  const { data: clientes } = useQuery(GET_ALL_CLIENTES)
  const { data: condicoes } = useQuery(GET_ALL_CONDICOES)
  const { data: comissoes } = useQuery(GET_ALL_COMISSOES)

  let listaClientes = []
  if (clientes && clientes.getAllClientes) {
      listaClientes = clientes.getAllClientes.map(item => {
          return {
              id: item.id,
              nome: item.nome,
              cpf: item.cpf,
              rg: item.rg,
              email: item.email,
              telefones: item.telefones,
              nascimento: item.nascimento,
              rua: item.rua,
              numero: item.numero,
              complemento: item.complemento,
              bairro: item.bairro,
              cidade: item.cidade,
              estado: item.estado,
              pais: item.pais,
              cep: item.cep
          }
      })
  }


  let listaComissao = []

  if (comissoes && comissoes.getAllComissoes) {
      listaComissao = comissoes.getAllComissoes.map(item => {
          return {
              id: item.id,
              nome: parseInt(item.nome),
          }
      })
  }



  let listaLotes = []
  if (lotes && lotes.getAllLotes) {





      listaLotes = lotes.getAllLotes.map(item => {
          for (let j = 0; j < listaComissao.length; j++) {
              if (item.comissao == listaComissao[j].id) {
                  item.comissao = listaComissao[j]
              }
          }

          return {
              id: item.id,
              leilao: item.leilao,
              numero: item.numero,
              vendedores: item.vendedores,
              condicao: item.condicao,
              comissaoVendedor: item.comissao,
              variations: item.variations
          }
      })
  }





  let listaCondicoes = []
  if (condicoes && condicoes.getAllCondicoes) {
      listaCondicoes = condicoes.getAllCondicoes.map(item => {
          return {
              id: item.id,
              nome: item.nome,
              parcelas: item.parcelas,
              condicao: parseInt(item.nome.split('x')[0])
          }
      })
  }



  let listaLeiloes = []
  if (leiloes && leiloes.getAllLeiloes) {
      listaLeiloes = leiloes.getAllLeiloes.map(item => {
          return {
              id: item.id,
              arroba: item.arroba,
              data: item.data,
              local: item.local,
              dolar: item.dolar,
              nome: item.nome
          }
      })
  }








  let listaVendas = []

  if (vendas && vendas.getAllVendas) {
      listaVendas = vendas.getAllVendas.map(item => {
          return {

              id: item.id,
              avalista: item.avalista,
              leilao: item.leilao,
              condicao: item.condicao,
              valorLance: parseInt(item.valorLance),
              numerovenda: item.numerovenda,
              compradores: item.compradores,
              comissaoComprador: parseInt(item.comissaoComprador),
              lote: item.lote,
              nomeLeiloeiro: item.nomeLeiloeiro


          }
      })
  }




  let listaCompradores = []



  for (let i = 0; i < listaVendas.length; i++) {
      let loteComprado
      let loteCondicao
      let loteLeilao

      for (let j = 0; j < listaLotes.length; j++) {
          if (listaVendas[i].lote == listaLotes[j].id) {
              loteComprado = listaLotes[j]
          }
      }


      for (let j = 0; j < listaCondicoes.length; j++) {
          // console.log(listaVendas[i].condicao, 'listaVendas[i].condicao')
          if (listaVendas[i].condicao == listaCondicoes[j].id) {
              loteCondicao = listaCondicoes[j]

          }
      }



      for (let j = 0; j < listaLeiloes.length; j++) {
          if (listaVendas[i].leilao == listaLeiloes[j].id) {
              loteLeilao = listaLeiloes[j]
          }
      }



      for (let j = 0; j < listaVendas[i].compradores.length; j++) {

          for (let k = 0; k < listaClientes.length; k++) {

              if (listaVendas[i].compradores[j].comprador == listaClientes[k].id) {
                  listaCompradores.push(

                      {
                          id: listaClientes[k].id,
                          nome: listaClientes[k].nome,
                          cpf: listaClientes[k].cpf,
                          rg: listaClientes[k].rg,
                          email: listaClientes[k].email,
                          telefones: listaClientes[k].telefones,
                          nascimento: listaClientes[k].nascimento,
                          rua: listaClientes[k].rua,
                          numero: listaClientes[k].numero,
                          complemento: listaClientes[k].complemento,
                          bairro: listaClientes[k].bairro,
                          cidade: listaClientes[k].cidade,
                          estado: listaClientes[k].estado,
                          pais: listaClientes[k].pais,
                          cep: listaClientes[k].cep,
                          listaVendas: listaVendas[i],
                          loteComprado: loteComprado,
                          loteCondicao: loteCondicao,
                          loteLeilao: loteLeilao,
                          porcentagemCompra: listaVendas[i].compradores[j].porcentagem
                      }



                  )

              }



          }



      }


  }


  let compradoresDadosLista = []
  for (let i = 0; i < listaCompradores.length; i++) {
      let localizaID = compradoresDadosLista.findIndex(obj => obj.id == listaCompradores[i].id)
      if (localizaID == -1) {
          compradoresDadosLista.push({
              id: listaCompradores[i].id,
              nome: listaCompradores[i].nome,
              cpf: listaCompradores[i].cpf,
              rg: listaCompradores[i].rg,
              email: listaCompradores[i].email,
              telefones: listaCompradores[i].telefones,
              nascimento: listaCompradores[i].nascimento,
              rua: listaCompradores[i].rua,
              numero: listaCompradores[i].numero,
              complemento: listaCompradores[i].complemento,
              bairro: listaCompradores[i].bairro,
              cidade: listaCompradores[i].cidade,
              estado: listaCompradores[i].estado,
              pais: listaCompradores[i].pais,
              cep: listaCompradores[i].cep,
              listaVendas: [listaCompradores[i].listaVendas],
              loteComprado: [listaCompradores[i].loteComprado],
              loteCondicao: [listaCompradores[i].loteCondicao],
              loteLeilao: [listaCompradores[i].loteLeilao],
              porcentagemCompra: parseInt(listaCompradores[i].porcentagemCompra) / 100

          })
      } else {
          compradoresDadosLista[localizaID].listaVendas.push(listaCompradores[i].listaVendas)
          compradoresDadosLista[localizaID].loteComprado.push(listaCompradores[i].loteComprado)
          compradoresDadosLista[localizaID].loteCondicao.push(listaCompradores[i].loteCondicao)
          compradoresDadosLista[localizaID].loteLeilao.push(listaCompradores[i].loteLeilao)
      }
  }





  let listaVendedores = []

  for (let i = 0; i < listaLotes.length; i++) {

      let loteCondicao
      let loteLeilao
      let loteComissao


      for (let t = 0; t < listaComissao.length; t++) {
          if (listaLotes[i].comissao == listaComissao[t].id) {
              loteComissao = listaComissao[t]
          }
      }


      for (let t = 0; t < listaCondicoes.length; t++) {
          if (listaLotes[i].condicao == listaCondicoes[t].id) {
              loteCondicao = listaCondicoes[t]
          }
      }


      for (let t = 0; t < listaLeiloes.length; t++) {
          if (listaLotes[i].leilao == listaLeiloes[t].id) {
              loteLeilao = listaLeiloes[t]
          }
      }





      for (let j = 0; j < listaLotes[i].vendedores.length; j++) {

          for (let k = 0; k < listaClientes.length; k++) {

              if (listaLotes[i].vendedores[j].vendedor == listaClientes[k].id) {

                  listaVendedores.push(
                      {
                          id: listaClientes[k].id,
                          nome: listaClientes[k].nome,
                          cpf: listaClientes[k].cpf,
                          rg: listaClientes[k].rg,
                          email: listaClientes[k].email,
                          telefones: listaClientes[k].telefones,
                          nascimento: listaClientes[k].nascimento,
                          rua: listaClientes[k].rua,
                          numero: listaClientes[k].numero,
                          complemento: listaClientes[k].complemento,
                          bairro: listaClientes[k].bairro,
                          cidade: listaClientes[k].cidade,
                          estado: listaClientes[k].estado,
                          pais: listaClientes[k].pais,
                          cep: listaClientes[k].cep,
                          porcentagemVenda: parseInt(listaLotes[i].vendedores[j].porcentagem) / 100,
                          leilao: listaLotes[i].leilao,
                          loteId: listaLotes[i].id,
                          loteNumero: listaLotes[i].numero,
                          condicao: listaLotes[i].condicao,
                          comissao: listaLotes[i].comissao,
                          variations: listaLotes[i].variations,
                          loteCondicao: loteCondicao,
                          loteLeilao: loteLeilao,
                          loteComissao: loteComissao,
                      }



                  )
              }

          }

      }


  }




  let vendedoresDadosLista = []
  for (let i = 0; i < listaVendedores.length; i++) {
      let localizaID = vendedoresDadosLista.findIndex(obj => obj.id == listaVendedores[i].id)


      let loteVendido


      for (let j = 0; j < listaLotes.length; j++) {
          if (listaVendedores[i].loteId == listaLotes[j].id) {
              loteVendido = listaLotes[j]
          }
      }




      if (localizaID == -1) {
          vendedoresDadosLista.push({

              id: listaVendedores[i].id,
              nome: listaVendedores[i].nome,
              cpf: listaVendedores[i].cpf,
              rg: listaVendedores[i].rg,
              email: listaVendedores[i].email,
              telefones: listaVendedores[i].telefones,
              nascimento: listaVendedores[i].nascimento,
              rua: listaVendedores[i].rua,
              numero: listaVendedores[i].numero,
              complemento: listaVendedores[i].complemento,
              bairro: listaVendedores[i].bairro,
              cidade: listaVendedores[i].cidade,
              estado: listaVendedores[i].estado,
              pais: listaVendedores[i].pais,
              cep: listaVendedores[i].cep,
              porcentagemVenda: listaVendedores[i].porcentagemVenda,
              leilao: listaVendedores[i].leilao,
              loteId: [loteVendido],
              loteNumero: listaVendedores[i].loteNumero,
              condicao: listaVendedores[i].condicao,
              comissao: listaVendedores[i].comissao,
              variations: listaVendedores[i].variations,
              loteCondicao: [listaVendedores[i].loteCondicao],
              loteLeilao: listaVendedores[i].loteLeilao,
              loteComissao: listaVendedores[i].loteComissao,
















          })
      } else {
          // vendedoresDadosLista[localizaID].listaVendas.push(listaVendedores[i].listaVendas)
          vendedoresDadosLista[localizaID].loteId.push(loteVendido)
          vendedoresDadosLista[localizaID].loteCondicao.push(listaVendedores[i].loteCondicao)
          // vendedoresDadosLista[localizaID].loteLeilao.push(listaVendedores[i].loteLeilao)
      }
  }



  console.log(vendedoresDadosLista, "vendedoresDadosLista")

  console.log(compradoresDadosLista, 'compradoresDadosLista')


  let negociacoes
  negociacoes = compradoresDadosLista


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