import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

class UserController {
    async handle(req: Request, res: Response) {
        const { name, email } = req.body

        const userService = new UserService();
        try {
            const user = await userService.create( {name, email} )
            return res.json(user).status(200)
        } catch (err) {
            return res.json({error: err.message})
        }
    }
}

export { UserController }