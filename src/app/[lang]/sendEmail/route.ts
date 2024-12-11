import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const res = await request.json();
  const { to, subject, html } = res;

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Possivel Cliente" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject,
      html,
      headers: {
        "X-Priority": "1", 
        "X-MSMail-Priority": "High",
        Importance: "high", 
      },
    });

    return NextResponse.json(
      { message: "E-mail enviado com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { message: "Falha ao enviar e-mail", error: error.message },
      { status: 500 }
    );
  }
}
