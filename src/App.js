import React, {Component} from 'react';
// import logo from './logo.svg';
// import {connect} from 'dva';
import './App.css';
import 'antd/dist/antd.css';

import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import http from "./util/http";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            pageIndex: 1,
            pageSize: 10,
            newsList: [],
            investmentList: [],
            clientHeight: document.body.clientHeight
        }
    }

    componentDidMount() {
        document.title = "中采云-首页";

        // this.handleNewsLoad();
        // this.handleInvestmentLoad();
    }

    componentWillUnmount() {

    }

    handleNewsLoad = () => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/article/website/v1/list',
            data: {
                channelId: '1229678987261906944',
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            },
            success: (data) => {
                let newsList = this.state.newsList;
                newsList = newsList.length > 0 ? newsList.concat(data.list) : data.list;
                this.setState({
                    newsList: newsList,
                    total: data.total,
                });
            },
            complete: () => {
                this.setState({
                    isLoading: false,
                });
            }
        });
    };

    handleInvestmentLoad = () => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/article/website/v1/list',
            data: {
                channelId: '1229678766670876672',
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            },
            success: (data) => {
                let investmentList = this.state.investmentList;
                investmentList = investmentList.length > 0 ? investmentList.concat(data.list) : data.list;
                this.setState({
                    investmentList: investmentList,
                    total: data.total,
                });
            },
            complete: () => {
                this.setState({
                    isLoading: false,
                });
            }
        });
    };

    handleToNewsDetail = (articleId, item) => {
        if (item.articleIsOuterLink) {
            window.open(item.articleOuterLink)
        } else {
            this.props.history.push({
                pathname: '/news/detail/' + articleId,
                query: {}
            })
        }
    };

    handleToInvestmentDetail = (articleId, item) => {
        if (item.articleIsOuterLink) {
            window.open(item.articleOuterLink)
        } else {
            this.props.history.push({
                pathname: '/investment/detail/' + articleId,
                query: {}
            })
        }
    };

    render() {
        return (
            <div className="App">
                <Header nav="home"></Header>
                <div className="banner">
                    <img className="banner-img" src={require('./assets/image/banner.png')} alt=""/>
                </div>
                <div className="service">
                    <div className="service-wrap">
                        <div className="service-title">平台服务</div>
                        <div className="service-title-desc">提供6大服务体系</div>
                        <div className="service-list">
                            <div className="service-item">
                                <img className="service-item-img" src={require('./assets/image/indexicon-01.png')}
                                     alt=""></img>
                                <div className="service-item-title">工程项目信息</div>
                                <div className="service-item-desc">项目信息发布</div>
                            </div>
                            <div className="service-item">
                                <img className="service-item-img" src={require('./assets/image/indexicon-02.png')}
                                     alt=""></img>
                                <div className="service-item-title">工程招投标</div>
                                <div className="service-item-desc">招投标信息</div>
                            </div>
                            <div className="service-item">
                                <img className="service-item-img" src={require('./assets/image/indexicon-03.png')}
                                     alt=""></img>
                                <div className="service-item-title">建材设备采购</div>
                                <div className="service-item-desc">降低成本 提高效益</div>
                            </div>
                            <div className="service-item">
                                <img className="service-item-img" src={require('./assets/image/indexicon-04.png')}
                                     alt=""></img>
                                <div className="service-item-title">劳务分包</div>
                                <div className="service-item-desc">劳务信息发布</div>
                            </div>
                            <div className="service-item">
                                <img className="service-item-img" src={require('./assets/image/indexicon-05.png')}
                                     alt=""></img>
                                <div className="service-item-title">供应链金融</div>
                                <div className="service-item-desc">解决资金链问题</div>
                            </div>
                            <div className="service-item">
                                <img className="service-item-img" src={require('./assets/image/indexicon-06.png')}
                                     alt=""></img>
                                <div className="service-item-title">专家咨询</div>
                                <div className="service-item-desc">提供专业解答</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="article">
                    <div className="article-content">
                        <div className="article-investment">
                            <div className="investment-header">
                                <span className="investment-title">招商信息</span>
                            </div>
                            <div className="investment-content">
                                {
                                    this.state.investmentList ? this.state.investmentList.map((item, index) => {
                                        return (index <= 2 ? <div className="investment-item" key={index}
                                                                  onClick={() => this.handleToInvestmentDetail(item.articleId, item)}>
                                                <div className="investment-item-header">
                                                    <div className="investment-item-title">{item.articleTitle}</div>
                                                    <div
                                                        className="investment-item-time">{item.articlePublishTime ? item.articlePublishTime.substring(0, 10) : ''}</div>
                                                </div>
                                                <div className="investment-item-content">
                                                    <div className="investment-item-desc">{item.articleSummary}</div>
                                                </div>
                                            </div> : ''
                                        )
                                    }) : ''
                                }
                            </div>
                        </div>
                        <div className="article-news">
                            <div className="news-header">
                                <span className="news-title">企业新闻</span>
                            </div>
                            <div className="news-content">
                                {
                                    this.state.newsList ? this.state.newsList.map((item, index) => {
                                        return (index <= 6 ? <div className="news-item" key={index}
                                                                  onClick={() => this.handleToNewsDetail(item.articleId, item)}>
                                                <div className="news-item-title">{item.articleTitle}</div>
                                                <div
                                                    className="news-item-time">{item.articlePublishTime ? item.articlePublishTime.substring(0, 10) : ''}</div>
                                            </div> : ''
                                        )
                                    }) : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default App;
