import type{ Response } from "express";
import type{ authRequest } from "../../middleware/authMiddleware.js";
import { serverError } from "../../common/response.js";


export const create = async (req: authRequest, res: Response)=>{
  try {
      const userId = req.user?.id;
      if(!userId){
        return res.status(401).json({
          message: "unautherized"
        })
      }

      const {name} = req.body;



    return res.status(201).json({
      message: "ok"
    })
  } catch (error) {
    return serverError(res, error)
  }
}