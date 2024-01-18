/* eslint-disable no-console */

type FetchErrorStatus = 400 | 401 | 403 | 404 | 500 | 502 | 503 | 504
export class FetchError extends Error {
    constructor(
        message: string,
        public readonly status: FetchErrorStatus
    ) {
        super(message)
    }

    public getResponseMessage(): string {
        switch (this.status) {
            case 400:
                return '잘못된 요청입니다.'
            case 401:
                return '로그인이 필요합니다.'
            case 403:
                return '권한이 없습니다.'
            case 404:
                return '요청한 페이지를 찾을 수 없습니다.'
            case 500:
                return '서버에 오류가 발생했습니다.'
            case 502:
                return '서버에 오류가 발생했습니다.'
            case 503:
                return '서버에 오류가 발생했습니다.'
            case 504:
                return '서버에 오류가 발생했습니다.'
            default:
                return '알 수 없는 오류가 발생했습니다.'
        }
    }
}

type DefaultFetchOption = {
    disableJsonParse?: boolean
}
type NextApiPath = 'tts'
type FetchOption<OmitTarget extends keyof RequestInit | null = null> = OmitTarget extends null
    ? RequestInit & DefaultFetchOption
    : OmitTarget extends string
      ? Omit<RequestInit, OmitTarget> & DefaultFetchOption
      : never

export interface FetcherOption {
    cache?: {
        dev: Exclude<RequestInit['cache'], undefined>
        prod: Exclude<RequestInit['cache'], undefined>
    }
    baseUrl?: string
}
export const defaultFetcherOption = {
    cache: {
        dev: 'default',
        prod: 'default',
    },
    baseUrl: 'http://localhost:3000',
} as const satisfies FetcherOption
export class Fetcher {
    private readonly baseUrl: string
    public static fetchPrefix = 'api' as const
    private readonly option: FetcherOption

    public constructor(option: FetcherOption | undefined = defaultFetcherOption) {
        this.option = option
        if (process.env.NODE_ENV === 'production' && process.env.PUBLISH_URL) {
            this.baseUrl = process.env.PUBLISH_URL
        } else {
            this.baseUrl = option.baseUrl ?? defaultFetcherOption.baseUrl
        }
    }

    private get cacheOption(): Exclude<RequestInit['cache'], undefined> {
        return process.env.NODE_ENV === 'production'
            ? this.option.cache?.prod ?? defaultFetcherOption.cache.prod
            : this.option.cache?.dev ?? defaultFetcherOption.cache.dev
    }

    private apiRequestPath(apiPath: NextApiPath): string {
        return `${this.baseUrl}/${Fetcher.fetchPrefix}/${apiPath}`
    }

    public async get<APISchema = Response>(apiPath: NextApiPath, option?: FetchOption<'method'>): Promise<APISchema> {
        try {
            const response = await fetch(this.apiRequestPath(apiPath), {
                ...option,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: this.cacheOption,
            })
            if (option?.disableJsonParse) {
                return response as APISchema
            }
            const json = (await response.json()) as APISchema
            return json
        } catch (e: unknown) {
            console.error(e)
            throw new Error(typeof e === 'string' ? e : e instanceof Error ? e.message : JSON.stringify(e))
        }
    }

    public async post<APISchema = Response>(
        apiPath: NextApiPath,
        postBody: {
            body: unknown
            option?: FetchOption<'method' | 'body'>
        }
    ): Promise<APISchema> {
        try {
            const response = await fetch(this.apiRequestPath(apiPath), {
                ...postBody.option,
                method: 'POST',
                body: JSON.stringify(postBody.body),
                headers: {
                    'content-type': 'application/json',
                    ...postBody.option?.headers,
                },
                cache: this.cacheOption,
            })
            if (postBody.option?.disableJsonParse) {
                return response as APISchema
            }
            const json = (await response.json()) as APISchema
            return json
        } catch (e: unknown) {
            console.error(e)
            throw new Error(typeof e === 'string' ? e : e instanceof Error ? e.message : JSON.stringify(e))
        }
    }
}
