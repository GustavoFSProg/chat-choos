import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import md5 from 'md5'

const prismaDB = new PrismaClient()

async function createUser(req: Request, res: Response) {
  try {
    const user = await prismaDB.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    return res.status(201).json({ user: user, message: 'Created user Success!!' })
  } catch (error) {
    return res.status(400).json({ error, message: 'ERROR!!' })
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const data = await prismaDB.users.findMany()

    return res.status(201).json(data)
  } catch (error) {
    return res.status(400).json({ error, message: 'ERROR!!' })
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const user = await prismaDB.users.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    return res.status(201).json({ user: user, message: 'UPDATED user Success!!' })
  } catch (error) {
    return res.status(400).json({ error, message: 'ERROR!!' })
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const user = await prismaDB.users.delete({
      where: { id: req.params.id },
    })

    return res.status(201).json({ user: user, message: 'UPDATED user Success!!' })
  } catch (error) {
    return res.status(400).json({ error, message: 'ERROR!!' })
  }
}

export default { createUser, getUsers, deleteUser, updateUser }
