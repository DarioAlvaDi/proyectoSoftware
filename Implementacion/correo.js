const nodemailer = require("nodemailer");

enviarMail = async()=> {
    
    const config = {
        host : 'smtp.gmail.com',
        port : 587,
        auth : {
            user : 'ledesma.ramirez.jose.emiliano@gmail.com',
            pass : 'fums ozuy asmz lfst'
        }
    }

    const mensaje = {
        from : 'ledesma.ramirez.jose.emiliano@gmail.com',
        to : 'kibeji3510@frandin.com',
        subject : 'Hola, Pichula',
        text : 'Envio de correo desde node js utilizando nodemailer.'
    }

    const transport = nodemailer.createTransport(config);

    try {
        const info = await transport.sendMail(mensaje);
        console.log("Correo enviado:", info);
    } catch(error){
        console.error("Error al enviar el correo:", error);
    }
}

enviarMail();