import * as React from "react";
import MediaStreamRecorder from '../../node_modules/msr';



interface IProps {
    gyms: any[],
    selectNewGym: any,
    searchByTag: any
}

export default class GymList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)   
        this.searchByTag = this.searchByTag.bind(this)
    }

	public render() {
		return (
			<div className="container gym-list-wrapper">
                <div className="row meme-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control w3-border w3-border-blue" placeholder="Big Part Search" />
                        <div className="input-group-append">
                        <div className="btn" onClick={this.searchTagByVoice}><i className="fa fa-microphone" /></div>
                            <div className="w3-button w3-round-xlarge w3-border w3-border-blue" onClick = {this.searchByTag}>Search</div>
                        </div>
                    </div>  
                </div>
                <div className="big-table w3-mobile">
                    <table className="table">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
		);
    }

 

    private searchTagByVoice(){
        const mediaConstraints = {
            audio: true
        }
        const onMediaSuccess = (stream: any) => {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.ondataavailable = (blob: any) => {
                postAudio(blob);
                mediaRecorder.stop()
            }
            mediaRecorder.start(3000);
        }
    
        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)
    
        function onMediaError(e: any) {
            console.error('media error', e);
        }

        function postAudio(blob){

            let accessToken: any;
                fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
                    headers: {
                        'Content-Length': '0',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Ocp-Apim-Subscription-Key': 'b978d7819c4e40e4beeb82dc016f2fbb'
                    },
                    method: 'POST'
                }).then((response) => {
                    console.log(response.text())
                    return response.text()
                }).then((response) => {
                    console.log(response)
                    accessToken = response
                }).catch((error) => {
                    console.log("Error", error)
                });
    
                console.log(accessToken); 

                ///////////////////////////////////
                const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
                // posting audio
                fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
                    body: blob, // this is a .wav audio file    
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer' + accessToken,
                        'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
                        'Ocp-Apim-Subscription-Key': '7f1cfb2c308f441e83b7b37b96081cb2'
                    },    
                    method: 'POST'
                }).then((res) => {
                    return res.json()
                }).then((res: any) => {
                    console.log(res)
                    textBox.value = (res.DisplayText as string).slice(0,-1)   
                }).catch((error) => {
                    console.log("Error", error)
                });
    
        }


 //  .slice(0, -1)




    }
        /////////////////////////////////

        
    
    

    // Construct table using meme list
	private createTable() {
        const table: any[] = []
        const gymList = this.props.gyms
        if (gymList == null) {
            return table
        }
        
        table.push(<tr className="w3-blue w3-card">
           {/*<th>ID</th>*/}  
            <th>Name</th>
            <th>Big Part</th>
            <th>Small Part</th>
            </tr>)    


        for (let i = 0; i < gymList.length; i++) {
            const children: any[] = []
            const gym = gymList[i]
            // children.push(<td key={"id" + i}>{gym.id}</td>)
            children.push(<td key={"name" + i}>{gym.name}</td>)
            children.push(<td key={"bigpart" + i}>{gym.bigPart}</td>)
            children.push(<td key={"smallpart" + i}>{gym.smallPart}</td>)
            table.push(<tr className="w3-card gym-list-table w3-bordered w3-hoverable w3-hover-green" key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
        }
        return table
    }
    
    // Meme selection handler to display selected meme in details component
    private selectRow(index: any) {
        const selectedGym = this.props.gyms[index]
        if (selectedGym != null) {
            this.props.selectNewGym(selectedGym)
        }
    }

    // Search meme by tag
    private searchByTag() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const bigPart = textBox.value 
        this.props.searchByTag(bigPart)  
    }

}