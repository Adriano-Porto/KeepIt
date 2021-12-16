import prismaClient from '../prisma'
import { ValidationError } from '../errors/ValidationError'
import { searchOnDatabase } from '../utils/PrismaServiceUtils'

type DeckProps = {
    name: string;
    user_id: string
}

class DeckService {
    async create({ name, user_id }: DeckProps) {
        const userExists = await searchOnDatabase(user_id, 'user')

        if(!userExists)  {
            throw new ValidationError("User does not exists")
        }

        const deckObj = { data: { name, user_id }}

        const deck = await prismaClient.deck.create(deckObj)
        return deck
    }
    async listByUser (id: string) {
        const user = await prismaClient.user.findFirst({
            where: { id }, include: { decks: true }
        })
        if(!user){
            throw new ValidationError("User does not exist")
        }
        return user.decks
    }
}

export { DeckService}