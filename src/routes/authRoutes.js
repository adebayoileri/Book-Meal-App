import {Router} from 'express';
import Authentication from '../controllers/auth.controller';

const router = Router();

router.post('/signup', Authentication.signUp); //done
router.post('/login', Authentication.login);// done

export default router;