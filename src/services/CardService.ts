import prismaClient from '../prisma'

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

        const current_state = 0
        const last_time = new Date()
        const next_time = new Date()
        next_time.setDate(last_time.getDate() + 1)

        

        const cardObj = {data: {
            title,
            question,
            answer,
            current_state,
            last_time,
            next_time,
            user_id,
            deck_id,
        }}
        const card = await prismaClient.card.create(cardObj)

        return card
    }
}

export { CardService }