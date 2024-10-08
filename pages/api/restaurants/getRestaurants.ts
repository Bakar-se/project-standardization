import { handlePrismaError } from "@/lib/errorHandler";
import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) => {
  if (req.method === "GET") {
    try {
      const restaurants = await prisma.restaurant.findMany({
        orderBy: {
          id: 'desc',
        },
      });

      // Returning the restaurants wrapped in an object as expected
      return res.status(StatusCodes.OK).json({ restaurants });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { statusCode, message } = handlePrismaError(error);
        return res.status(statusCode).json({ error: message });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An unexpected error occurred." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
