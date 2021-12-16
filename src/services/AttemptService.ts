import prismaClient from '../prisma'
import { ValidationError } from '../errors/ValidationError'
import { searchOnDatabase } from '../utils/PrismaServiceUtils'
import { states } from '../utils/states'

type AttemptProps = {
    correct: boolean
    card_id: string
    deck_id: string
    user_id: string
}

class AttemptService {
    async create({correct, card_id, deck_id, user_id}: AttemptProps) {
        const [, , cardExists] = await  this.validateData(user_id, deck_id, card_id)

        const updatedCard = await this.updateCard(cardExists, correct)

        const attemptObj = { data: { correct, card_id, deck_id, user_id }}
        const attempt = await prismaClient.attempt.create(attemptObj)

        return { attempt, updatedCard }
    }

    async validateData(user_id: string, deck_id: string, card_id: string) {
        const userExists = await searchOnDatabase(user_id, 'user')
        if(!userExists) {
            throw new ValidationError("User does not exist")
        }

        const cardExists = await searchOnDatabase(card_id, 'card')
        if(!cardExists) {
            throw new ValidationError("Card does not Exist")
        }

        const deckExists = await searchOnDatabase(deck_id, 'deck')
        if(!deckExists) {
            throw new ValidationError("Deck does not Exist")
        }

        return [ userExists, deckExists, cardExists ]
    }

    async updateCard(card: any, correct: boolean) {
        card.last_time = new Date()
        // Sets the next_time based on the current_state
        // 0 - now
        // 1 - 1 day later
        // 2 - 7 days later
        // 3 - 14 days later
        // 4 - 30 days later

        if(correct) {
            card.current_state += 1 
        }

        if(card.current_state <= 3) {
            card.next_time = new Date(card.last_time.getTime() + states[card.current_state])
        } else {
            card.next_time = new Date(0)
        }

        console.log({next_time: card.next_time})

        const updatedCard = await prismaClient.card.update({
            where: {
                id: card.id,
            },
            data: {
                current_state: card.current_state,
                last_time: card.last_time,
                next_time: card.next_time
            }
        })

        return updatedCard
    }
}

export { AttemptService }