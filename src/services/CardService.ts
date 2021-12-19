import prismaClient from '../prisma'
import { ValidationError } from '../errors/ValidationError'
import { searchOnDatabase } from '../utils/PrismaServiceUtils'
type CardProps = {
    title: string
    question: string
    answer: string
    user_id: string
    deck_id: string
}

class CardService {
    async create({
        title,
        question,
        answer,
        user_id,
        deck_id
    }: CardProps) {
        
        const userExists = await searchOnDatabase(user_id, 'user')
        if(!userExists) throw new ValidationError("User does not exist")

        const deckExists = await searchOnDatabase(deck_id, 'deck')
        if(!deckExists) throw new ValidationError("Deck does not Exist")
        
        const current_state = 0
        const last_time = new Date()
        const next_time = new Date()
        next_time.setDate(last_time.getDate() + 1)

        const cardObj = {
            data: {
                title,
                question,
                answer,
                current_state,
                last_time,
                next_time,
                user_id,
                deck_id,
            }
        }
        const card = await prismaClient.card.create(cardObj)

        return card
    }
    async listByDeck(id: string) {
        const deck = await prismaClient.deck.findFirst({
            where: { id }, include: { cards: true }
        })
        if(!deck) throw new ValidationError("Deck does not Exist")
        return deck.cards
    }

    async listNextCards (user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: { id: user_id }, include: { cards: true }
        })

        const cards = user.cards

        const nextCards = cards.map(val => {
            const cardState = val.current_state
            if(cardState < 4) return val
            return 
        })

        nextCards.filter(n => n) // remove all empty elements

        const orderedNextCards = nextCards.sort((val1, val2) => {
            return val1.next_time.getTime() - val2.next_time.getTime()
        })

        return orderedNextCards
    }
}

export { CardService }