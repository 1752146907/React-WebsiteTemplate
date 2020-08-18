import React, {Component} from 'react';
// import {connect} from 'dva';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import {createHashHistory} from 'history'

import '../../assets/css/investment.css';
import http from "../../util/http";

const history = createHashHistory();

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            article: {},
            articleId: '',
            clientHeight: document.body.clientHeight,
            minHeight: {minHeight: document.body.clientHeight - 66 - 120 - 130 - 48 + 'px'}
        }
    }

    componentDidMount() {
        document.title = "中采云-招商信息";

        this.handleLoad(this.props.match.params.articleId);
    }

    componentWillUnmount() {

    }

    handleLoad = (articleId) => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/article/website/v1/find',
            data: {
                articleId: articleId
            },
            success: (data) => {
                this.setState({
                    article: data
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
    };

    render() {
        return (
            <div className="investment">
                <Header nav="investment"></Header>
                <div className="about-top">
                    <img className="about-top-img" src={require('../../assets/image/business-title.png')} alt=""/>
                </div>
                <div className="investment-warp">
                    <div className="investment-detail" style={this.state.minHeight}>
                        <div className="investment-detail-header">
                            <div className="investment-detail-title">
                                <div className="investment-detail-title-text">{this.state.article.articleTitle}</div>
                                <div className="investment-detail-title-desc">{this.state.article.articlePublishTime ? this.state.article.articlePublishTime.substring(0,10) : ''}</div>
                            </div>
                            <div className="back-btn" onClick={this.handleBack}> 返回列表 </div>
                        </div>
                        <div className="about-content-html" dangerouslySetInnerHTML={{__html: this.state.article.articleContent}}></div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
