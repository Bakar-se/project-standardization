import { handlePrismaError } from "@/lib/errorHandler";
import { PrismaClient, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Device[] | { error: string }>
) {
  if (req.method === "GET") {
    try {
      const devices: Device[] = await prisma.device.findMany({
        include: {
          restaurant: true,
        },
        orderBy: {
          id: 'desc',
        },
      });

      return res.status(StatusCodes.OK).json(devices);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { statusCode, message } = handlePrismaError(error);
        return res.status(statusCode).json({ error: message });
      } 
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  }
}
