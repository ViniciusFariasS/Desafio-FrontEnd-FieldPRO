import styled from "styled-components";

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #F5F5F5;
    margin-top: 24px;
    margin-bottom: 24px;
    .home{
        &__filter{            
            padding: 0;
            margin-bottom: 16px;
            width: 1000px;                   
        }
        &__content{
            display: flex;
            flex-direction: column;
            border-radius: 16px;            
            background-color: #FFFFFF;            
            padding: 24px;
            width: 952px;
            &--title{
                padding-bottom: 24px;
                border-bottom: solid 3px #E7E7E7;
            }
        }
        &__pagination{
            width: 1000px;
            display: flex;
            justify-content: end;
            margin-top: 24px;
            select{
                border-style: none;
                background-color: transparent;
                border-radius: 4px;
                &:hover{
                    background-color: #E2E2E2;
                    cursor: pointer;
                }
            }
        }
        
    }
`

export {
    HomeContainer
}