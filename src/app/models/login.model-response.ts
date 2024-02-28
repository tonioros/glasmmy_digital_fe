export interface LoginModelResponse {
    status: string;
    type: string;
    user: {
        api_token: string;
        email: string;
        last_login: string;
        name: string;
    }
}