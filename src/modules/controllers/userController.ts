import type{Response, Request } from "express";
import { serverError } from "../../common/response.js";
import User from "../../models/user.js";
import bcrypt from "bcrypt"
import { credentials } from "../../config/credentials.js";
import JWT from "jsonwebtoken";
import { authValidation } from "../../validation/authValidation.js";


export const singup = async (req: Request, res: Response )=>{
  try {
    const {error : validationError} = await authValidation.validate(req.body)

    if(validationError){
      return res.status(401).json({
        message: validationError.details[0]?.message
      })

    }

    const {name, email, phone, password } = req.body;

    if(!name){
      return res.status(400).json({
        message: "name is required"
      })
    }
    if(!email){
      return res.status(400).json({
        message: "email is required"
      })
    }
    if(!phone){
      return res.status(400).json({
        message: "Phone is required"
      })
    }
    if(!password){
      return res.status(400).json({
        message: "Passowrd is required"
      })
    }

    const existingEmail = await User.findOne({
      where: {
        email
      }
    })

    if(existingEmail){
      return res.status(401).json({
        message: "Email is alredy registerd"
      })
    }

    const existingPhone = await User.findOne({
      where: {phone}
    })

    if(existingPhone){
      return res.status(401).json({
        message: "Phone is alredy registerd"
      })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const users = await User.create({
      name,
      email,
      phone,
      password: hashPassword
    })

    return res.status(201).json({
      succss: true,
      message: "User registerd successfully",
      data: {
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone
      }
    })
  } catch (error) {
    return serverError(res, error)
  }
}

export const login  = async(req: Request, res: Response)=>{
  try {

    const {email, password} = req.body;

    if(!email){
      return res.status(401).json({
        message: "Email is required"
      })
    }

    if(!password){
      return res.status(401).json({
        message: "Password is required"
      })
    }

    const user = await User.findOne({
      where: {
        email
      }
    })

    if(!user){
      return res.status(401).json({
        message: "Invalid Email"
      })
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if(!isPassword){
      return res.status(401).json({
        message: "Invalid Password"
      })
    }

    const token = JWT.sign({
      id: user.id,
      email: user.email,
      phone: user.phone
    }, credentials.JWT_SECRET)

    return res.status(201).json({
      success: true, 
      message: "Login successful", 
      token, 
      data: 
      { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        phone: user.phone 
      }
    })
  } catch (error) {
    return serverError(res, error)
  }
}