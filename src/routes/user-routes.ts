import { Router } from 'express';
import UserController from '../controllers/user-controller';
import authMiddleware from '../middleware/auth';

export const userRouter = Router();

userRouter.get('/', UserController.getAll);

userRouter.post('/login', UserController.login);
userRouter.post('/', authMiddleware, UserController.createUser);
userRouter.post('/logout', authMiddleware, UserController.logout);
userRouter.patch('/:username', authMiddleware, UserController.update);

// Para efectuar el logout de un usuario, el método que corresponde es el DELETE, ya que estamos borrando info de la BBDD, el token creado al momento del login.

userRouter.delete('/:username', authMiddleware, UserController.delete);