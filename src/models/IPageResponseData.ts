import { IElement } from "./IElement";

export interface IPageResponseData {
    total_results: number,
    page: number,
    per_page: number,
    photos: IElement[],
    prev_page: string,
    next_page: string
}