import axios from 'axios'
import type { Files } from '../types'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

export async function joiner({ files } : { files: Files }) {
  const formData = new FormData()
  files.forEach(({ name, file }) => formData.append(name, file))
  return await api.post('/join', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data)
    .catch(err => {
      console.log('Error:', err.response.data || err)
      return err.response.data || err
    })
}