import { UserController } from '@/controllers/user.controller';
import { verifyToken } from '@/middlewares/token';
import { uploader } from '@/middlewares/uploader';
import { validateRegister } from '@/middlewares/validator';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post(
      '/create',
      validateRegister,
      this.userController.createUser,
    );
    this.router.post('/login', this.userController.loginUser);
    this.router.get('/profile/:id', verifyToken, this.userController.getUserId);
    this.router.patch('/verify', verifyToken, this.userController.verifyUser);
    this.router.patch(
      '/avatar',
      verifyToken,
      uploader('avatar', '/avatar').single('avatar'),
      this.userController.editAvatar,
    );
    this.router.post('/deposit/:id', verifyToken, this.userController.deposit);
  }

  getRouter(): Router {
    return this.router;
  }
}
