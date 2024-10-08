import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const device = await prisma.device.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!device) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Device not found." });
      }

      return res.status(StatusCodes.OK).json(device);

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Prisma known error: ", error);
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "A known database error occurred.", details: error.message });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error("Prisma unknown error: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An unknown database error occurred." });
      } else if (error instanceof Prisma.PrismaClientRustPanicError) {
        console.error("Prisma Rust panic: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "A critical error occurred in the database engine." });
      } else if (error instanceof Prisma.PrismaClientInitializationError) {
        console.error("Prisma initialization error: ", error);
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ error: "Database service is unavailable." });
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        console.error("Prisma validation error: ", error);
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid data format or input." });
      } else {
        console.error("Unknown error: ", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An unknown error occurred." });
      }
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
}
