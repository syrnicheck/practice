import  {  useState } from 'react';
import  { AxiosError } from 'axios';
import { IPhoto } from '../models/IPhoto';
import { IPageResponseData } from '../models/IPageResponseData';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from '../constants/app';
import { axiosInstance } from '../api/pexel';

export function usePhotos() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [error, setError] = useState('')

  async function fetchPhotos(pageNumber?: number, pageSize?: number) {
    try {
      const page = pageNumber || DEFAULT_PAGE_NUMBER;
      const perPage = pageSize || DEFAULT_PAGE_SIZE;

      const url = `/v1/curated?page=${page}&per_page=${perPage}`;

      setError('')
      const response =await axiosInstance.get<IPageResponseData>(url);
      setPhotos(response.data.photos);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  }

  return { photos,  error, fetchPhotos }
}