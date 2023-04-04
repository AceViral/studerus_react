export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken');
};
export const setAccessToken = (value: string) => {
    return localStorage.setItem('accessToken', value);
};

export const setRefreshToken = (value: string) => {
    return localStorage.setItem('refreshToken', value);
};

export const removeAccessToken = () => {
    return localStorage.removeItem('accessToken');
};

export const removeRefreshToken = () => {
    return localStorage.removeItem('refreshToken');
};

