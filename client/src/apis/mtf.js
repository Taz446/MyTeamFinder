import axios from "axios";

export default axios.create({
    baseURL: 'https://heroku-myteamfinderapp.herokuapp.com/api/v1'
});