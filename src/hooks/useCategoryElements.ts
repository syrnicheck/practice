import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { elements } from '../data/elements';
import { IElement } from '../models/IElement';
import { IPageResponseData } from '../models/IPageResposeData';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from '../constants/app';


export function useCategoryElements() {
    const [elements, setElements] = useState<IElement[]>([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchCategoryElements(pageNumber?: number, pageSize?: number, category?: string) {
        try {
            const query = category || "house"
            const page = pageNumber || DEFAULT_PAGE_NUMBER;
            const perPage = pageSize || DEFAULT_PAGE_SIZE;

            const url = `https://api.pexels.com/v1/search?query=${query}`;

            setError('')
            setLoading(true);
            const response = await axios.get<IPageResponseData>(url, {
                headers: {
                    'Authorization': `${process.env.API_KEY}`
                }
            });
            console.log(response);
            setElements(response.data.photos);
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError;
            setError(error.message);
            console.log(error.message);
            setLoading(false);
        }
    }

    return { elements, error, loading, fetchCategoryElements }
}