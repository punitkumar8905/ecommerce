import { apiClient } from "@/library/helper";

const getCategory = async (queryParams = {}) => { // default params
    const params = queryParams || {};

    const query = new URLSearchParams()
    if (params.home) {
        query.append("home", params.home);
    }
    if (params.status) {
        query.append("status", params.status);
    }
    if (params.top) {
        query.append("top", params.top);
    }
    if (params.featured) {
        query.append("featured", params.featured);
    }
    if (params.slug) {
        query.append("slug", params.slug);
    }


    try {
        if (params.id) {
            query.append("id", params.id);
        }

        const api = `category?${query.toString()}`;
        return await apiClient
            .get(api)
            .then((response) => {
                if (response.data.flag == 1) {
                    return {
                        categories: response.data.categories,
                        image_path: response.data.image_path,
                    }
                } else {
                    return { categories: [], image_path: '' }
                }
            })
            .catch(() => {
                return { categories: [], image_path: '' };
            })
    } catch (error) {
        return { categories: [], image_path: '' }
    }
};


const getProduct = async (searchParams = {}) => { // default params
    const params = searchParams || {};

    const query = new URLSearchParams()
    if (params.home) {
        query.append("home", params.home);
    }
    if (params.status) {
        query.append("status", params.status);
    }
    if (params.top) {
        query.append("top", params.top);
    }
    if (params.featured) {
        query.append("featured", params.featured);
    }
    if (params.product_slug) {
        query.append("product_slug", params.product_slug);
    }
    if (params.category_slug) {
        query.append("category_slug", params.category_slug);
    }
    if (params.limit) {
        query.append("limit", params.limit);
    }
    if (params.color_id) {
        query.append("color_id", params.color_id);
    }
    if (params.brand_id) {
        query.append("brand_id", params.brand_id);
    }


    try {
        let api = 'product';
        if (params?.id) {
            api += `?id=${params?.id}`;
        }
        return await apiClient
            .get(api)
            .then((response) => {
                if (response.data.flag == 1) {
                    return {
                        products: response.data.products,
                        image_path: response.data.image_path,
                    }
                } else {
                    return { products: [], image_path: '' }
                }
            })
            .catch(() => {
                return { products: [], image_path: '' };
            })
    } catch (error) {
        return { products: [], image_path: '' }
    }
};



const getColor = async (queryParams = {}) => { // default params



    try {
        let api = 'color';
        if (queryParams?.id) {
            api += `?id=${queryParams?.id}`;
        }
        return await apiClient
            .get(api)
            .then((response) => {
                if (response.data.flag == 1) {
                    return {
                        colors: response.data.colors,
                    }
                } else {
                    return { colors: [] }
                }
            })
            .catch(() => {
                return { colors: [] };
            })
    } catch (error) {
        return { colors: [] }
    }
};


export const getBrand = async (queryParams = {}) => {

    const query = new URLSearchParams();

    if (queryParams.id) {
        query.append("id", queryParams.id);
    }

    if (queryParams.category_id) {
        query.append("category_id", queryParams.category_id);
    }

    if (queryParams.status) {
        query.append("status", queryParams.status);
    }

    if (queryParams.home) {
        query.append("home", queryParams.home);
    }

    if (queryParams.top) {
        query.append("top", queryParams.top);
    }

    if (queryParams.best) {
        query.append("is_best", queryParams.best);
    }

    if (queryParams.slug) {
        query.append("slug", queryParams.slug);
    }

    try {

        const response = await apiClient.get(
            `brand?${query.toString()}`
        );

        if (response.data.flag === 1) {

            return {

                brands: response.data.brands,

                image_path: response.data.image_path

            }

        }

        return {

            brands: [],

            image_path: ""

        }

    } catch (error) {

        console.log(error);

        return {

            brands: [],

            image_path: ""

        }

    }

}


export { getCategory, getColor, getBrand, getProduct };