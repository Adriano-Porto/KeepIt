import prismaClient from '../prisma'
import { ValidationError } from '../errors/ValidationError'
type DeckProps = {
    name: string;
    user_id: string
}

class DeckService {
    async create({ name, user_id }: DeckProps) {
        const userExists = await prismaClient.user.findFirst({
            where: { id: user_id}
        })

        if(!userExists)  {
            throw new ValidationError("User does not exists")
        }

        const deckObj = { data: { name, user_id, qnt_cards: 0 }}

        const deck = await prismaClient.deck.create(deckObj)
        return deck
    }
}

export { DeckService}