import axios from "axios";

 const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,

  
});

const titleToSlug = (title) => {
    return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")  // remove special characters
    .replace(/\s+/g, "-"); // replace spaces with hypens
};

const toLocalPrice = (price) => {
    return Number(price).toLocaleString();
}
export {apiClient,titleToSlug, toLocalPrice }