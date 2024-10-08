import { handlePrismaError } from "@/lib/errorHandler";
import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeviceResponse | ErrorResponse>
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {

      const deviceId = Number(id);
      if (isNaN(deviceId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid device ID." });
      }

      const device = await prisma.device.findUnique({
        where: {
          id: deviceId,
        },
      });

      if (!device) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Device not found." });
      }

      return res.status(StatusCodes.OK).json({
        id: device.id,
        device_name: device.device_name,
        device_id: device.device_id,
        device_type: device.device_type,
        status: device.status,
        restaurant_id: device.restaurant_id,
        created_at: device.created_at,
        updated_at: device.updated_at,
      });

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
}
