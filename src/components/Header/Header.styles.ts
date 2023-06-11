import { styled } from "styled-components";

const HeaderContainer = styled.div` 
    background-color: #2E323B;
    padding: 20px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 8px;    
        h1{
            font-size: 16px !important;
            margin-right: 16px;
            color:#C43710;
        }
        img{
            width: 120px;
        }
    }

    .header{
        &__content{
            display: flex;
            justify-content: start;
            align-items: center;
            width: 1000px;
            h1{
                font-size: 24px;
                margin-right: 16px;
                color:#C43710;
            }
        }
    }
`

export {
    HeaderContainer
}