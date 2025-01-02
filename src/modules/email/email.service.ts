import { createTransport } from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private transport = createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  async sendEmail(to: string, subject: string, htmlContent: string) {
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to,
      subject,
      html: htmlContent,
      attachments: [
        {
          filename: 'logo_provisoriaHeader.svg',
          path: 'src/emails/logo_provisoriaHeader.svg',
          cid: 'logo@metabolismo', // Content-ID
        },
      ],
    };
    try {
      const info = await this.transport.sendMail(mailOptions);
      console.log('E-mail enviado:', info.response);
    } catch (error) {
      console.log('erro ao enviar email: ', error);
      throw new Error('Erro ao enviar email');
    }
  }
}
