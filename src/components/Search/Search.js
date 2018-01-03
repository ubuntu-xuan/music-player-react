/**
 * Created by 0easy-23 on 2017/9/30.
 */
import React, {Component} from 'react';
import * as localStore from '../../util/localStorage';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            value: '',
            display: false,
            history: localStore.getItem('search_history') ? localStore.getItem('search_history').split(',') : []
        };
        this.clearText = this.clearText.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchHot = this.handleSearchHot.bind(this);
        this.setHistory = this.setHistory.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    componentDidMount() {
        JSON.stringify(this.props.hotList) !== '{}' && localStore.setItem('hotList', JSON.stringify(this.props.hotList.data.info));
    }

    clearText() {
        this.setState({value: '', display: false});
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    keyUp(e) {
        this.setState({display: true});
        e.keyCode === 13 && this.handleSearch(); //e.keyCode === 13 enter键处发windows事件，enter键的ASCII是13
                                                //a&& b :如果执行a后返回true，则执行b并返回b的值；如果执行a后返回false，则整个表达式返回a的值，b不执行；
                                                //a || b :如果执行a后返回true，则整个表达式返回a的值，b不执行；如果执行a后返回false，则执行b并返回b的值；
                                                // && 优先级高于 ||;
    }

    handleSearchHot(val) {
        this.props.history.push({pathname: '/search/result', state: {searchValue: val}}); //pathname: '/search/result':引起页面跳转
        this.setHistory(val);
    }

    handleSearch() {
        const searchValue = this.state.value.trim();
        if (searchValue !== '') {
            this.props.history.push({pathname: '/search/result', state: {searchValue: searchValue}});
            this.setHistory(searchValue);
        }
        alert(this.props.history);
    }

    setHistory(data) {
        this.setState({history: this.state.history.push(data)});
        const searchHistory = this.state.history;
        let newHistory = [];
        for (let i = 0; i < searchHistory.length; i++) {
            if (newHistory.indexOf(searchHistory[i]) === -1) { //检索的字符串值没有出现，则该方法返回 -1
                newHistory.push(searchHistory[i])
            }
        }
        localStore.setItem('search_history', newHistory);
    }

    clearHistory(text) {
        const historyArr = localStore.getItem('search_history').split(',');
        const index = historyArr.indexOf(text);
        historyArr.splice(index, 1);
        localStore.setItem('search_history', historyArr);
        this.setState({history: historyArr});
    }

    clearAll() {
        localStore.setItem('search_history', '');
        this.setState({history: []});
    }

    render() {
        console.log('search.js');
        console.log(this.props);

        const hotListData = JSON.stringify(this.props.hotList) !== '{}' ? this.props.hotList.data.info : JSON.parse(localStore.getItem('hotList'));
        const hotList = hotListData.map((ele) => {
            return (
                <span key={ele.sort} onClick={() => this.handleSearchHot(ele.keyword)}>
                  {ele.keyword}
                </span>
            )
        });
        return (
            <div className="container">
              <div className="header">
                <div className="headerBack" onClick={() => window.history.back()}>
                  <i className="icon-keyboard_arrow_left"></i>
                </div>
                <div className="searchBar">
                  <div className="searchInput">
                    <i className="icon-search"></i>
                    <input type="text" value={this.state.value} onKeyUp={this.keyUp} onChange={this.handleChange} className="input input-search" placeholder="请输入关键字"/>
                    <i onClick={this.clearText} style={{display: this.state.display ? 'block' : 'none'}}>&times;</i>
                  </div>
                </div>
                <div className="headerRight" onClick={this.handleSearch}>搜索</div>
              </div>
              <div className="searchTitle">热门搜索</div>
              <div className="hotList">
                {hotList}
              </div>
              <div className="searchTitle">
                <span>搜索历史</span>
                <em onClick={this.clearAll}>清除历史</em>
              </div>
              <div className="searchHistory">
                {
                  this.state.history.length > 0 ? this.state.history.map((ele, index) => {
                    return (
                      <p key={index}>
                        <span onClick={() => this.handleSearchHot(ele)}>{ele}</span>
                        <em onClick={() => this.clearHistory(ele)}>&times;</em>
                      </p>
                    )
                  }) : null
                }
              </div>
            </div>
        )
    }
}
