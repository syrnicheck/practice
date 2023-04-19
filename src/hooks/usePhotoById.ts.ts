import  {  useState } from 'react';
import  { AxiosError } from 'axios';
import { IPhoto } from '../models/IPhoto';
import { axiosInstance } from '../api/pexel';

export function usePhotoById() {
  const [photo, setPhoto] = useState<IPhoto>();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchPhotoById(id: number) {
    try {
     
      const url = `/v1/photos/${id}`;

      setError('')
      setLoading(true);
      const response =await axiosInstance.get<IPhoto>(url);
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