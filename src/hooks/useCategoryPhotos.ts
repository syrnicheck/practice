import React, { useState } from 'react';
import  { AxiosError } from 'axios';
import { IPhoto } from '../models/IPhoto';
import { IPageResponseData } from '../models/IPageResponseData';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from '../constants/app';
import { axiosInstance } from '../api/pexel';

export function useCategoryPhotos() {
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [totalResults, setTotalResults] = useState<number>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchCategoryPhotos(pageNumber?: number, category?: string, orientation?: string,
        size?: string, pageSize?: number) {
        try {
            const query = category;
            const page = pageNumber || DEFAULT_PAGE_NUMBER;
            const perPage = pageSize || DEFAULT_PAGE_SIZE;

            const url = `/v1/search?query=${query}&page=${page}&per_page=${perPage}&orientation=${orientation}&size=${size}`;

            setError('')
            setLoading(true);
            const response =await axiosInstance.get<IPageResponseData>(url);
            setPhotos(response.data.photos);
            setTotalResults(response.data.total_results)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError;
            setError(error.message);
            setLoading(false);
        }
    }

    return { totalResults, photos, error, loading, fetchCategoryPhotos }
}