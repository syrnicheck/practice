import { IPhoto } from "./IPhoto";

export interface IPageResponseData {
    total_results: number,
    page: number,
    per_page: number,
    photos: IPhoto[],
    prev_page: string,
    next_page: string
}