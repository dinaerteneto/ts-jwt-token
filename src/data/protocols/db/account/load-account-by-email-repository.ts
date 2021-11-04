export interface LoadAccountByEmailRepository {
    loadByEmail : (email: string) => Promise<LoadAccountByEmailRepository.Results>
}

export namespace LoadAccountByEmailRepository {
    export type Results = {
        id: string
        name: string
        email: string
        password: string
    }
}