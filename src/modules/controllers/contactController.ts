import type { Response } from "express";
import type { authRequest } from "../../middleware/authMiddleware.js";
import { serverError } from "../../common/response.js";
import { contactValidation } from "../../validation/contactValidation.js";
import Contact from "../../models/contact.js";
import { Op } from "sequelize";



export const createContact = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: "unautherized"
      })
    }

    const { error } = await contactValidation.validate(req.body)

    if (error) {
      return res.status(401).json({
        message: error.details[0]?.message
      })
    }

    const { name, email, phone, company, address, city, state, country, notes } = req.body;

    const existingPhone = await Contact.findOne({
      where: {
        userId,
        phone
      }
    })

    if (existingPhone) {
      return res.status(409).json({
        messgae: "Phone is alredy existing..!!"
      })
    }

    const contact = await Contact.create({
      userId,
      name,
      email,
      phone,
      company,
      address,
      city,
      state,
      country,
      notes,
      createdBy: userId,
      updatedBy: userId
    });

    return res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: contact
    })
  } catch (error) {
    return serverError(res, error)
  }
}

export const allContact = async (req: authRequest, res: Response) => {
  try {

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: "Unautherized"
      })
    }

    const contacts = await Contact.findAll({
      where: {
        userId: userId

      },
      order: [
        ["createdAt", "DESC"]
      ]
    })

    return res.status(201).json({
      success: true,
      message: "Conatct fetched successfully",
      count: contacts.length,
      data: contacts
    })
  } catch (error) {
    return serverError(res, error)
  }
}

export const singleContact = async (req: authRequest, res: Response) => {
  try {

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: "unautherized"
      })
    }

    const { id } = req.params;

    const contactId = Number(id);

    if (!Number.isInteger(contactId) || contactId <= 0) {
      return res.status(400).json({
        message: "Invalid contact id"
      })
    }

    const contact = await Contact.findOne({
      where: {
        id: contactId,
        userId
      }
    })

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      })
    }

    return res.status(201).json({
      success: true,
      message: "Contact fetched successfully",
      data: contact
    })
  } catch (error) {
    return serverError(res, error)
  }
}

export const updateContact = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: "unautherized"
      })
    }

    const { id } = req.params;

    const contactId = Number(id);

    if (!Number.isInteger(contactId) || contactId <= 0) {
      return res.status(400).json({
        message: "Invalid Contact id"
      })
    }

    const contact = await Contact.findOne({
      where: {
        id: contactId,
        userId
      }
    })

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      })
    }

    const { error } = contactValidation.validate(req.body);
    if (error) {
      return res.status(401).json({
        message: error.details[0]?.message
      })
    }

    const {
      name,
      email,
      phone,
      company,
      address,
      city,
      state,
      country,
      notes
    } = req.body;

    await contact.update({
      name,
      email,
      phone,
      company,
      address,
      city,
      state,
      country,
      notes,
      updatedBy: userId
    });


    return res.status(201).json({
      success: true,
      message: "Contact updated successfully",
      data: contact
    })
  } catch (error) {
    return serverError(res, error)
  }
}

export const deleteContact = async (req: authRequest, res: Response)=>{
  try {
    const userId = req.user?.id;
    if(!userId){
      return res.status(401).json({
        message:"Unauthorized"
      })
    }

    const {id} = req.params;

    const contactId = Number(id);

    if(!Number.isInteger(contactId)|| contactId <= 0){
      return res.status(400).json({
        message: "Invalid Contact Id"
      })
    }

    const contact = await Contact.findOne({
      where: {
        id: contactId,
        userId
      }
    })

    if(!contact){
      return res.status(404).json({
        messsage: "Contact not found"
      })
    }

    await contact.destroy()

    return res.status(201).json({
      success: true,
      message: "Contact deleted successfully",
      data: contact
    })
    
  } catch (error) {
    return serverError(res, error)
  }
}

export const searchContact = async (req: authRequest, res: Response)=>{
  try {
    
    const userId = req.user?.id
    if(!userId){
      return res.status(401).json({
        message: "unautherized"
      })
    }

    const{search }= req.query;

    if(!search  || typeof search  !== "string" || !search .trim()){
    return res.status(400).json({
      message: "searching value is required..!!!"
    })
    }

    const serachValue = search.trim();

    const contact = await Contact.findAll({
      where: {
        userId,
        
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${serachValue}%`
            }
          },
          {
            email: {
              [Op.like]: `%${serachValue}%`
            }
          },
           {
            phone: {
              [Op.like]: `%${serachValue}%`
            }
          }
        ]
      },
      order:[
        ["createdAt", "DESC"]
      ]
    })

    return res.status(201).json({
      success: true,
      message: "Contact searched successfully",
      count: contact.length,
      data: contact
    })
  } catch (error) {
    return serverError(res, error)
  }
}