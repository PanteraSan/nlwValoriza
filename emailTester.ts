import nodemailer from 'nodemailer'

const emailConfig = {
 host: 'smtp.gmail.com',
 port: 587, 
 secure: true,
 auth: {
  user: 'trabalhoredeszabbix@gmail.com',
  pass: 'amxfn4f9'
 }
}

const emailToSend = {
 from: 'trabalhoredeszabbix@gmail.com',
 to: 'gabriel.muller.soares@gmail.com',
 subject: 'Teste de mailer via node',
 text: 'estamos aqui testando o email do node!'
}

const sender = nodemailer.createTransport(emailConfig)

sender.sendMail(emailToSend, (error) => {
 if (error) {
  console.log(error)
 } else {
  console.log('Email sent!!')
 }
})