import * as React from "react";

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
			<div className="container meme-list-wrapper">
                <div className="row meme-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Big Part" />
                        <div className="input-group-append">
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByTag}>Search</div>
                        </div>
                    </div>  
                </div>
                <div className="row meme-list-table">
                    <table className="table table-striped">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
		);
    }

    

    // Construct table using meme list
	private createTable() {
        const table:any[] = []
        const gymList = this.props.gyms
        if (gymList == null) {
            return table
        }
        
        table.push(<tr>
            <th>ID</th>
            <th>Name</th>
            <th>Big Part</th>
            <th>Small Part</th>
            </tr>)    


        for (let i = 0; i < gymList.length; i++) {
            const children = []
            const gym = gymList[i]
            children.push(<td key={"id" + i}>{gym.id}</td>)
            children.push(<td key={"name" + i}>{gym.name}</td>)
            children.push(<td key={"bigpart" + i}>{gym.bigPart}</td>)
            children.push(<td key={"smallpart" + i}>{gym.smallPart}</td>)
            table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
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