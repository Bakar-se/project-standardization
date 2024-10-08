import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
        console.error("Prisma known error: ", error);
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "A known database error occurred during deletion.",
          details: error.message,
        });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error("Prisma unknown error: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: "An unknown database error occurred during deletion.",
        });
      } else if (error instanceof Prisma.PrismaClientRustPanicError) {
        console.error("Prisma Rust panic: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: "A critical error occurred in the database engine during deletion.",
        });
      } else if (error instanceof Prisma.PrismaClientInitializationError) {
        console.error("Prisma initialization error: ", error);
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
          error: "Database service is unavailable during deletion.",
        });
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        console.error("Prisma validation error: ", error);
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "Invalid data format or input for deletion.",
        });
      } else {
        console.error("Unknown error: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: "An unknown error occurred during deletion.",
        });
      }
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .end(`Method ${method} Not Allowed`);
  }
}
