import type{ Response } from "express";

export const serverError = (res: Response, error: unknown)=>{
  console.error(error);

  return res.status(500).json({
    messae: "Internal server error"
  })
}