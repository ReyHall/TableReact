import React from "react";

function CompradorStatus({ compradores }) {
  return (
    <div className="status">
      <h2>Comprador</h2>
      <p>Nome: {compradores[0].comprador.nome}</p>
      <p>Endereço: {compradores[0].comprador.rua}</p>
      <p>Bairro: {compradores[0].comprador.bairro + " " + compradores[0].comprador.numero}</p>
      <p>Telefones: {compradores[0].comprador.telefones.map((tel) => tel.telefone).join(" / ")}</p>
      <p>CPF/CPNJ: {compradores[0].comprador.cpf}</p>
    </div>
  )
}

export default CompradorStatus;