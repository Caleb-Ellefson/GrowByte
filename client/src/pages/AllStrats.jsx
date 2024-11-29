import React from 'react'
import { redirect, useLoaderData,} from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
 
export const loader = async () => {
    try {
      const { data } = await customFetch.get('/strats')
        console.log(data)
      return {data} 
      
    } catch (error) {
      toast.error('error')
      return redirect('/')
    }
  }

const AllStrats = () => {
  return (
    <div>hello</div>
  )
}

export default AllStrats