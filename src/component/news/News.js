import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import './index.css'

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: props
        }
    }

    componentDidMount() {
        // document.title = "关于我们";

    }

    componentWillUnmount () {

    }

    handleToEnterprise = () => {
        this.props.history.push('/news/index')
    }

    handleToDynamic  = () => {
        this.props.history.push('/dynamic/index')
    }

    handleToMedia = () => {
        this.props.history.push('/media/index')
    }

    render() {
        return (
            <div className="about-nav">
                <div className="about-nav-list">
                    <div className={this.state.nav.nav === 'enterprise' ? "nav-list-item nav-active-item" : "nav-list-item"} onClick={this.handleToEnterprise}>
                        企业新闻
                    </div>
                    <div className={this.state.nav.nav === 'dynamic' ? 'nav-list-item nav-active-item' : 'nav-list-item'} onClick={this.handleToDynamic}>
                        行业动态
                    </div>
                    <div className={this.state.nav.nav === 'media' ? "nav-list-item nav-active-item" : "nav-list-item"} onClick={this.handleToMedia}>
                        直播回放
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(News);
