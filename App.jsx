import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from './component/pagination.jsx';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			debuginfo: 'this is a pagination demo',
			fileList: [],
			pageSize: 5,
			pageCount: 12

		};
		
	}

	getFileList(pageIdx, pageSize){
		//fake, actually need call api to get filelist and update pagecount
		let fl = new Array();
		for(var i=0; i<pageSize; i++){
			fl[i] = (pageIdx-1)*pageSize + i+1;
		}
		this.setState({fileList: fl});		
	}

	reLoadFileList(){		
      	if (this.refs.pagination !== undefined) {
        	this.refs.pagination.initCurrentPage(1);
      	}
      	//fake, actually need call api to get filelist and update pagecount
      	this.getFileList(1,5);
	}

	renderFileList(){
		return <ul>{this.state.fileList.map((f,i)=> {return <li key={i}>{f}</li>;})}</ul>;
	}

	componentWillMount(){
		this.reLoadFileList();
	}
	render(){
		return (
			<div>
				<div className='title'>{this.state.debuginfo}</div>
				<input type='button' value='reload' onClick={this.reLoadFileList.bind(this)}/>
				{this.renderFileList()}
				<Pagination ref='pagination' pageSize={this.state.pageSize} pageCount={this.state.pageCount} onPageChange={this.getFileList.bind(this)}/>
			</div>
		);
	}
}

export default App;