import express, { Request, Response, Router, RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient'

const router: Router = express.Router()

interface RegisterRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}
interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}

function createJWT(id: string) {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '20min' })
}




// Register a new user endpoing /auth/register
router.post('/signup', (async (req: RegisterRequest, res: Response) => {
    const { email, password } = req.body
    // save the username and an irreversibly encrypted password
    // save gilgamesh@gmail.com | aklsdjfasdf.asdf..qwe..q.we...qwe.qw.easd
    // save the new user and hashed password to the db
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields must be filled' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Email is not valid' });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: 'Password not strong enough' });
        }

        const exists = await prisma.user.findUnique({ where: { email } as any });
        if (exists) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // encrypt the password
        const hashedPassword = bcrypt.hashSync(password, 8)
        
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            } as any
        })

        // now that we have a user, I want to add their first todo for them
        // const defaultTodo = `Hello :) Add your first todo!`
        // await prisma.todo.create({
        //     data: {
        //         task: defaultTodo,
        //         userId: user.id
        //     }
        // })

        // create a token
        const token = createJWT(user.id.toString())
        console.log("User created successfully")
        res.json({ token })
    } catch (err: any) {
        console.error(err);
        res.sendStatus(503);
    }
}) as RequestHandler)






router.post('/login', (async (req: LoginRequest, res: Response) => {
    // we get their email, and we look up the password associated with that email in the database
    // but we get it back and see it's encrypted, which means that we cannot compare it to the one the user just used trying to login
    // so what we can to do, is again, one way encrypt the password the user just entered

    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields must be filled' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Email is not valid' });
        }

        const user = await prisma.user.findUnique({ where: { email } as any });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        console.log(user)

        // then we have a successful authentication
        const token = createJWT(user.id.toString())
        console.log("User logged in successfully")
        res.json({ token })
    } catch (err: any) {
        console.error(err);
        res.sendStatus(503);
    }
}) as RequestHandler)




export default router