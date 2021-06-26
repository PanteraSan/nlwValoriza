import nodemailer from 'nodemailer'

interface IEmailtoSend {
 from: string;
 to: string;
 subject: string;
 text: string
}

class EmailHandler {
 
 emailConfig = {
  host: 'smtp.gmail.com',
  port: 587, 
  secure: false,
  auth: {
   user: 'seuEmailAqui@email.com',
   pass: 'suaSenha'
  }
 }

 send(email: IEmailtoSend) {
  const sender = nodemailer.createTransport(this.emailConfig)

  sender.sendMail(email, (error) => {
   if (error) {
   
    throw new Error
   } else {
    console.log('Email sent!')
    
    return email
   }
  })

 }
}

export { EmailHandler }