import { styled } from "styled-components";

const FooterContainer = styled.footer`
    background-color: #F74D35;
    padding: 20px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 8px;    
        img{
            width: 120px;
        }
    }
        .footer{
            &__content{
                display: flex;
                justify-content: end;
                width: 1000px;
          }
  }
`;

export {
  FooterContainer
}