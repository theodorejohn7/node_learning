import express, { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

const router: Router = express.Router();

const userController = new UserController();

router.get('/', async (req: Request, res: Response) => {
  const users = await userController.getAllUsers(req,res);
  res.json(users);
});


router.post('/', async (req: Request, res: Response) => {
  console.log("@$#123 req",req.body)
  const user = await userController.createUser(req, res);
  res.json(user);
});


export default router;
