import { ofetch } from 'ofetch'

const apiFetch = ofetch.create({
  baseURL: 'http://localhost:3000/api',
})

export default apiFetch
