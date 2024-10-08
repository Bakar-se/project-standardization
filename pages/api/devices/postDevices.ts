import { handlePrismaError } from "@/lib/errorHandler";
import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeviceCreateResponse | { error: string }>
) {
  if (req.method === "POST") {
    const { device_name, device_id, device_type, restaurant_id, status }: DeviceCreateRequestBody = req.body;

    if (!device_name || !device_id || !device_type || !restaurant_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "All fields are required: device_name, device_id, device_type, and restaurant_id."
      });
    }

    try {
      const restaurant = await prisma.restaurant.findUnique({
        where: { id: restaurant_id },
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
            connect: { id: restaurant_id },
          },
        },
      });

      return res.status(StatusCodes.CREATED).json({
        message: "Device created successfully.",
        device: {
          id: device.id,
          device_name: device.device_name,
          device_id: device.device_id,
          device_type: device.device_type,
          status: device.status,
          restaurant_id: device.restaurant_id,
          created_at: device.created_at,
          updated_at: device.updated_at,
        },
      });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { statusCode, message } = handlePrismaError(error);
        return res.status(statusCode).json({ error: message });
      } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An unexpected error occurred." });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
}
