import axios from 'axios';

const myApiKey = "58757401-c6d97c3ff5afcdac96170ae1a";
export const perPage = 15;
export const getImagesByQuery = async (query, page) => {
    const response = await axios.get(`https://pixabay.com/api/`, {
        params: {
            key: myApiKey,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: page,
            per_page: perPage,
        }
    }); return response.data
}