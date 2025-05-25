import express, { Request, Response, Router, RequestHandler } from 'express'
import prisma from '../prismaClient'
import authMiddleware from '../middleware/authMiddleware'
const router: Router = express.Router()

interface AuthRequest extends Request {
    userId?: number;
}

interface CreateBlogRequest extends AuthRequest {
    body: {
        title: string;
        content: string;
        authorName: string;
        isPrivate: boolean;
        createdAt: Date;
    }
}

interface UpdateBlogRequest extends AuthRequest {
    body: {
        title: string;
        content: string;
        authorName: string;
        isPrivate: boolean;
        createdAt: Date;
    };
    params: {
        id: string;
    }
}

interface DeleteBlogRequest extends AuthRequest {
    params: {
        id: string;
    }
}

// Get all blogs for logged-in user
router.get('/', authMiddleware as express.RequestHandler, (async (req: AuthRequest, res: Response) => {
    console.log('hit fetch all private blogs route')
    if (!req.userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = Number(req.userId);
    const blogs = await prisma.blog.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    res.json(blogs)
}) as unknown as RequestHandler)







// Get public blogs
router.get('/public', (async (_req: Request, res: Response) => {
    console.log('hit fetch public blogs route')
    const blogs = await prisma.blog.findMany({
        where: {
            isPrivate: false
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    res.json(blogs)
}) as unknown as RequestHandler)







// Get public blog by id    
router.get('/public/:id', (async (req: Request, res: Response) => {
    console.log('hit fetch public blog by id route')
    const { id } = req.params
    const blog = await prisma.blog.findUnique({
        where: {
            id: parseInt(id),
            isPrivate: false
        }
    })
    res.json(blog)
}) as unknown as RequestHandler)







// Create a new blog
router.post('/', authMiddleware as express.RequestHandler, (async (req: CreateBlogRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const { title, content, authorName, isPrivate } = req.body
    const userId = Number(req.userId);
    const blog = await prisma.blog.create({
        data: {
            title,
            content,
            authorName,
            isPrivate,
            userId
        }
    })
    res.json(blog)
}) as unknown as RequestHandler)







// Update a blog
router.put('/:id', authMiddleware as express.RequestHandler, (async (req: UpdateBlogRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const { title, content, authorName, isPrivate } = req.body
    const { id } = req.params
    const userId = Number(req.userId);
    const updatedBlog = await prisma.blog.update({
        where: {
            id: parseInt(id),
            userId
        },
        data: {
            title,
            content,
            authorName,
            isPrivate
        }
    })
    res.json(updatedBlog)
}) as unknown as RequestHandler)







// Delete a blog
router.delete('/:id', authMiddleware as express.RequestHandler, (async (req: DeleteBlogRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const { id } = req.params
    const userId = Number(req.userId);
    await prisma.blog.delete({
        where: {
            id: parseInt(id),
            userId
        }
    })
    res.send({ message: "Blog deleted" })
}) as unknown as RequestHandler)







export default router