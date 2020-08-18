import React, {Component} from 'react';
// import {connect} from 'dva';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import About from "../../component/about/About";
import {createHashHistory} from 'history'

import '../../assets/css/recruitdetail.css';
import http from "../../util/http";

const history = createHashHistory();

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recruitDetail: '',
            recruitment: {},
            clientHeight: document.body.clientHeight,
            minHeight: {minHeight: document.body.clientHeight - 66 - 120 - 130 - 48 + 'px'}
        }
    }

    componentDidMount() {
        document.title = "中采云-诚聘英才";

        this.handleLoad(this.props.match.params.recruitmentId);
    }

    componentWillUnmount() {

    }

    handleLoad = (recruitmentId) => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/recruitment/website/v1/find',
            data: {
                recruitmentId: recruitmentId
            },
            success: (data) => {
                this.setState({
                    recruitment: data
                });
            },
            complete: () => {
                this.setState({
                    isLoading: false,
                });
            }
        });
    };

    handleBack = () => {
        history.goBack();
    }

    render() {
        return (
            <div className="recruit">
                <Header nav="about"></Header>
                <div className="about-top">
                    <div className="about-top-banner"></div>
                    {/*<img className="about-top-img" src={require('../../assets/image/about-top.png')} alt=""/>*/}
                </div>
                <div className="about-warp">
                    <About nav="recruit" />
                    <div className="about-content" style={this.state.minHeight}>
                        <div className="recruit-header">
                            <div className="recruit-header-title">
                                <div className="recruit-header-title-text">{this.state.recruitment.recruitmentPosition}</div>
                                <div className="recruit-header-title-desc">{this.state.recruitment.recruitmentDepartment}</div>
                            </div>
                            <div className="back-btn" onClick={this.handleBack}> 返回列表 </div>
                        </div>
                        <div className="about-content-html" dangerouslySetInnerHTML={{__html: this.state.recruitment.recruitmentRequirements}}></div>
                        <div className="detail-email">
                            <img className="email-img" src={require('../../assets/image/about-13.png')} alt=""/>
                            <div className="detail-email-info">
                                <div className="detail-email-info-label">
                                    请发送简历至：
                                    <span className="email-text">hr@zcaiyun.com</span>
                                </div>
                                <div className="email-format">邮件标题格式为：你的姓名 + 应聘职位</div>
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
