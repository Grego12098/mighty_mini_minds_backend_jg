import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:"outlook",
    auth: {
        user:"mightyminiminds@outlook.com",
        pass:"Mooovers&Milkshakers"
    }
})

export const sendEmail = (req, res) => {
    const { email,
            username,
            mood,
            question_one,
            question_two,
            question_three,
            answer_one,
            answer_two,
            answer_three } = req.body;

        const options = {
        from: "mightyminiminds@outlook.com",
        to: email,
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


