import type { authRequest } from "../../middleware/authMiddleware.js";
import type { Response } from "express";
import { serverError } from "../../common/response.js";
import { contactGroupValidation } from "../../validation/contactGroupValidation.js";
import ContactGroup from "../../models/contactGroup.js";
import { contactValidation } from "../../validation/contactValidation.js";

export const createContactGroup = async (req: authRequest, res: Response) => {
  try {

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "unautherizrd"
      })
    }

    const { error } = contactGroupValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0]?.message
      })
    }

    const { name, description } = req.body;

    const existingGroup = await ContactGroup.findOne({
      where: {
        userId,
        name
      }
    })

    if (existingGroup) {
      return res.status(409).json({
        message: "Group alredy existing"
      })
    }

    const group = await ContactGroup.create({
      userId,
      name,
      description: description,
      createdBy: userId,
      updatedBy: userId
    })


    return res.status(201).json({
      success: true,
      message: "Contack Created successfully",
      data: group
    })
  } catch (error) {
    return serverError(res, error)
  }
}

export const allContactGroup = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false, message: "Unauthorized"
      });
    }
    const groups = await ContactGroup.findAll({
      where: { userId },
      order: [
        ["createdAt", "DESC"]
      ]
    });

    return res.status(201).json({
      success: true,
      message: "Contact groups fetched successfully",
      data: groups
    })
  } catch (error) {
    return serverError(res, error)
  }
}

export const singleContactGroup = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const group = await ContactGroup.findOne({
      where: {
        id,
        userId
      }
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Contact group not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact group fetched successfully",
      data: group
    });

  } catch (error) {
    return serverError(res, error)
  }
}

export const updateContactGroup = async (req: authRequest,res: Response) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

   
        const { error } = contactGroupValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0]?.message
            });
        }

        const { name, description } = req.body;

      
        const group = await ContactGroup.findOne({
            where: {
                id,
                userId
            }
        });

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Contact group not found"
            });
        }

  
        if (name && name !== group.name) {

            const existingGroup = await ContactGroup.findOne({
                where: {
                    userId,
                    name
                }
            });

            if (existingGroup) {
                return res.status(409).json({
                    success: false,
                    message: "Group already exists"
                });
            }
        }

    
        await group.update({
            name: name ?? group.name,
            description: description ?? group.description,
            updatedBy: userId
        });

        return res.status(200).json({
            success: true,
            message: "Contact group updated successfully",
            data: group
        });

    } catch (error) {
        return serverError(res, error);
    }
};

export const deleteContactGroup = async (req: authRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // Find group belonging to logged-in user
        const group = await ContactGroup.findOne({
            where: {
                id,
                userId
            }
        });

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Contact group not found"
            });
        }

        // Delete group
        await group.destroy();

        return res.status(200).json({
            success: true,
            message: "Contact group deleted successfully",
            data: group
        });

    } catch (error) {
        return serverError(res, error);
    }
};



