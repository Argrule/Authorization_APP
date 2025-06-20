import http from './HttpClient';
import { alertDialog } from '@/component/DialogProvider';

export const start = async (id) => {
    try {
        const response = await http.get(`/auth/start?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("Error during start:", error);
        alertDialog("Network can't connect server");
        throw error;
    }
}

export const login = async (id, uuid, signature) => {
    try {
        const response = await http.post('/auth/login', { id, uuid, signature });
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}