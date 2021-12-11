import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { DeckController } from './controllers/DeckController'
import { CardController } from './controllers/CardController'
import { AttemptController } from './controllers/AttemptController'

const router = Router()

router.post('/create/user', new UserController().handle)
router.post('/create/deck', new DeckController().handle)
router.post('/create/card', new CardController().handle)
router.post('/create/attempt', new AttemptController().handle)

export { router }