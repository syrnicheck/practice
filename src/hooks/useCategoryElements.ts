import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { elements } from '../data/elements';
import { IElement } from '../models/IElement';
import { IPageResponseData } from '../models/IPageResposeData';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER, API_KEY } from '../constants/app';


export function useCategoryElements() {
    const [elements, setElements] = useState<IElement[]>([]);
    const [totalResults, setTotalResults] = useState<number>( )
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchCategoryElements(pageNumber?: number,category?: string,  orientation?: string,
         size?: string, pageSize?: number ) {
        try {
            const query = category || "house"
            const page = pageNumber || DEFAULT_PAGE_NUMBER;
            const perPage = pageSize || DEFAULT_PAGE_SIZE;

            const url = `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${perPage}&orientation=${orientation}&size=${size}`;

            setError('')
            setLoading(true);
            const response = await axios.get<IPageResponseData>(url, {
                headers: {
                    'Authorization':  API_KEY
                }
            });
            console.log(response);
            setElements(response.data.photos);
            setTotalResults(response.data.total_results)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError;
            setError(error.message);
            console.log(error.message);
            setLoading(false);
        }
    }

    return {totalResults,  elements, error, loading, fetchCategoryElements }
}