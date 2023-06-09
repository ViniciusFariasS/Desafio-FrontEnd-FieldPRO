import { styled } from "styled-components";

const HeaderContainer = styled.div` 
    background-color: #2E323B;
    padding: 20px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    .header{
        &__content{
            display: flex;
            justify-content: start;
            align-items: center;
            width: 1000px;
        }
    }
`

export {
    HeaderContainer
}