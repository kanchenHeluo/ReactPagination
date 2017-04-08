import React from 'react';
import Pagination from './Component/Pagination';
import 'whatwg-fetch';

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			fileList: [],
			pageSize: 5,
			pageCount: 12
		};
		this.loadFileList = this.loadFileList.bind(this);	
		this.reLoadFileList = this.reLoadFileList.bind(this);	
	}

	componentWillMount(){
		this.reLoadFileList();
	}

	componentDidMount(){
		this.loadFileList(1,this.state.pageSize);
	}

	loadFileList(pageIdx, pageSize){
		fetch('http://localhost:8081/filelist', {
			method: 'get',
			mode: 'cors'
		}).then(function(resp){
			return resp.json();	
		}).then(function(json){			
			var ret = JSON.parse(json)['data'].map(a => a.content);
			const fl = [];
			const len = ret.length;
			var index=0;
			for(let i=(pageIdx-1)*pageSize; i<pageIdx*pageSize && len; i++){
				fl[index++] = ret[i];
			}
			this.setState({fileList: fl});
			this.setState({pageCount: Math.ceil(len/this.state.pageSize)})

		}.bind(this));		
	}

	reLoadFileList(){		
		if (this.pagination !== undefined) {
			this.pagination.initCurrentPage(1);
		}
		this.loadFileList(1,this.state.pageSize);
	}

	renderFileList(){
		return <ul>{this.state.fileList.map(f=>(<li key={f}>{f}</li>))}</ul>;
	}

	render(){
		return (
			<div>
				<input type="button" value="reload" onClick={this.reLoadFileList}/>
				{this.renderFileList()}
				<Pagination ref={(c) => {this.pagination = c;}} pageSize={this.state.pageSize} pageCount={this.state.pageCount} onPageChange={this.loadFileList}/>
			</div>
		);
	}
}

export default App;
