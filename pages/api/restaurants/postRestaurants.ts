import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Restaurant name is required" });
    }

    try {
      const restaurant = await prisma.restaurant.create({
        data: {
          name,
        },
      });
      return res.status(StatusCodes.OK).json(restaurant);
    } catch (error) {
      console.error("Error creating restaurant: ", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error creating restaurant" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
}
