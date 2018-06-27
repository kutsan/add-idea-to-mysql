const React = require('react')

const Layout = props =>
	<html lang="en">
		<head>
			<title>
				{props.title}
			</title>
			<link rel="stylesheet" href="/style.css" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0"
			/>
		</head>

		<body>
			<main>
				{props.children}
			</main>

			<script src="/client.js" />
		</body>
	</html>

module.exports = Layout
