export interface API_RESPONSE<Data> {
    ok: boolean
    status: number
    message: string
    data: Data
}
