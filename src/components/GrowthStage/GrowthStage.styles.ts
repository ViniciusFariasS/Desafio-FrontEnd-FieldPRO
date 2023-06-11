import styled from "styled-components";

const GrowthStageContainer = styled.div`
    padding: 0;
    margin: 0;

    canvas{
        border: 4px solid #3BACFF;
        padding: 16px 8px;
    }
    .growthStage{
        &__legend{
            display: flex;
            justify-content: center;
            width: 100%;
            height: 80px;
            &--container{
                height: 80px;
                width: 100%;
                ul{
                    display : flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: 0;
                    li{            
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding-top: 2px;
                        list-style: none;
                        margin: 0 16px;
                    }
                }
            }
            &--value{
                color: #000000;                
                font-weight: bold;
                font-size: 32px;
                margin: 0;
                padding: 0;
            }
            &--text{
                color: #C2C2C2;                                           
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