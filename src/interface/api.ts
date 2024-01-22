export interface ApiResponse<Response> {
    ok: boolean
    status: number
    message: string
    response: Response
}
