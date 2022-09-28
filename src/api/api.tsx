import axios from 'axios';
import config from '../config';

const url = config.apiUrl;

export default class Api {

    get(endpoint: string) {
        const resourceURL = `${url}/${endpoint}`;
        console.log(resourceURL);
        return axios.get(resourceURL);
    }
}