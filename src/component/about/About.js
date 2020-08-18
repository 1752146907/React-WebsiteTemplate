import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import './index.css'

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: props
        }
    }

    componentDidMount() {
        document.title = "关于我们";

    }

    componentWillUnmount () {

    }

    handleToIntroduction = () => {
        this.props.history.push('/about/index')
    };

    handleToRecruit  = () => {
        this.props.history.push('/about/recruit')
    };

    handleToContact = () => {
        this.props.history.push('/about/contact')

    };

    render() {
        return (
            <div className="about-nav">
                <div className="about-nav-list">
                    <div className={this.state.nav.nav === 'introduction' ? "nav-list-item nav-active-item" : "nav-list-item"} onClick={this.handleToIntroduction}>
                        公司简介
                    </div>
                    <div className={this.state.nav.nav === 'recruit' ? 'nav-list-item nav-active-item' : 'nav-list-item'} onClick={this.handleToRecruit}>
                        诚聘英才
                    </div>
                    <div className={this.state.nav.nav === 'contact' ? "nav-list-item nav-active-item" : "nav-list-item"} onClick={this.handleToContact}>
                        联系我们
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(About);
