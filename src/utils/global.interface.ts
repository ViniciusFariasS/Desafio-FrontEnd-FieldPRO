export interface IAPIResponse<T> {
    config: any;
    data: Array<T>;
    headers: any;
    request: any;
    status: number;
    statusText: string;
}