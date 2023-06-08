import styled from "styled-components";

const HomeContainer = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F5F5F5;
    .home{
        &__content{
            &--title{
            padding-bottom: 24px;
            border-bottom: solid 3px #E7E7E7;
        }
            width: 1000px;
            border-radius: 16px;
            padding: 16px;
            background-color: #FFFFFF;
        }
    }
`

export {
    HomeContainer
}