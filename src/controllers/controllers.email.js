import {entries} from "../models/entryJournalModel.js";
import {users} from "../models/usersModel.js";

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:"outlook",
    auth: {
        user:"mightyminiminds@outlook.com",
        pass:"Mooovers&Milkshakers"
    }
})

export const sendEmail = async (req, res) => {
    const { entry_id } = req.params;

    const entry = await entries.findOne({
        where: {
            uuid: entry_id,
        }
    });

    const { mood, 
            question_one, 
            question_two, 
            question_three, 
            answer_one,
            answer_two, 
            answer_three, 
            user_uuid } = entry;
    
    const { username, contact_email } = await users.findOne({
        where: {
            uuid: user_uuid,
        }
    });

        const options = {
        from: "mightyminiminds@outlook.com",
        to: contact_email,
        subject: `Here is ${username}'s entry for today!`,
        text: 
        `Mood: ${mood}/4,
        ${question_one}: ${answer_one},
        ${question_two}: ${answer_two},
        ${question_three}: ${answer_three},
        I hope this can help.`,        
        }

     transporter.sendMail(options, (err, info) => {
            if(err) {
                console.log(err);
            }
            console.log("you sent an email!")
        })

}


