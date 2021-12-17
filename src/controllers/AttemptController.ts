import { Request, Response } from 'express'
import { AttemptService } from '../services/AttemptService'


class AttemptController {
    async handle(req: Request, res: Response) {
        const { correct, card_id, deck_id, user_id } = req.body
        const attemptService = new AttemptService()
        
        const attempt = await attemptService.create({ correct, card_id, deck_id, user_id })
        return res.json(attempt)
    }
    
    async list(req: Request, res: Response) {
        const { user_id } = req.body
        const attemptService = new AttemptService()

        const attempts = await attemptService.listAttempts(user_id)
        
        return res.json(attempts)
    }

    async listByDeck (req: Request, res: Response) {
        const { deck_id } = req.body
        const attemptService = new AttemptService()
        const attempts = await attemptService.listByDeck(deck_id)
        return res.json(attempts)
    }

    async listByDate(req: Request, res: Response){
        const { user_id } = req.body
        const { ini, end } = req.query

        const attemptService = new AttemptService()
        const attempts = await attemptService.listByDate(user_id, String(ini), String(end))
        return res.json(attempts)
    }
}

export { AttemptController }