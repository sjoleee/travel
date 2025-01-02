import ky from "ky";

const httpClient = ky.create();

const api = {
  get: async <Response>(url: string) => {
    const response = await httpClient.get(url).json<{ data: Response }>();
    return response.data;
  },
  post: async <RequestBody, Response>(url: string, body: RequestBody) => {
    const response = await httpClient.post(url, { json: body }).json<{ data: Response }>();
    return response.data;
  },
  put: async <RequestBody, Response>(url: string, body: RequestBody) => {
    const response = await httpClient.put(url, { json: body }).json<{ data: Response }>();
    return response.data;
  },
  delete: async <Response>(url: string) => {
    const response = await httpClient.delete(url).json<{ data: Response }>();
    return response.data;
  },
};

export default api;
