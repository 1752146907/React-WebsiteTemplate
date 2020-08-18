import React, {Component} from 'react';
// import {connect} from 'dva';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import News from "../../component/news/News";
import {createHashHistory} from 'history'

import '../../assets/css/news.css';
import http from "../../util/http";

const history = createHashHistory();

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newsDetail: '',
            isLoading: true,
            article: {},
            clientHeight: document.body.clientHeight,
            minHeight: {minHeight: document.body.clientHeight - 66 - 120 - 130 - 48 + 'px'}
        }
    }

    componentDidMount() {
        document.title = "中采云-新闻中心";


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
            <div className="news">
                <Header nav="news"></Header>
                <div className="about-top">
                    <img className="about-top-img" src={require('../../assets/image/news-title.png')} alt=""/>
                </div>
                <div className="news-warp">
                    <News nav="enterprise"></News>
                    <div className="news-content" style={this.state.minHeight}>
                        <div className="news-detail-header">
                            <div className="news-detail-title">
                                <div className="news-detail-title-text">{this.state.article.articleTitle}</div>
                                <div className="news-detail-title-desc">{this.state.article.articlePublishTime ? this.state.article.articlePublishTime.substring(0,10) : ''}</div>
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
