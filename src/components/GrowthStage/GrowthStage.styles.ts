import styled from "styled-components";

const GrowthStageContainer = styled.div`
    padding: 0;
    margin: 0;
    ul{
        li{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 2px;
            list-style: none;
        }
    }
    .growthStage{
        &__legend{
            display: flex;
            justify-content: center;
            width: 100%;
            &--container{
                width: 100%;
            }
            &--value{
                color: "#000000";                
                font-weight: bold;
                font-size: 32px;
                margin: 0;
                padding: 0;
            }
            &--text{
                color: "#C2C2C2";                                           
                margin: 0;
                padding: 0;
            }
        }
        &__loading{
            
            display: flex;
            justify-content: center;
        }
    }
`

export {
    GrowthStageContainer
}