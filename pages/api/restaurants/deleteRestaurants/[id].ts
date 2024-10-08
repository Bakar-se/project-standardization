import { handlePrismaError } from "@/lib/errorHandler";
import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse>
) {
  const { method } = req;
  const { id } = req.query;

  if (method === "DELETE") {
    try {
      const existingRestaurant = await prisma.restaurant.findUnique({
        where: { id: Number(id) },
      });

      if (!existingRestaurant) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Restaurant not found." });
      }

      await prisma.restaurant.delete({
        where: { id: Number(id) },
      });

      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { statusCode, message } = handlePrismaError(error);
        return res.status(statusCode).json({ error: message });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An unexpected error occurred." });
    }
  } else {

    res.setHeader("Allow", ["DELETE"]);
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .end(`Method ${method} Not Allowed`);
  }
}
