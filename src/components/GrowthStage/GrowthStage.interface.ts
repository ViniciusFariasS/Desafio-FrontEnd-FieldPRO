export interface IGrowthStageProps {
    data: Array<IGrowthStageDataset>
    labels: Array<string>
    title?: string
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

export enum EColorsTransparecy {
    "#79DED510",
    "#F67A6010",
    "#3A99C410"
}