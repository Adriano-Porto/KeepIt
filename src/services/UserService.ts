import prismaClient from '../prisma'

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
            throw new Error("User Already Exists on the Database")
        }
        const userObj = { data: { name, email } }
        const user = await prismaClient.user.create(userObj)

        return user
    }
}

export { UserService }