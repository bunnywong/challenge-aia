import Axios from 'axios'

const axios = (baseURL) => {
  return Axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
  })
}

export default axios()
