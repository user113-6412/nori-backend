import express, { Request, Response, Router, RequestHandler } from 'express'
import prisma from '../prismaClient'
const router: Router = express.Router()


interface AuthRequest extends Request {
    userId?: number;
}

interface CreateIntakeRequest extends AuthRequest {
    body: {
        intake: number;
    }
}

interface UpdateIntakeRequest extends AuthRequest {
    body: {
        intake: number;
    },
    params: {
        id: string;
    }
}

interface DeleteIntakeRequest extends AuthRequest {
    params: {
        id: string;
    }
}






// Get all intakes for logged-in user
router.get('/', (async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    
    const userId = Number(req.userId);
    const intakes = await prisma.intake.findMany({
        where: {
            userId
        }
    })
    res.json(intakes)
}) as unknown as RequestHandler)






// Create a new intake
router.post('/', (async (req: CreateIntakeRequest, res: Response) => {
    console.log("we hit submit new intake route")
    if (!req.userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const { intake } = req.body
    const userId = Number(req.userId);
    const newIntake = await prisma.intake.create({
        data: {
            intake,
            userId
        }
    })
    res.json(newIntake)
}) as unknown as RequestHandler)






// Update a intake
router.put('/:id', (async (req: UpdateIntakeRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const { intake } = req.body
    const { id } = req.params
    const userId = Number(req.userId);
    const updatedIntake = await prisma.intake.update({
        where: {
            id: parseInt(id),
            userId
        },
        data: {
            intake: intake
        }
    })
    res.json(updatedIntake)
}) as unknown as RequestHandler)






// Delete a intake
router.delete('/:id', (async (req: DeleteIntakeRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const { id } = req.params
    const userId = Number(req.userId);
    await prisma.intake.delete({
        where: {
            id: parseInt(id),
            userId
        }
    })
    res.send({ message: "Intake deleted" })
}) as unknown as RequestHandler)






export default router