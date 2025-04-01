import http from './HttpClient';

export const start = async (id) => {
    try {
        const response = await http.get(`/auth/start?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("Error during start:", error);
        throw error;
    }
}

export const login = async (id, uuid, signature) => {
    try {
        const response = await http.post('/auth/login', { id, uuid, signature });
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}