import prismaClient from '../prisma'

type AttemptProps = {
    correct: boolean
    card_id: string
    deck_id: string
    user_id: string
}

class AttemptService {
    async create({correct, card_id, deck_id, user_id}: AttemptProps) {
        
        const userExists = await prismaClient.user.findFirst({
            where: {id: user_id}
        })
        if(!userExists) {
            throw new Error("User does not exist")
        }
        const deckExists = await prismaClient.deck.findFirst({
            where: {id: deck_id}
        })
        if(!deckExists) {
            throw new Error("Deck does not Exist")
        }
        const cardExists = await prismaClient.card.findFirst({
            where: {id: card_id}
        })
        if(!cardExists) {
            throw new Error("Card does not Exist")
        }

        const attemptObj = { data: { correct, card_id, deck_id, user_id }}
        const attempt = await prismaClient.attempt.create(attemptObj)
        return attempt
    }
}

export { AttemptService }