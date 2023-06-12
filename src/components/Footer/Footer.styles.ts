import { styled } from "styled-components";

const FooterContainer = styled.footer`
    background-color: #F74D35;
    padding: 20px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;


    @media screen and (max-width: 480px) {
        width: 100%;
        position: fixed;
        bottom: 0;
        padding: 8px;    
        img{
            width: 120px;            
        }
    }
        .footer{
            &__content{
                display: flex;
                justify-content: center;                
          }
    } 
`;

export {
    FooterContainer
}