import React from "react";
import { Route, Routes } from "react-router-dom";
import MapaVendas from "../mapa_vendas/MapaVendas";
import RelatoriosList from "./RelatoriosList";
import Negociacoes from "../negociacoes/Negociacoes";
import FaturaComprador from "../faturacomprador/FaturaComprador";

function Relatorios(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<RelatoriosList />}/>
        <Route path="mapavendas" element={<MapaVendas />}/>
        <Route path="negociacoes" element={<Negociacoes />} />
        <Route path="faturacomprador" element={<FaturaComprador />} />
      </Routes>
    </div>
  )
}

export default Relatorios;