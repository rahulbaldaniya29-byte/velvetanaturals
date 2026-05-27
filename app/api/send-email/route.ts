
import { Resend } from 'resend';

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req: Request) {

  try {

    const body = await req.json();


    // CUSTOMER EMAIL

    await resend.emails.send({

      from: 'Velveta <onboarding@resend.dev>',

      to: body.email,

      subject: 'Order Confirmed - Velveta Naturals',

      html: `
<div style="
  background:#f5f1e8;
  padding:15px;
  font-family:Arial,sans-serif;
">

  <div style="
    max-width:500px;
    margin:auto;
    background:#0f1115;
    border-radius:25px;
    overflow:hidden;
  ">

    <div style="
      background:linear-gradient(135deg,#173926,#2f5d43);
      padding:35px 20px;
      text-align:center;
    ">

      <h1 style="
        color:#c3955d;
        font-size:34px;
        margin:0;
        letter-spacing:2px;
      ">
        VELVETA
      </h1>

      <p style="
        color:white;
        margin-top:12px;
        font-size:15px;
      ">
        Premium Ayurvedic Wellness
      </p>

    </div>

    <div style="padding:30px 22px;color:white;">

      <h2 style="
        font-size:28px;
        line-height:1.5;
      ">
        Thank You ${body.name} 😄
      </h2>

      <p style="
        font-size:17px;
        line-height:1.9;
        color:#d4d4d4;
      ">
        Your order has been confirmed successfully.
        <br /><br />
        Thank you for choosing Velveta Naturals 🌿
      </p>

      <div style="
        background:#1d1d1d;
        border-radius:22px;
        padding:28px 20px;
        margin-top:35px;
        text-align:center;
      ">

        <p style="color:#cfcfcf;font-size:18px;">
          Order Amount
        </p>

        <h1 style="
          color:#c3955d;
          font-size:50px;
          margin-top:18px;
        ">
          ₹${body.amount}
        </h1>

      </div>

    </div>

    <div style="
      background:#173926;
      text-align:center;
      padding:20px;
    ">

      <p style="
        color:white;
        margin:0;
        font-size:14px;
      ">
        © 2026 Velveta Naturals
      </p>

    </div>

  </div>

</div>
`,

    });


    // ADMIN EMAIL

    await resend.emails.send({

      from: 'Velveta <onboarding@resend.dev>',

      to: 'YOUR_GMAIL@gmail.com',

      subject: '🔥 New Order Received',

      html: `

        <div style="
          font-family:Arial;
          padding:30px;
          background:#f5f5f5;
        ">

          <div style="
            background:white;
            padding:30px;
            border-radius:20px;
          ">

            <h1 style="color:#173926;">
              New Order Received 🚀
            </h1>

            <p>
              <strong>Customer:</strong>
              ${body.name}
            </p>

            <p>
              <strong>Email:</strong>
              ${body.email}
            </p>

            <p>
              <strong>Amount:</strong>
              ₹${body.amount}
            </p>

          </div>

        </div>

      `,

    });


    return Response.json({
      success: true,
    });

  } catch (error) {

    return Response.json({
      success: false,
    });

  }

}
