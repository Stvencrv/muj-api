import { Router } from 'express';
import { TokenValidation } from "../utils/verifyToken";

const router: Router = Router();

import {
    singup,
    singin,
    profile
} from "../controllers/auth.controller";    

router.post('/singup', singup);
router.post('/singin', singin);
router.get('/profile', TokenValidation, profile);

export default router;