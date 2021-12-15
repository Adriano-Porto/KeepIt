import prismaClient from '../prisma'
import { ValidationError } from '../errors/ValidationError'
import { searchOnDatabase } from '../utils/PrismaServiceUtils'

type UserProps = {
    name: string;
    email: string
}

class UserService {
    async create({name, email}: UserProps) {
        const userExists = await searchOnDatabase(email, 'user', 'email')

        if(userExists){
            throw new ValidationError("User Already Exists on the Database")
        }
        const userObj = { data: { name, email } }
        const user = await prismaClient.user.create(userObj)

        return user
    }
}

export { UserService }