import  {  useState } from 'react';
import axios, { AxiosError } from 'axios';
import { IElement } from '../models/IElement';
import {  API_KEY } from '../constants/app';


export function useElementById() {
  const [element, setElement] = useState<IElement>();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchElementById(id: number) {
    try {
     
      const url = `https://api.pexels.com/v1/photos/${id}`;

      setError('')
      setLoading(true);
      const response = await axios.get<IElement>(url, {
        headers: {
          'Authorization': API_KEY
        }
      });
      console.log(response);
      setElement(response.data);
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
      setLoading(false);
    }
  }

  return { element, error, loading, fetchElementById }
}