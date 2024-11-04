export const BASE_URL = import.meta.env.VITE_API_URL || "https://web-fe-html-css-prj3-backend.onrender.com";

export const fetcher = async (endpoint: string, options: RequestInit = {}) => {
    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...options.headers,
        },
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "An error occurred");
    }

    return response.json();
};
