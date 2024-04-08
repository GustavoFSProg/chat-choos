import Router, { Request, Response } from 'express'
import userController from './Controllers/userController'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  return res.status(200).json(`🧠 Api Template Running`)
})

// aaa

routes.get('/get-users', userController.getUsers)
routes.post('/create-user', userController.createUser)
routes.put('/update-user/:id', userController.updateUser)
routes.delete('/delete-user/:id', userController.deleteUser)

export default routes
