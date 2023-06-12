import styled from "styled-components";

const FilterContainer = styled.div`
    background-color: #FFF;
    padding: 24px;
    border-radius: 16px;        
    display: flex;
    flex-direction: column;
    align-items: start;
    width: auto;
    height: 120px;
    label {
        font-size: 14px;
    }

    @media screen and (max-width: 480px) {
    height: auto;
        form {
            width: 100%;
            display: flex ;
            flex-direction: column;
            align-items: start !important;
        }
        .filter{ 
            &__error{
                margin-top: 16px;
            }
        }
    }


    .filter{
        &__input {
            display: flex;
            flex-direction: column;
            margin: 8px;
            label{
                font-size: 14px;
                margin-bottom: 4px;
                color: #F74D35;
                font-weight: bold;
                padding: 2px;
            }
            input {
                padding: 8px;
                border-style: none;
                border: 1px solid #f2f2f2;
                border-radius: 4px;                
            }
        }
        &__button{
            margin-left: 8px;
            display: flex;
            button {
            margin-top: 24px;
            margin-right: 8px;
            border-style: none;
            color: #FFFFFF;
            border-radius: 4px;
            width: 32px;
            height: 32px;            
            cursor: pointer;
            svg{
                width: 16px;
                height: 16px;
            }
        }
            &--filter{
                background-color: #46D370;
                &:hover{
                    background-color: #468F70;
                }
            }
            &--clean{
                background-color: #F74D35;
                &:hover{
                    background-color: #4C170C;
                }
            }
        }
        &__error{
            font-size: 12px;
            color: red;
            padding: 0 8px 0 16px 
        }
    }
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;
    }

`

export {
    FilterContainer
}