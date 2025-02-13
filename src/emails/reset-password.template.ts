export const resetPasswordMail = (token: string) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            :root {
                --main-color: #7f975d;
            }
            body, p, h1, h2, h3, h4, h5, h6, a {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                color: #333333;
            }
            body {
                background-color: #f4f4f4;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background-color: #ffffff;
                margin: 0 auto;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .header {
                background-color: #FFFFFF;
                padding: 8px;
                text-align: center;
                border-bottom: 5px solid #7f975d;
            }

            .header img.system-logo {
                max-width: 150px;
                height: auto;
            }
            .business-logo-title {
                align-items: center;
                justify-content: center;
                text-align: center;
                margin-bottom: 20px;
            }
            .business-logo {
                max-width: 100px;
                height: auto;
                margin-top: 10px;
            }
            .content {
                padding: 20px;
            }
            .content h2 {
                color: #7f975d;
                margin-bottom: 15px;
                font-size: 24px;
                text-align: start;
            }
            .content p {
                line-height: 1.6;
                margin-bottom: 15px;
                font-size: 16px;
                text-align: justify;
            }
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .btn {
                display: inline-block;
                padding: 12px 25px;
                font-size: 16px;
                color: #ffffff;
                background-color: #7f975d;
                text-decoration: none;
                border-radius: 25px;
                transition: background-color 0.3s ease;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 15px;
                text-align: center;
                font-size: 14px;
                color: #777777;
            }
            .footer a {
                color: #7f975d;
                text-decoration: none;
                margin: 0 5px;
                font-weight: bold;
            }

            /* Responsividade */
            @media only screen and (max-width: 600px) {
                .container {
                    width: 100% !important;
                    border-radius: 0;
                }
                .header img.system-logo {
                    max-width: 120px;
                }
                .business-logo {
                    max-width: 80px;
                }
                .btn {
                    width: 100%;
                    padding: 15px 0;
                }
                .content p {
                    text-align: left;
                }
            }
        </style>
    </head>
    <body>
    <div class="container">
        <!-- Cabeçalho com Logo do Sistema -->
        <div class="header">
            <img src="cid:logo@metabolismo" alt="${process.env.APP_NAME} Logo" class="system-logo">
            <h2 style="color: black;">${process.env.APP_NAME}</h2>
        </div>

        <!-- Conteúdo Principal -->
        <div class="content">
            <h2>Redefinição de senha</h2>
            <p>Foi solicitado recentemente um link para redifinir sua senha, se não foi você desconsidere esse email.</p>
            <p>Segue o link abaixo no botão para redefinir a senha</p>
            <div class="button-container">
                <a href="${process.env.APP_URL}/forgotPassword/${token}" class="btn" style="color: black;">
                    Redefinir a senha
                </a>
            </div>
            <p>Atenciosamente, <b>${process.env.APP_NAME}</b></p>
        </div>
    </div>
    </body>
    </html>
`;
