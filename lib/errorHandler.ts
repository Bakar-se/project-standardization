// utils/errorHandler.ts
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";

interface ErrorResponse {
  statusCode: number;
  message: string;
}

export function handlePrismaError(error: Prisma.PrismaClientKnownRequestError): ErrorResponse {
  switch (error.code) {
    case "P2000":
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: "The provided value is too long for the column.",
      };
    case "P2001":
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: "The record does not exist.",
      };
    case "P2002":
      return {
        statusCode: StatusCodes.CONFLICT,
        message: `A unique constraint failed on the fields: ${error.meta?.target}`,
      };
    case "P2003":
      return {
        statusCode: StatusCodes.FORBIDDEN,
        message: `A foreign key constraint failed on the field: ${error.meta?.field_name}`,
      };
    case "P2004":
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: "The record is invalid.",
      };
    case "P2010":
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: "The operation could not be performed.",
      };
    default:
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `A known database error occurred. Details: ${error.message}`,
      };
  }
}
