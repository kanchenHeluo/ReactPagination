import React from 'react';
import Pagination from './Component/Pagination';

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			fileList: [],
			pageSize: 5,
			pageCount: 12
		};
		this.getFileList = this.getFileList.bind(this);	
		this.reLoadFileList = this.reLoadFileList.bind(this);	
	}

	componentWillMount(){
		this.reLoadFileList();
	}

	getFileList(pageIdx, pageSize){
		const fl = [];
		for(let i=0; i<pageSize; i++){
			fl[i] = (pageIdx-1)*pageSize + i + 1;
		}
		this.setState({fileList: fl});		
	}

	reLoadFileList(){		
		if (this.pagination !== undefined) {
			this.pagination.initCurrentPage(1);
		}
		this.getFileList(1,5);
	}

	renderFileList(){
		return <ul>{this.state.fileList.map(f=>(<li key={f}>{f}</li>))}</ul>;
	}

	render(){
		return (
			<div>
				<input type="button" value="reload" onClick={this.reLoadFileList}/>
				{this.renderFileList()}
				<Pagination ref={(c) => {this.pagination = c;}} pageSize={this.state.pageSize} pageCount={this.state.pageCount} onPageChange={this.getFileList}/>
			</div>
		);
	}
}

export default App;
