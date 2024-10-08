import { handlePrismaError } from "@/lib/errorHandler";
import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeviceUpdateResponse | { error: string }>
) {

  const { id } = req.query;


  if (req.method === "PUT") {

    const { device_name, device_id, device_type, status, restaurant_id }: DeviceUpdateRequestBody = req.body;

    if (!device_name || !device_id || !device_type || !restaurant_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "All fields are required: device_name, device_id, device_type, and restaurant_id."
      });
    }

    try {

      const existingDevice = await prisma.device.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!existingDevice) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Device not found." });
      }

      const updatedDevice = await prisma.device.update({
        where: {
          id: Number(id),
        },
        data: {
          device_name,
          device_id,
          device_type,
          status: status || existingDevice.status,
          restaurant: {
            connect: {
              id: restaurant_id,
            },
          },
        },
      });

      return res.status(StatusCodes.OK).json({
        message: "Device updated successfully.",
        device: {
          id: updatedDevice.id,
          device_name: updatedDevice.device_name,
          device_id: updatedDevice.device_id,
          device_type: updatedDevice.device_type,
          status: updatedDevice.status,
          restaurant_id: updatedDevice.restaurant_id,
          created_at: updatedDevice.created_at,
          updated_at: updatedDevice.updated_at,
        },
      });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { statusCode, message } = handlePrismaError(error);
        return res.status(statusCode).json({ error: message });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An unexpected error occurred." });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
}
