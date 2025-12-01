import { Resend } from 'resend';
import { config } from "dotenv";


config({path: "./config/config.env"});



if (!process.env.RESEND_API) {
    console.log("Provide RESEND_API in side the .env file")
}


const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Varad Wagh plt <onboarding@resend.dev>',
            to: sendTo,
            subject: subject || 'Message from TSp-Line',
            html: html,
        });

        if (error) {
        return console.error({ error });
    }

    return data

    } catch (error) {
        console.log(error);
    }
}

export default sendEmail;