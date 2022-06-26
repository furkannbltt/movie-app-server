import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserValidation, getFavoriteValidation, loginUserValidation, sendEmailValidation, userFavoriteValidation } from "../utils/validation-helper";

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mymovie.center.app@gmail.com',
      pass: 'lalqwxvfavpxoqlx'
    }
  });
export const createUser = async (request: Request, response: Response, next: any) => {
    try {
        const { error } = createUserValidation(request.body);
        if (error) {
            return response
                .status(400)
                .json({ message: error.details[0].message });
        }
        const { email, password } = request.body;
        const mailControl = await User.findOne({ email });
        if (mailControl)
            return response.json({ message: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            email,
            password: hashedPassword,
        });
        const token = jwt.sign(

            {
                "_id": createUser._id
            }
            ,
            String(process.env.JWT_SECRET),
            { expiresIn: "365d" }
        );
        return response.json({ status: true, token })

    } catch (error) {
        next(error)
    }
};
export const loginUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error } = loginUserValidation(request.body);
        if (error) {
            return response
                .status(400)
                .json({ message: error.details[0].message });
        }
        const { email, password } = request.body;
        const userControl = await User.findOne({ email });
        if (!userControl)
            return response.json({ message: "Incorrect username or password", status: false });
        const passwordControl = await bcrypt.compare(password, userControl?.password)
        if (!passwordControl)
            return next({ message: "Incorrect username or password", status: false });
        const token = jwt.sign(

            {
                "email": userControl.email,
                "favorites":userControl.userFavorites
            }
            ,
            String(process.env.JWT_SECRET),
            { expiresIn: "365d" }
        );
        return response.json({ status: true, token })

    } catch (error) {
        next(error)
    }
};
export const userFavorite = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error } = userFavoriteValidation(request.body);
        if (error) {
            return response
                .status(400)
                .json({ message: error.details[0].message });
        }
        const { email,id } = request.body;        
        const userControl = await User.findOne({email:email})
        console.log(userControl,"userControl");

        const idControl = await User.findOne( {email:email,"userFavorites": { "id":id }})
        console.log(idControl,"deneme");
        
        if (userControl&&!idControl) {
            await User.findOneAndUpdate(
                {"email":email},
                {
                    $push: { "userFavorites": { id } }

                },
                { new: true }
            );
        }else if(userControl && idControl){
            await User.findOneAndUpdate(
                {"email":email},
                {
                    $pull: { "userFavorites": { id } }

                },
                { new: true }
            );
        }
        return response.json({ status: true })
    } catch (error) {
        next(error)
    }
}
export const getFavorites = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error } = getFavoriteValidation(request.body);
        if (error) {
            return response
                .status(400)
                .json({ message: error.details[0].message });
        }
        const { email } = request.body;
        const user = await User.findOne({email:email})
        return response.json({ status: true,user })
    } catch (error) {
        next(error)
    }
}
export const sendEmail = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { error } = sendEmailValidation(request.body);
        if (error) {
            return response
                .status(400)
                .json({ message: error.details[0].message });
        }
        const {from, to,link } = request.body;
        var mailOptions = {
            from: from,
            to: to,
            subject: 'Movie Center Film Önerisi',
            html: `<html><body style="text-align:center;"><h2>Movie Center</h2><p>${from} kullanıcımızın film önerisi</p><a href="${link}" style="color:white; font-size:25px; border:none; padding:10px; background-color:red; border-radius:15px; border:1px solid red" onMouseOver="this.style.background="white", this.style.color="black""onMouseOut="this.style.background="red", this.style.color="white"">GİT</a></body></html>`
          };
          
          transporter.sendMail(mailOptions, function(error:any, info:any){
            if (error) {
                return response.json({ status: false })
            } else {
                return response.json({ status: true })
            }
          });
       
    } catch (error) {
        next(error)
    }
}
