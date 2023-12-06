import React from "react";

function VendedorStatus({ vendedores }) {
  return (
    <div className="status">
      <h2>Vendedor</h2>
      <p>Nome: {vendedores[0].vendedor.nome}</p>
      <p>Endereço: {vendedores[0].vendedor.rua + " " + vendedores[0].vendedor.numero}</p>
      <p>Bairro: {vendedores[0].vendedor.bairro}</p>
      <p>Telefones: {vendedores[0].vendedor.telefones.map((tel) => tel.telefone).join(" / ")}</p>
      <p>CPF/CNPJ: {vendedores[0].vendedor.cpf}</p>
    </div>
  )
}

export default VendedorStatus;