function generateVerificationEmailTemplate(username, userId, token) {
    return `
		<!doctype html>
		<html>
			<body>
				<tbody>
					<tr>
						<td align="center">
							<table style="border: 1px solid #eaeaea; border-radius: 5px; margin: 40px 0" width="600" cellspacing="0" cellpadding="40" border="0">
								<tbody>
									<tr>
										<td align="center">
											<div
												style="
													font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
														'Droid Sans', 'Helvetica Neue', sans-serif;
													text-align: left;
													width: 465px;
												"
											>
												<table style="width: 100% !important" width="100%" cellspacing="0" cellpadding="0" border="0">
													<tbody>
														<tr>
															<td align="center">
																<div>
																	<img
																		src="http://${process.env.HOST}:${process.env.CLIENTSIDE_PORT}/img/LOGO.a1787424.svg"
																		alt="devsBunker logo"
																		width="400"
																		height="120"
																	/>
																</div>
																<h1
																	style="
																		color: #000;
																		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
																			'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
																		font-size: 24px;
																		font-weight: normal;
																		margin: 30px 0;
																		padding: 0;
																	"
																>
																		Verify your account
																</h1>
															</td>
														</tr>
													</tbody>
												</table>

												<p
													style="
														color: #000;
														font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
															'Droid Sans', 'Helvetica Neue', sans-serif;
														font-size: 14px;
														line-height: 24px;
													"
												>
													Hello <b>${username}</b>,
												</p>
												<p
													style="
														color: #000;
														font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
															'Droid Sans', 'Helvetica Neue', sans-serif;
														font-size: 14px;
														line-height: 24px;
													"
												>
													We just need to verify your email address before you can keep using <b>devsBunker</b>.
												</p>
												<br />

												<p
													style="
														color: #000;
														font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
															'Droid Sans', 'Helvetica Neue', sans-serif;
														font-size: 14px;
														line-height: 24px;
													"
												>
													To complete the login process, please click the button below:
												</p>
												<br />

												<table style="width: 100% !important" width="100%" cellspacing="0" cellpadding="0" border="0">
													<tbody>
														<tr>
															<td align="center">
																<div>
																	<a
																		href="http://${process.env.HOST}:${process.env.CLIENTSIDE_PORT}/user/verify/${userId}/${token}"
																		style="
																			background-color: #000;
																			border-radius: 5px;
																			color: #fff;
																			display: inline-block;
																			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
																				'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
																			font-size: 12px;
																			font-weight: 500;
																			line-height: 50px;
																			text-align: center;
																			text-decoration: none;
																			width: 200px;
																		"
																		target="_blank"
																		>VERIFY</a
																	>
																</div>
															</td>
														</tr>
													</tbody>
												</table>

												<br />
												<p
													style="
														color: #000;
														font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
															'Droid Sans', 'Helvetica Neue', sans-serif;
														font-size: 14px;
														line-height: 24px;
													"
												>
													Or copy and paste this URL into a new tab of your browser:
												</p>
												<p
													style="
														color: #000;
														font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
															'Droid Sans', 'Helvetica Neue', sans-serif;
														font-size: 14px;
														line-height: 24px;
													"
												>
													<a
														href="http://${process.env.HOST}:${process.env.CLIENTSIDE_PORT}/user/verify/${userId}/${token}"
														style="color: #067df7; text-decoration: none"
														target="_blank"
														>http://${process.env.HOST}:${process.env.CLIENTSIDE_PORT}/user/verify/${userId}/${token}</a
													>
												</p>
												<br />
												<hr style="border: none; border-top: 1px solid #eaeaea; margin: 26px 0; width: 100%" />
												<p
													style="
														color: #666666;
														font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
															'Droid Sans', 'Helvetica Neue', sans-serif;
														font-size: 12px;
														line-height: 24px;
													"
												>
													If you think you have received this email due to an error, please ignore this email. If you
													are concerned about your account's safety, please reply to this email to get in touch with us.
												</p>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>

			</body>
		</html>
	`;
}

export { generateVerificationEmailTemplate };
