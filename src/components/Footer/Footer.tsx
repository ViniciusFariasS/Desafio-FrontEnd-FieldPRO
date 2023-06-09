import { FooterContainer } from "./Footer.styles";
import logoWhite from "../../assets/logo-white.png";

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <div className="footer__content">
                <img src={logoWhite} alt="logo fieldPro branco" />
            </div>
        </FooterContainer>
    );
};

export {
    Footer
}