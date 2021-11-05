import { Decrypter, Encrypter } from "@/data/protocols/cryptography";
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Decrypter, Encrypter {
    
    constructor(private readonly secret:string) {}

    async encrypt(value: string): Promise<string> {
        return jwt.sign({id: value}, this.secret)
    }

    async decrypt(value: string): Promise<string> {
        return jwt.verify(value, this.secret)
    }
}