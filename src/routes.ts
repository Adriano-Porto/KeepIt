import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { DeckController } from './controllers/DeckController'
import { CardController } from './controllers/CardController'
import { AttemptController } from './controllers/AttemptController'

const userController = new UserController()
const deckController = new DeckController()
const cardController = new CardController()
const attemptController = new AttemptController()

const router = Router()

router.post('/create/user', userController.handle)
router.post('/create/deck', deckController.handle)
router.post('/create/card', cardController.handle)
router.post('/create/attempt', attemptController.handle)

router.post('/decks', deckController.getAll)
export { router }