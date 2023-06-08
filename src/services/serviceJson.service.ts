import { IServiceJson } from "../pages/home/Home.interface";
import { IAPIResponse } from "../utils/global.interface";
import { api } from "./api.service";

const getServiceJson: Promise<IAPIResponse<IServiceJson>> = api.get("alexanderboliva/test/main/api_example.json");

export {
    getServiceJson
}