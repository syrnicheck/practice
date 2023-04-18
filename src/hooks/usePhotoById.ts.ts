import  {  useState } from 'react';
import axios, { AxiosError } from 'axios';
import { IPhoto } from '../models/IPhoto';
import {  API_KEY } from '../constants/app';


export function usePhotoById() {
  const [photo, setPhoto] = useState<IPhoto>();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchPhotoById(id: number) {
    try {
     
      const url = `https://api.pexels.com/v1/photos/${id}`;

      setError('')
      setLoading(true);
      const response = await axios.get<IPhoto>(url, {
        headers: {
          'Authorization': API_KEY
        }
      });
      console.log(response);
      setPhoto(response.data);
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
      setLoading(false);
    }
  }

  return { photo, error, loading, fetchPhotoById }
}