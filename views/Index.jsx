const React = require('react')
const Layout = require('./Layout.jsx')

class Index extends React.Component {
	render() {
		return (
			<Layout title={this.props.title}>
				<div className="take-input">
					<textarea
						cols="50"
						rows="3"
						maxLength="140"
						placeholder="Use your fingers..."
						className="take-input__input"
					/>
					<button type="button" className="take-input__send-button">
						&gt;|
					</button>
				</div>

				<div className="results">
					{this.props.data.map(e =>
						<div className="results__row" key={e.ID}>
							<div className="results__text" key={e.ID}>
								{e.IDEA}
							</div>
						</div>
					)}
				</div>
			</Layout>
		)
	}
}

module.exports = Index
