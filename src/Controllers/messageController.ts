import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prismaDB = new PrismaClient()

async function createMessage(req: Request, res: Response) {
  try {
    const messages = await prismaDB.messages.create({
      data: {
        chatId: req.body.chatId,
        senderId: req.body.senderId,
        text: req.body.text,
      },
    })

    return res.status(201).json({ message: 'Message created successfuly!!', messages })
  } catch (error) {
    return res.status(400).json({ message: 'ERROR!!!', error })
  }
}

async function getMessages(req: Request, res: Response) {
  try {
    const { ID } = req.params
    const data = await prismaDB.messages.findMany({
      where: { chatId: ID },
    })

    return res.status(201).json(data)
  } catch (error) {
    return res.status(400).json({ message: 'ERROR!!!', error })
  }
}

export default { getMessages, createMessage }
