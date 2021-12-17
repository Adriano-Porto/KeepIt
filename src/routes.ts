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

router.post('/decks', deckController.listByUser)
router.post('/cards', cardController.listByDeck)

// creating 3 different routes is much simpler than creating one that handle all attempt's requests
router.post('/attempts', attemptController.list)
router.post('/attempts/deck', attemptController.listByDeck)
router.post('/attempts/date', attemptController.listByDate)

export { router }