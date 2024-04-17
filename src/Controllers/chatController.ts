import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prismaDB = new PrismaClient()

async function createChat(req: Request, res: Response) {
  const { firstId, secondId } = req.body

  try {
    const chat = await prismaDB.chat.findFirst({
      where: { userId1: firstId, userId2: secondId } as any,
    })

    // const chat = await prismaDB.chat.findMany()

    if (chat) return res.status(200).json({ msg: 'LEU O CHAT!', chat })

    const response = await prismaDB.chat.create({
      data: { userId1: firstId, userId2: secondId },
    })

    return res.status(201).json({ msg: 'Chat Cadastrado!!', response })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

async function getChat(req: Request, res: Response) {
  const { firstId, secondId } = req.body

  try {
    const chat = await prismaDB.chat.findFirst({
      where: { userId1: firstId, userId2: secondId } as any,
    })

    // const chat = await prismaDB.chat.findMany()

    // if (chat) return res.status(200).json(chat)

    return res.status(201).json(chat)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

async function getAllChat(req: Request, res: Response) {
  const { firstId, secondId } = req.body

  try {
    const chat = await prismaDB.chat.findMany()

    // const chat = await prismaDB.chat.findMany()

    // if (chat) return res.status(200).json(chat)

    return res.status(201).json(chat)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

async function deleteAll(req: Request, res: Response) {
  try {
    const chat = await prismaDB.chat.deleteMany()

    return res.status(201).json({ msg: 'DELETADO' })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export default { createChat, getChat, getAllChat, deleteAll }
