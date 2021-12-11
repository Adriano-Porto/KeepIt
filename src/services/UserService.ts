import prismaClient from '../prisma'
import { ValidationError } from '../errors/ValidationError'

type UserProps = {
    name: string;
    email: string
}

class UserService {
    async create({name, email}: UserProps) {
        
        const userExists = await prismaClient.user.findFirst({
            where: { email }
        })

        if(userExists){
            throw new ValidationError("User Already Exists on the Database")
        }
        const userObj = { data: { name, email } }
        const user = await prismaClient.user.create(userObj)

        return user
    }
}

export { UserService }