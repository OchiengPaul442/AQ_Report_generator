/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_GRIDS_DATA, GET_REPORT_DATA } from '../urls/urls'
import axios from 'axios'

const ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN

const apiCall = async (url: string, method: string, data?: any) => {
  const response = await axios({
    method,
    url: `${url}?token=${ACCESS_TOKEN}`,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const getGridsData = async () => apiCall(GET_GRIDS_DATA, 'get')

export const getReportData = async (data: any) =>
  apiCall(GET_REPORT_DATA, 'post', data)
