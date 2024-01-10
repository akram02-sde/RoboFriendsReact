import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

function App() {
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		robots: [],
	// 		searchfield: ''
	// 	}
	// }
	const [robots, setRobots] = useState([])
	const [searchfield, setSearchfield] = useState('')
	const [count, setCount] = useState(0);

	// componentDidMount() {
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// 	.then(response =>  response.json())
	// 	.then(users => this.setState({robots: users}));	
	// }
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response =>  response.json())
		.then(users => setRobots(users));	
		// console.log(count)
	}, []) //[{count}]) only run if count changes

    //this is not an inherent function thats why we have to use this arrow function
	const onSearchChange = (event) => {
		return setSearchfield(event.target.value)
	}
		// const {robots, searchfield} = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		
		if (robots.length === 0) {
			return <h1 className='tc'>Loading</h1>
		}
		else{
		return (
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				{/* <button onClick={() => setCount(count + 1)}>Click Me!</button> */}
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundry> 
						<CardList robots={filteredRobots}/> {/*children of scroll and error aka CardList props.children*/}
					</ErrorBoundry>
				</Scroll>
			</div>
		    );
	    }
    }	


export default App;