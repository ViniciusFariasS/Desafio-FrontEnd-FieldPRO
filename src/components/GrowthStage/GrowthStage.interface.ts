export interface IGrowthStageProps {
    data?: Array<IGrowthStageDataset>
    labels?: Array<string>
    title: string
}

export interface IGrowthStageDataset {
    label: string
    data: Array<any>
    decimal: boolean
    type?: string
}

export enum EColors {
    "#79DED5",
    "#F67A60",
    "#3A99C4"
}

export enum EColorsGradient {
    "hsl(175, 60%, 67%,0.1)",
    "hsl(10, 89%, 67%, 0.1)",
    "hsl(199, 54%, 50%, 0.1)",
}