import axios from 'axios';
import config from '../config';

// const url = config.apiUrl;
const url = 'http://15.228.241.174:8000';
// const url = 'http://localhost:8000';

export default class Api {

    get(endpoint: string) {
        const resourceURL = `${url}/${endpoint}`;
        console.log(resourceURL);
        return axios.get(resourceURL);
    }
}