import React from "react";
import Relatorios from './components/relatorios/Relatorios';
import Error404 from "./components/error/Error404.JSX";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./components/login/Login";

function RoutesElement() {
  const location = useLocation();

  React.useEffect(() => {
    const linkPrint = document.createElement("link");
    linkPrint.rel = "stylesheet";

    if (location.pathname === "/relatorios/mapavendas") {
      linkPrint.setAttribute("href", "/src/components/mapa_vendas/MapaPrint.css");
    } else if (location.pathname === "/relatorios/negociacoes") {
      linkPrint.setAttribute("href", "/src/components/negociacoes/NegociacoesPrint.css");
    }

    document.head.appendChild(linkPrint);

    return () => {
      document.head.removeChild(linkPrint);
    };
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<Login/>}/>
      <Route path='/relatorios/*' element={<React.Fragment> <Header/> <Relatorios/> </React.Fragment>} />
      <Route path='*' element={<Error404/>} />
    </Routes>
  );
}

export default RoutesElement;
