import React from 'react';

const styles = require('./Pagination.css');

class Pagination extends React.Component {
  static propTypes = {
    pageCount: React.PropTypes.number.isRequired,
    pageSize: React.PropTypes.number.isRequired,
    onPageChange: React.PropTypes.func.isRequired,
    currentPage: React.PropTypes.number,
    pageRangeDisplayed: React.PropTypes.number,
    breakLabel: React.PropTypes.string    
  };

  static defaultProps = {
    currentPage: 1,
    pageCount: 1,
    pageSize: 5,
    breakLabel: '...',
    pageRangeDisplayed: 3
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.currentPage
    };
    this.pageDown = this.pageDown.bind(this);
    this.pageUp = this.pageUp.bind(this);
    this.pageGo = this.pageGo.bind(this);
    this.extendLeftRange = this.extendLeftRange.bind(this);
    this.extendRightRange = this.extendRightRange.bind(this);
  }

  getActiveClassName(idx){
    return idx === this.state.currentPage ? styles.active : '';
  }

  initCurrentPage(i){
    this.setState({currentPage: i});
  }

  extendLeftRange(){
    this.setState({currentPage: this.state.currentPage-this.props.pageRangeDisplayed});
  }

  extendRightRange(){
    this.setState({currentPage: this.state.currentPage+this.props.pageRangeDisplayed});
  }

  pageUp(){
    if(this.state.currentPage > 1){
      this.switchPage(this.state.currentPage-1);
    }
  }
  pageDown(){
    if(this.state.currentPage < this.props.pageCount){
      this.switchPage(this.state.currentPage+1);
    }
  }
  
  pageGo(e){
    this.switchPage(parseInt(e.target.innerText,10));
  }

  switchPage(i){     
    if(typeof this.props.onPageChange === 'function'){
      this.setState({currentPage: i}, () => {
        this.props.onPageChange(this.state.currentPage, this.props.pageSize);
      });
    }
  }

  renderPages(){   
    const arr = [];
    for(let i=0; i<this.props.pageCount; i++){
      arr[i] = i+1;
    }

    let leftBlock;
    let midBlock;
    let rightBlock;
    let leftRange;
    let rightRange;
    if(this.state.currentPage - Math.ceil(this.props.pageRangeDisplayed/2) <= this.props.pageRangeDisplayed){
      let maxIdx = this.state.currentPage+1 > this.props.pageRangeDisplayed ? this.state.currentPage+1 : this.props.pageRangeDisplayed;
      maxIdx = maxIdx >= this.props.pageCount-1 ? this.props.pageCount : maxIdx;
      leftBlock = arr.filter(a => a<=maxIdx).map((a,i) => (<a key={i} className={this.getActiveClassName(a)} onClick={this.pageGo}>{a}</a>));
      if(this.props.pageCount > maxIdx){      
        rightRange = <a onClick={this.extendRightRange}>{this.props.breakLabel}</a>;
        rightBlock = <a onClick={this.pageGo}>{this.props.pageCount}</a>;
      }
    }else if(this.state.currentPage + Math.ceil(this.props.pageRangeDisplayed/2) >= this.props.pageCount - this.props.pageRangeDisplayed + 1){
      leftBlock = <a onClick={this.pageGo}>1</a>;
      leftRange = <a onClick={this.extendLeftRange}>{this.props.breakLabel}</a>;

      const minIdx = this.state.currentPage-1 < this.props.pageCount - this.props.pageRangeDisplayed + 1 ? this.state.currentPage-1 : this.props.pageCount - this.props.pageRangeDisplayed + 1;
      rightBlock = arr.filter(a => a>=minIdx).map((a,i) => (<a key={i} className={this.getActiveClassName(a)} onClick={this.pageGo}>{a}</a>));
    }else{
      leftBlock = <a onClick={this.pageGo}>1</a>;
      leftRange = <a onClick={this.extendLeftRange}>{this.props.breakLabel}</a>;
      midBlock = arr.filter(a => a>=this.state.currentPage-1 && a<=this.state.currentPage+1).map((a,i) => (<a key={i} className={this.getActiveClassName(a)} onClick={this.pageGo}>{a}</a>));
      rightRange = <a onClick={this.extendRightRange}>{this.props.breakLabel}</a>;
      rightBlock = <a onClick={this.pageGo}>{this.props.pageCount}</a>;
    }
    return <li>{leftBlock}{leftRange}{midBlock}{rightRange}{rightBlock}</li>;
  }
  
  render(){
    const previousClassName = this.state.currentPage === 1 ? styles.disabled : '';
    const nextClassName = this.state.currentPage === this.props.pageCount ? styles.disabled : '';
    return ( 
        <ul className={styles.pagination}>
          <li className={previousClassName}><a onClick={this.pageUp}>&laquo;</a></li>
          {this.renderPages()}
          <li className={nextClassName}><a onClick={this.pageDown}>&raquo;</a></li>
        </ul>
    );
  }
}

export default Pagination;
