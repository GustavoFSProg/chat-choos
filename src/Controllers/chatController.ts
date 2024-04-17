import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prismaDB = new PrismaClient()

async function createChat(req: Request, res: Response) {
  const { firstId, secondId } = req.body

  try {
    // const chat = await prismaDB.chat.findFirst({
    //   where: { members: [firstId, secondId] } as any,
    // })

    // if (chat) return res.status(200).json(chat)

    const response = await prismaDB.chat.create({
      data: { members: [firstId, secondId] },
    })
    return res.status(201).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export default { createChat }
