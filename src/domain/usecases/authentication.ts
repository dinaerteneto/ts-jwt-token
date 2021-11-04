export interface Authentication {
    auth: (authentication: Authentication.Params) => Promise<Authentication.Results>
}

export namespace Authentication {
    export type Params = {
        email: string,
        password: string
    }
    export type Results = {
        id: string,
        token: string
    }
}