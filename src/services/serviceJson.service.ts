import { IGrowthStage } from "../pages/home/Home.interface";
import { IAPIResponse } from "../utils/global.interface";
import { api } from "./api.service";

const getGrowthStage: Promise<IAPIResponse<IGrowthStage>> = api.get("alexanderboliva/test/main/api_example.json");

export {
    getGrowthStage
}