import  {  useState } from 'react';
import axios, { AxiosError } from 'axios';
import { IElement } from '../models/IElement';
import { IPageResponseData } from '../models/IPageResponseData';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER, API_KEY } from '../constants/app';


export function useElements() {
  const [elements, setElements] = useState<IElement[]>([]);
  const [error, setError] = useState('')

  async function fetchElements(pageNumber?: number, pageSize?: number) {
    try {
      const page = pageNumber || DEFAULT_PAGE_NUMBER;
      const perPage = pageSize || DEFAULT_PAGE_SIZE;

      const url = `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`;

      setError('')
      const response = await axios.get<IPageResponseData>(url, {
        headers: {
          'Authorization': API_KEY
        }
      });
      console.log(response);
      setElements(response.data.photos);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  }

  return { elements,  error, fetchElements }
}