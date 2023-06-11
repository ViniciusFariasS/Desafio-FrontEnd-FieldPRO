import React from 'react';
import { HeaderContainer } from './Header.styles';
import logo from "../../assets/logo.png"

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <div className="header__content">
                <img src={logo} alt="logo FieldPro" />
                <h1>Desafio FrontEnd</h1>
            </div>
        </HeaderContainer>
    );
};

export { Header };