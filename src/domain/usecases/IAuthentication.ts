export interface IAuthentication {
    auth: (authentication: IAuthentication.Params) => Promise<IAuthentication.Results>
}

export namespace IAuthentication {
    export type Params = {
        email: string,
        password: string
    }
    export type Results = {
        id: string,
        token: string
    }
}