import * as React from 'react';
import './App.css';
import GymList from './components/GymList';
import GymMotions from './components/GymMotions';
import GymRats from './GymRats.png';




interface IState {
	curGym: any,
	gyms: any[],
	open: boolean,
	uploadFileList: any,
}

class App extends React.Component<{}, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			curGym: {"id":0, "name":"Loading ","url":"","bigPart":"","uploaded":"","width":"0","height":"0"},
			gyms: [],
			open: false,
			uploadFileList: null
		}     	
		this.selectNewGym = this.selectNewGym.bind(this)
		this.fetchGyms = this.fetchGyms.bind(this)
		this.fetchGyms("")
		
		
	}

	public render() {
		
		return (
		<div>
			<div className="header-wrapper w3-mobile">
				<div className="container header w3-mobile">
					<img src={GymRats} height='120'/>&nbsp; Design Your Body &nbsp;
				</div>
			</div>
			<div className="container">
				<div className="w3-row">
					<div className="w3-container w3-half">
						<GymMotions curGym={this.state.curGym} />
					</div>
					<div className="w3-container w3-half">
						<GymList gyms={this.state.gyms} selectNewGym={this.selectNewGym} searchByTag={this.fetchGyms}/>
					</div>
				</div>
			</div>
			<footer className="footer">
				Copyright © 2018 All Rights Reserved
			</footer>
		</div>
		);
	}


	
	// Change selected meme
	private selectNewGym(newGym: any) {
		this.setState({
			curGym: newGym
		})
	}

	private fetchGyms(bigPart: any) {
		let url = "https://msabennyfitness2018.azurewebsites.net/api/Gym"
		if (bigPart !== "") {
			url += "/bigPart?=" + bigPart
		}
		fetch(url, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(json => {
			let curGym = json[0]
			if (curGym === undefined) {
				curGym = {"id":0, "name":"No Workout found","url":"","bigPart":"Input Correct Big Part","uploaded":"","width":"0","height":"0"}
			}
			this.setState({
				curGym,
				gyms: json
			})
		});

			//////////////////////////////

			





	}

	

	
}

export default App;
