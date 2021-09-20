module.exports = code => {
    return `
    <style>
        msg{
            text-align: center;
        }
    </style>
    <div class="msg">
    <h2>Verification code</h2>
    <p>Your passwod recovery code is:</p>
    <h1>
        ${code}
    </h1>
    </div>
    `
}