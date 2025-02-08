import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    const { email, password, name } = req.body

    const hashedPassword = bcrypt.hashSync(password, 8)

    try {
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                name
            }
        })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        res.json({ token, userInfo })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/login', async (req, res) => {
    
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        
        if (!user) { return res.status(404).send({ message: "User not found" }) }
        
        const passwordIsValid = bcrypt.compareSync(password, user.passwordHash)
        console.log("here")
        if (!passwordIsValid) { return res.status(401).send({ message: "Invalid password" }) }
        console.log(user)
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        res.json({ token, userInfo })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/refresh', async (req, res) => {
    const { token } = req.body

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })

        const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token: newToken, user })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})


export default router