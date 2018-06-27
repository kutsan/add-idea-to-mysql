const React = require('react')
const Layout = require('./Layout.jsx')

class Error extends React.Component {
	render() {
		return (
			<Layout title={this.props.title}>
				<h2>
					{this.props.message}
				</h2>
				<h2>
					{this.props.error.status}
				</h2>
				<pre>
					{this.props.error.stack}
				</pre>
			</Layout>
		)
	}
}

module.exports = Error
