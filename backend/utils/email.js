import nodeMailer from "nodemailer";

export const sendMail = (data) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: '"Admin Of WibeTec" <hello@wibetec.com>', // sender address
        to: data.to, // list of receivers
        subject: "Daily Report", // Subject line
        text: "Today Income & Expences ", // plain text body
        html: data.html, // html body
    }

    return transporter.sendMail(mailOptions);
}

export const createHTML = ({ salesAmount, newJoineeAmount, purchaseAmount, expencesAmount, branchName, branchAddress }) => {
    const totalAmount = (salesAmount + newJoineeAmount) - (purchaseAmount + expencesAmount);
    const date = new Date().toISOString();
    const dateString = date.slice(0, 10)
    const html = `<main> <h1>Today Details</h1> <h3>Branch Name : ${branchName} , ${branchAddress}.</h3> <p>Hi Admin, This is a Report Of Today :${dateString} </p> <table border="1" style="border-collapse: collapse; text-align: center;"> <thead> <tr> <th style="padding: 5px;">Title</th> <th style="padding: 5px;">Amount</th> </tr> </thead> <tbody> <tr> <td style="padding: 5px;">Sales </td> <td style="padding: 5px;">${salesAmount}</td> </tr> <tr> <td style="padding: 5px;"> New Member </td> <td style="padding: 5px;"> ${newJoineeAmount}</td> </tr> <tr> <td style="padding: 5px;">Purchases</td> <td style="padding: 5px;">-${purchaseAmount}</td> </tr> <tr> <td style="padding: 5px;">Expences</td> <td style="padding: 5px;">-${expencesAmount}</td> </tr> <tr style="background-color:ghostwhite;"> <th style="padding: 5px;">Total</td> <th style="padding: 5px;">₹${totalAmount}</td> </tr> </tbody> </table> </main>`
    return html;
}