import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { device_name, device_id, device_type, restaurant_id, status } = req.body;

    if (!device_name || !device_id || !device_type || !restaurant_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "All fields are required: device_name, device_id, device_type, and restaurant_id." });
    }

    try {
      const restaurant = await prisma.restaurant.findUnique({
        where: {
          id: restaurant_id,
        },
      });

      if (!restaurant) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Restaurant not found." });
      }

      const device = await prisma.device.create({
        data: {
          device_name,
          device_id,
          device_type,
          status: status || "ACTIVE",
          restaurant: {
            connect: {
              id: restaurant_id,
            },
          },
        },
      });

      return res.status(StatusCodes.CREATED).json({
        message: "Device created successfully.",
        device,
      });
      
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
    res.setHeader("Allow", ["POST"]);
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
}
