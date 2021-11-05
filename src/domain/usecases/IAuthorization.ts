export class IAuthorization {
    verify:(token:string) => Promise<string>
}