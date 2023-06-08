export interface IGrowthStageProps {
    data?: Array<IGrowthStageDataset>
    labels?: Array<string>
}

export interface IGrowthStageDataset {
    label: string
    data: Array<any>
}