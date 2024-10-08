import { handlePrismaError } from "@/lib/errorHandler";
import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Restaurant name is required." });
    }

    try {

      const restaurant = await prisma.restaurant.create({
        data: {
          name,
        },
      });

      return res.status(StatusCodes.CREATED).json({
        message: "Restaurant created successfully.",
        restaurant,
      });
      
    } catch (error) {

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { statusCode, message } = handlePrismaError(error);
        return res.status(statusCode).json({ error: message });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An unexpected error occurred." });
    }
  } else {

    res.setHeader('Allow', ['POST']);
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
}
