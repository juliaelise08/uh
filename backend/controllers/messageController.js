import mongoose from "mongoose";
import messagesList from "../models/messageModels.js";
import nodemailer from 'nodemailer';



//POST message from frontend contact us page to database

const postMessage = async (req, res) => {

    const { enquirerName, enquirerEmail, subject, message } = req.body

    try {

        if (!enquirerName || !enquirerEmail || !subject || !message) {
            return res.status(400).json({ message: 'Please fill in the empty fields' })
        }


        const response = await messagesList.create({ enquirerName, enquirerEmail, subject, message })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'anandlee209@gmail.com',
                // pass: 'ajau ikov ojpg djah',
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: `${enquirerName} <${enquirerEmail}>`,
            to: 'anandlee209@gmail.com',
            subject: `${subject}`,
            text: `Name: ${enquirerName}\nEmail: ${enquirerEmail}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);



        res.status(200).json({ message: "message sent successfully", response, success: true })


    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}


//GET all messages from the database

const getMessages = async (req, res) => {
    try {

        const messages = await messagesList.find({}).sort({ createdAt: -1 })
        res.status(200).json(messages)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}




export { postMessage, getMessages }