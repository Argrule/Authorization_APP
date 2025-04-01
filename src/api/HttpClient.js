class HttpClient {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    async #request(method, endpoint, data = null, customHeaders = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const options = {
            method,
            headers: { ...this.defaultHeaders, ...customHeaders },
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseJson = await response.json();
            console.log('Response ==>', responseJson);
            return responseJson;
        } catch (error) {
            console.error(`Request HEreError: ${error.message}`);
            throw error; // 抛出错误以便上层可以处理
        }
    }

    // GET 请求
    async get(endpoint, headers = {}) {
        return this.#request('GET', endpoint, null, headers);
    }

    // POST 请求
    async post(endpoint, data, headers = {}) {
        return this.#request('POST', endpoint, data, headers);
    }

    // PUT 请求
    async put(endpoint, data, headers = {}) {
        return this.#request('PUT', endpoint, data, headers);
    }

    // DELETE 请求
    async delete(endpoint, headers = {}) {
        return this.#request('DELETE', endpoint, null, headers);
    }
}

export default new HttpClient('http://127.0.0.1:3000');
