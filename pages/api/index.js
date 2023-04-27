// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {options} from '../../utils'
import axios from 'axios'
export default async function handler(req, res) {
  const result = await axios.request(options)
  res.status(200).json(result.data.Search)
}
