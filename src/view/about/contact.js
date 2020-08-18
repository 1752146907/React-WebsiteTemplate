import React, {Component} from 'react';
// import {connect} from 'dva';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import About from "../../component/about/About";

import '../../assets/css/contact.css';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clientHeight: document.body.clientHeight,
            minHeight: {minHeight: document.body.clientHeight - 66 - 120 - 130 - 48 + 'px'}
        }
    }

    componentDidMount() {
        document.title = "中采云-联系我们";

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="about">
                <Header nav="about"></Header>
                <div className="about-top">
                    <div className="about-top-banner"></div>
                    {/*<img className="about-top-img" src={require('../../assets/image/about-top.png')} alt=""/>*/}
                </div>
                <div className="about-warp">
                    <About nav="contact" />
                    <div className="about-content" style={this.state.minHeight}>
                        <div className="about-content-header">
                            联系我们
                        </div>
                        <div className="about-contact">
                            <div className="address-map">
                                <img className="address-map-img" src={require('../../assets/image/about-12.png')} alt="" />
                            </div>
                            <div className="contact-list">
                                <div className="contact-team-content">
                                    <div className="contact-team-title font-weight-bold">广州总部</div>
                                    <div className="bottom-line" />
                                </div>
                                <div className="contact-item">
                                    <div className="contact-text">联系地址：广州市天河区珠江新城金穗路68号领峰A2-19层</div>
                                    <div className="contact-text">电话：020-83629001</div>
                                </div>
                                <div className="contact-team-content">
                                    <div className="contact-team-title font-weight-bold">商务合作</div>
                                    <div className="bottom-line" />
                                </div>
                                <div className="contact-item">
                                    <div className="contact-text">如有品牌活动、媒体采访、平台参观等合作需求，请发邮件至：hezuo@zcaiyun.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
