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

  if (method === "PUT") {
    try {
      const { name } = req.body;

      const existingRestaurant = await prisma.restaurant.findUnique({
        where: { id: Number(id) },
      });

      if (!existingRestaurant) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Restaurant not found" });
      }

      const updatedRestaurant = await prisma.restaurant.update({
        where: { id: Number(id) },
        data: {
          name: name || existingRestaurant.name,
        },
      });

      return res.status(StatusCodes.OK).json(updatedRestaurant);
    } catch (error) {
      console.error("Error updating restaurant: ", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Error updating restaurant" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .end(`Method ${method} Not Allowed`);
  }
}
