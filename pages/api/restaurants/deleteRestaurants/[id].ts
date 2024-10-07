import { PrismaClient } from "@prisma/client";
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
          .json({ error: "Restaurant not found" });
      }

      await prisma.restaurant.delete({
        where: { id: Number(id) },
      });

      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      console.error("Error deleting restaurant: ", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Error deleting restaurant" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .end(`Method ${method} Not Allowed`);
  }
}
