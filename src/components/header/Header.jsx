import React from "react";
import {AiOutlineBell, AiFillHome, AiOutlineBars} from "react-icons/ai"; 
import {BiSolidRightArrow} from "react-icons/bi";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useQuery } from '../../lib/graphql'

const GET_ME = `
    query {
      panelGetMe{
        id
        name
        email
        role
      }
    }
  `




function Header(){
  const [isSidebar, setIsSidebar] = React.useState(true);
  const body = document.body; 
  const { data } = useQuery(GET_ME)


  React.useEffect(() =>{
    function resize(){
      if(window.innerWidth <= 1200){
        setIsSidebar(false);
        body.classList.remove("true");
      }
    }

    window.addEventListener("resize", resize);
    return () =>{
      window.removeEventListener("resize", resize);
    }
  }, [])

  React.useEffect(() =>{
    isSidebar ? body.classList.add("true") : body.classList.remove("true");
  }, [isSidebar])

  return(
    <header className="header">
      <AiOutlineBars onClick={() => setIsSidebar(!isSidebar)} className="bars" id="bars-btn" />
      <AiOutlineBell className="bell" style={{marginLeft: "auto", marginRight: "1rem"}} />
      <button type="button"></button>

      <nav className={"sidebar " + isSidebar}>
        <h3>AtualSistema</h3>
        <NavLink to={"/dashboard"}><AiFillHome className="icons-sidebar" />Home</NavLink>
        <NavLink to={"/leiloes"}><BiSolidRightArrow className="icons-sidebar" />Leilões</NavLink>
        <NavLink to={"/condicoes"}><BiSolidRightArrow className="icons-sidebar"/>Condições</NavLink>
        <NavLink to={"/comissoes"}><BiSolidRightArrow className="icons-sidebar"/>Comissões</NavLink>
        <NavLink to={"/lotes"}><BiSolidRightArrow className="icons-sidebar"/>Lotes</NavLink>
        <NavLink to={"/vendas"}><BiSolidRightArrow className="icons-sidebar"/>Vendas</NavLink>
        <NavLink to={"/clientes"}><BiSolidRightArrow className="icons-sidebar"/>Clientes</NavLink>
        <NavLink to={"/especies"}><BiSolidRightArrow className="icons-sidebar"/>Espécies</NavLink>
        <NavLink to={"/racas"}><BiSolidRightArrow className="icons-sidebar"/>Raças</NavLink>
        <NavLink to={"/usuarios"}><BiSolidRightArrow className="icons-sidebar"/>Usuarios</NavLink>
        <NavLink to={"/relatorios"}><BiSolidRightArrow className="icons-sidebar"/>Relatórios</NavLink>
      </nav>
    </header>
  )
}

export default Header;