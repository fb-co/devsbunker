function generateVerificationEmailTemplate(username, userId, token) {
    return `
		<div style="width: 500px; height: 500px; background-color: white; margin: auto;">
			<div style="width: 70%; height: 15%; margin: auto;">
				<img style="width: 100%;  height: 100%;" src="http://${process.env.HOST}:${process.env.CLIENTSIDE_PORT}/img/LOGO.a1787424.svg" alt="devsBunker logo that doesn't work" />
			</div>
			<p style="font-size: 16px; color: black;">
				Hi ${username}, <br>
				We just need to verify your email address before you can keep using <b>devsBunker</b>.
			</p>

			<p style="font-size: 16px; color: black;">
				Verify your email address by clicking on the button below. 
			</p>

			<div style="display: flex; align-items: center; justify-content: center; border-radius: 12px; background-color: #49cce5; width: 100px; height: 50px; position: relative;">
				<a style="text-decoration: none; font-size: 18px; color: white; font-weight: bold; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" href="http://${process.env.HOST}:${process.env.CLIENTSIDE_PORT}/user/verify/${userId}/${token}">here</a>
			</div>

			<p style="font-size: 16px; color: black;">
				Thanks!
			</p>
			<p style="color: grey">
				- Folgoni Borsa Company
			</p>
		</div>
	`;
}

export { generateVerificationEmailTemplate };
