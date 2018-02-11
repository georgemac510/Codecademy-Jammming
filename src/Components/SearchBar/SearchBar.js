import React from 'react';
import './SearchBar.css';


export class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {term: ''};
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	search() {
		if (this.state.term === '') {
			const savedTerm = sessionStorage.getItem("inputValue");
			this.setState({term: savedTerm}, () => {
        this.props.onSearch(this.state.term);
       });
		} else {
			this.props.onSearch(this.state.term);
		}
	}

	handleTermChange(event) {
		const inputValue = event.target.value;
		this.setState({term: inputValue});
		sessionStorage.setItem("inputValue", inputValue);
	}

	handleKeyPress(event) {
		if (event.key === 'Enter') {
			this.search();
		}
	}

	savedValue() {
		if (sessionStorage.getItem("inputValue") !== undefined) {
			return sessionStorage.getItem("inputValue");
		}
	}

	render() {
		return(
			<div className="SearchBar">
  				<input placeholder="Enter A Song, Album, or Artist"
  				value={this.savedValue()}
  				onChange={this.handleTermChange}
  				onKeyPress={this.handleKeyPress}
  				/>
  				<a onClick={this.search}>SEARCH</a>
			</div>
		);
	}
}

export default SearchBar;