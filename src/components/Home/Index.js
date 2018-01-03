import React, {Component} from 'react';
import HomeHeader from '../../components/Home/HomeHeader';
import Nav from '../../components/Home/Nav';
import Recommend from './Recommend';


// {...this.props}  会把整个state树传入组件
export default class extends Component {
  componentDidMount() {
      this.props.searchActions.fetchSearchHot();
  }

  render() {
    return (
      <div className="container">
        <HomeHeader {...this.props}/>
        <Nav {...this.props}/>
        <Recommend/>
      </div>
    )
  }
}
