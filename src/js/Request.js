import axios from 'axios'

export default function sendGet(url, params = {}) {
	return axios.get(url, {
        params: params,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}
