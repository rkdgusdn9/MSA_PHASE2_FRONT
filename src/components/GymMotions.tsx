import * as React from "react";
import Modal from 'react-responsive-modal';
// import GymList from './GymList';

interface IProps {
    curGym: any
}

interface IState {
    open1: boolean
    open: boolean
    uploadFileList: any
}

export default class GymMotions extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)   
        this.state = {
            open: false,
            open1 : false,
            uploadFileList: null
        }

        this.updateGym = this.updateGym.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
		this.uploadGym = this.uploadGym.bind(this)

    }

	public render() {


        const curGym = this.props.curGym
        const { open } = this.state;
        const { open1 } = this.state;
		return (
			<div className="w3-container w3-mobile">
                <div className="w3-panel w3-card w3-round-xlarge">
                <div className="gym-heading">
                    <b>{curGym.name}</b>&nbsp; ({curGym.bigPart}/{curGym.smallPart})
                </div>
                <div className="gym-date">
                    {curGym.uploaded}
                </div>
                
                <div className="gym-img">
                    <img src={curGym.url}/>
                </div>
                <div className="direction-img w3-panel w3-pale-blue w3-leftbar w3-rightbar w3-border-blue">
                    Direction: {curGym.direction}</div>
                </div>
                <div className="gym-done-button w3-hide-medium">
                <div className="btn btn-primary w3-block btn-action" onClick={this.OpenModal}>Add Workout</div>
                    <div className="btn btn-primary w3-block btn-action" onClick={this.onOpenModal}>Edit Workout </div>
                    <div className="btn btn-primary w3-block btn-action" onClick={this.deleteGym.bind(this, curGym.id)}>Delete </div>
                </div>
                <Modal open ={open1} onClose={this.CloseModal}>
				<form className="w3-animate-opacity">
					<div className="form-group">
						<label className="w3-text-blue">Workout Name</label>
						<input type="text" className="w3-input w3-border-blue" id="meme-title-input" placeholder="Enter Name" />
					</div>
					<div className="form-group">
						<label className="w3-text-blue">Big Part</label>
						<input type="text" className="w3-input w3-border-blue" id="meme-tag-input" placeholder="Big Part" />
					</div>
					<div className="form-group">
						<label className="w3-text-blue">Small Part</label>
						<input type="text" className="w3-input w3-border-blue" id="meme-small-input" placeholder="Small Part" />
					</div>
                    <div className="form-group">
						<label className="w3-text-blue">Direction</label>
						<input type="text" className="w3-input w3-border-blue" id="meme-direction-input" placeholder="Direction" />
					</div>
					<div className="form-group">
						<label className="w3-text-blue">Image</label>
						<input type="file" onChange={this.handleFileUpload} className="form-control-file" id="meme-image-input" />
					</div>

					<button type="button" className="w3-btn w3-blue w3-round-xlarge" onClick={this.uploadGym}>Upload</button>
				</form>
			    </Modal>
                <Modal open={open} onClose={this.onCloseModal}>
                        <form className="w3-animate-opacity">
                            <div className="form-group">
                                <label className="w3-text-red">Workout Name</label>
                                <input type="text" className="w3-input w3-border-red" id="meme-edit-title-input" placeholder="Enter Name"/>
                            </div>
                            <div className="form-group">
                                <label className="w3-text-red">Big Part</label>
                                <input type="text" className="w3-input w3-border-red" id="meme-edit-tag-input" placeholder="Enter Big Part"/>
                            </div>
                            <div className="form-group">
                                <label className="w3-text-red">Small Part</label>
                                <input type="text" className="w3-input w3-border-red" id="meme-edit-small-input" placeholder="Enter Small Part"/>
                            </div>
                                <div className="form-group">
                                <label className="w3-text-red">Direction</label>
                                <input type="text" className="w3-input w3-border-red" id="meme-direction-input" placeholder="Direction" />
                            </div>
                            <button type="button" className="w3-btn w3-red w3-round-xlarge" onClick={this.updateGym}>Save</button>
                        </form>
                </Modal>
            </div>
		);
    }

    // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true });
	  };
    
    // Modal Close
    private onCloseModal = () => {
		this.setState({ open: false });
    };

    // Modal open
	private OpenModal = () => {
		this.setState({ open1: true });
	  };
	
	// Modal close
	private CloseModal = () => {
		this.setState({ open1: false });
	};
    
    private handleFileUpload(fileList: any) {
		this.setState({
			uploadFileList: fileList.target.files
		})
	}

    private uploadGym() {
		const NameInput = document.getElementById("meme-title-input") as HTMLInputElement
		const BigPartInput = document.getElementById("meme-tag-input") as HTMLInputElement
        const SmallPartInput = document.getElementById("meme-small-input") as HTMLInputElement
        const DirectionInput = document.getElementById("meme-direction-input") as HTMLInputElement
		const imageFile = this.state.uploadFileList[0]
	
		if (NameInput === null || BigPartInput === null || SmallPartInput === null || DirectionInput === null || imageFile === null) {
			return;
		}
	
		const Name = NameInput.value
		const BigPart = BigPartInput.value
        const SmallPart = SmallPartInput.value
        const Direction = DirectionInput.value
		const url = "https://msabennyfitness2018.azurewebsites.net/api/Gym/upload"
	
		const formData = new FormData()
		formData.append("Name", Name)
		formData.append("BigPart", BigPart)
        formData.append("SmallPart", SmallPart)
        formData.append("Direction", Direction)
		formData.append("image", imageFile)
	
		fetch(url, {
			body: formData,
			headers: {'cache-control': 'no-cache'},
			method: 'POST'
		})
		.then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				location.reload()
			}
		})
	}

    private updateGym(){
        const nameInput = document.getElementById("meme-edit-title-input") as HTMLInputElement
        const bigPartInput = document.getElementById("meme-edit-tag-input") as HTMLInputElement
        const smallPartInput = document.getElementById("meme-edit-small-input") as HTMLInputElement
        const DirectionInput = document.getElementById("meme-direction-input") as HTMLInputElement
    
        if (nameInput === null || bigPartInput === null || smallPartInput === null || DirectionInput === null) {
            return;
        }
    
        const curGym = this.props.curGym
        const url = "https://msabennyfitness2018.azurewebsites.net/api/Gym/" + curGym.id
        const updatedName = nameInput.value
        const updatedbigPart = bigPartInput.value
        const updatedsmallPart = smallPartInput.value
        const updateddirection = DirectionInput.value
        fetch(url, {
            body: JSON.stringify({
                "bigPart": updatedbigPart,
                "direction": updateddirection,
                "height": curGym.height,
                "id": curGym.id,
                "name": updatedName,
                "smallPart": updatedsmallPart,
                "uploaded": curGym.uploaded,
                "url": curGym.url,
                "width": curGym.width
            }),
            headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
            method: 'PUT'
        })
        .then((response : any) => {
            if (!response.ok) {
                // Error State
                alert(response.statusText + " " + url)
            } else {
                location.reload()
            }
        })
    }

    private deleteGym(id: any) {
        const url = "https://msabennyfitness2018.azurewebsites.net/api/Gym/" + id
    
        fetch(url, {
            method: 'DELETE'
        })
        .then((response : any) => {
            if (!response.ok) {
                // Error Response
                alert(response.statusText)
            }
            else {
                location.reload()
            }
        })
    }
}