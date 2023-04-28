import { AxiosConfigT } from './axios';
//@ts-ignore
import deferred from 'deferred';
import axios, { AxiosRequestConfig } from 'axios';
import jwtDecode from 'jwt-decode';
import {
    getAccessToken,
    getRefreshToken,
    removeAccessToken,
    removeRefreshToken,
    setAccessToken,
    setRefreshToken
} from './localStorage';

type RefreshRes = { access_token: string; refresh_token: string };

class RefreshQueue {
    _queue: { originalRequest: AxiosRequestConfig; def: any }[] = [];

    constructor() {
        this.enqueue = this.enqueue.bind(this);
        this.resolveWith = this.resolveWith.bind(this);
        this.reject = this.reject.bind(this);
    }

    enqueue(originalRequest: AxiosRequestConfig) {
        const def = deferred();
        this._queue.push({ originalRequest, def });
        return def.promise;
    }

    resolveWith(token: string) {
        while (this._queue.length) {
            const req = this._queue.shift();
            if (req) {
                const { originalRequest, def } = req;
                def.resolve({
                    ...originalRequest,
                    headers: {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }
    }

    reject(error: Error) {
        while (this._queue.length) {
            const req = this._queue.shift();
            if (req) {
                req.def.resolve(error);
            }
        }
    }
}

export const isAccessTokenExpired = (): boolean => {
    const accessToken = getAccessToken();
    if (!accessToken) return true;
    try {
        const parsed = jwtDecode(accessToken) as { exp: number };
        if (parsed) {
            return new Date(parsed.exp * 1000) < new Date();
        }
        return true;
    } catch (error) {
        return true;
    }
};

class Refresher {
    _refreshQueue: RefreshQueue | null = null;
    _commonQueue = null;
    _axiosConfig: AxiosConfigT | null = null;
    _listeners = [];
    _isRefreshing = false;
    _isCommonRefreshing = false;

    constructor(axiosConfig: AxiosConfigT) {
        this._refreshQueue = new RefreshQueue();
        this._axiosConfig = axiosConfig;
        this.use = this.use.bind(this);
        this._doStartRefresh = this._doStartRefresh.bind(this);
        this._doCommonRefresh = this._doCommonRefresh.bind(this);
    }

    canRefresh() {
        return !!(getAccessToken() && getRefreshToken());
    }

    use(req: AxiosRequestConfig) {
        if (!this._isRefreshing && this.canRefresh() && isAccessTokenExpired()) {
            return this._doStartRefresh(req);
        }

        if (this.canRefresh() && isAccessTokenExpired()) {
            return this._refreshQueue?.enqueue(req);
        }
        return { ...req, headers: getAccessToken() && { Authorization: 'Bearer ' + getAccessToken() } };
    }

    async _doStartRefresh(req: AxiosRequestConfig) {
        return await this._doCommonRefresh().then((refreshRes) => {
            return {
                ...req,
                headers: {
                    ...req.headers,
                    Authorization: `Bearer ${refreshRes.access_token}`
                }
            };
        });
    }

    async _doCommonRefresh() {
        this._isRefreshing = true;
        const refreshToken = getRefreshToken();
        return axios<RefreshRes>({
            ...this._axiosConfig,
            method: 'post',
            url: '/auth/refresh',
            headers: { Authorization: `Bearer ${refreshToken}` }
        })
            .then((res) => this._onSuccessRefresh(res.data))
            .catch((error) => this._onRefreshFailure(error));
    }

    _onSuccessRefresh(res: RefreshRes) {
        setAccessToken(res.access_token);
        setRefreshToken(res.refresh_token);

        this._refreshQueue?.resolveWith(res.access_token);
        this._isRefreshing = false;
        return res;
    }

    _onRefreshFailure(error: Error) {
        removeAccessToken();
        removeRefreshToken();
        this._refreshQueue?.reject(error);
        this._isRefreshing = false;
        window.location.replace('/login');
        return Promise.reject(error);
    }
}
export default Refresher;
