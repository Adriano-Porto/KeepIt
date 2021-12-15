import prismaClient from '../prisma'
import { ValidationError } from '../errors/ValidationError'
import { searchOnDatabase } from '../utils/PrismaServiceUtils'

type AttemptProps = {
    correct: boolean
    card_id: string
    deck_id: string
    user_id: string
}

class AttemptService {
    async create({correct, card_id, deck_id, user_id}: AttemptProps) {
        
        const userExists = await searchOnDatabase(user_id, 'user')
        if(!userExists) {
            throw new ValidationError("User does not exist")
        }
        const deckExists = await searchOnDatabase(deck_id, 'deck')
        if(!deckExists) {
            throw new ValidationError("Deck does not Exist")
        }
        const cardExists = await prismaClient.card.findFirst({
            where: {id: card_id}
        })
        if(!cardExists) {
            throw new ValidationError("Card does not Exist")
        }

        const attemptObj = { data: { correct, card_id, deck_id, user_id }}
        const attempt = await prismaClient.attempt.create(attemptObj)
        return attempt
    }
}

export { AttemptService }