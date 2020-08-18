import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';


import './index.css';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: props
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleActiveHome = () => {
        this.props.history.push("/")
    };

    handleActiveAbout = () => {
        this.props.history.push("/about/index")
    };

    handleActiveJxt = () => {
        this.props.history.push("/jxt/index")
    };

    handleActiveZck = () => {
        window.open("http://purchase.zcaiyun.com")
    };

    handleActiveInvestment = () => {
        this.props.history.push("/investment/index")
    };

    handleActiveNews = () => {
        this.props.history.push("/news/index")
    };



    render() {

        return (
            <div className="top">
                <div className="header">
                    <div className="header-content">
                        <div className="header-left">
                            <img src={require('../../assets/image/logo.png')} className="logo-img" alt="" onClick={this.handleActiveHome}/>
                        </div>
                        <div className="header-right">
                            <div className="header-nav">
                                <div className="nav-item" onClick={this.handleActiveHome}>
                                    <span className={ this.state.nav.nav === "home" ? "nav-item-text active-item" : "nav-item-text"}>首页</span>
                                </div>
                                <div className="nav-item" onClick={this.handleActiveAbout}>
                                    <span className={this.state.nav.nav === "about" ? "nav-item-text active-item" : "nav-item-text"}>关于我们</span>
                                </div>
                                <div className="nav-item" onClick={this.handleActiveJxt}>
                                    <span className={this.state.nav.nav === "jxt" ? "nav-item-text active-item" : "nav-item-text"}>建信通</span>
                                </div>
                                <div className="nav-item" onClick={this.handleActiveZck}>
                                    <span className={this.state.nav.nav === "zck" ? "nav-item-text active-item" : "nav-item-text"}>筑材库</span>
                                </div>
                                <div className="nav-item" onClick={this.handleActiveInvestment}>
                                    <span className={this.state.nav.nav === "investment" ? "nav-item-text active-item" : "nav-item-text"}>招商信息</span>
                                </div>
                                <div className="nav-item" onClick={this.handleActiveNews}>
                                    <span className={this.state.nav.nav === "news" ? "nav-item-text active-item" : "nav-item-text"}>新闻中心</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);
