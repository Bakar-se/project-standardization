import { handlePrismaError } from "@/lib/errorHandler";
import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
 
      const deviceId = Number(id);
      if (isNaN(deviceId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid device ID." });
      }

      const existingDevice = await prisma.device.findUnique({
        where: {
          id: deviceId,
        },
      });

      if (!existingDevice) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Device not found." });
      }

      await prisma.device.delete({
        where: {
          id: deviceId,
        },
      });

      return res.status(StatusCodes.OK).json({ message: "Device deleted successfully." });

    } catch (error) {

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { statusCode, message } = handlePrismaError(error);
        return res.status(statusCode).json({ error: message });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "An unexpected error occurred." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
}
