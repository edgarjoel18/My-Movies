import {options} from '../../utils'
import axios from 'axios'
export default async function handler(req, res) {
    const { movieTitle } = req.query
    options.params.s = movieTitle
    const result = await axios.request(options)
    res.send(result.data.Search)
  }