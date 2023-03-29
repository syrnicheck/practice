import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { elements } from '../data/elements';
import { IElement } from '../models/IElement';
import { IPageResponseData } from '../models/IPageResposeData';

export function useElements() {
  const [query, setQuery] = useState("house");
  const [perPage, setPerPage] = useState(1);
  const [elements, setElements] = useState<IElement[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const url = `https://api.pexels.com/v1/curated?page=${perPage}}`;
  const access_token = '563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf';

  async function fetchElements() {
    try {
      setError('')
      setLoading(true);
      const response = await axios.get<IPageResponseData>(url, {
        headers: {
          'Authorization': `${access_token}`
        }
      });
      console.log(response);

      setElements(response.data.photos);
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchElements()
  }, [])

  return { elements, error, loading }
}