import React, {Component} from 'react';
// import {connect} from 'dva';
// import {routerRedux} from 'dva/router';
import { Pagination } from 'antd';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import News from "../../component/news/News";

import '../../assets/css/news.css';
import http from "../../util/http";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            newsList: [],
            pageIndex: 1,
            pageSize: 14,
            total: 0,
            clientHeight: document.body.clientHeight,
            minHeight: {minHeight: document.body.clientHeight - 66 - 120 - 130 - 48 + 'px'}
        }
    }

    componentDidMount() {
        document.title = "中采云-企业新闻";

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad = () => {
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
                this.setState({
                    newsList: data.list,
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

    handleToDetail = (articleId,item) => {
        if(item.articleIsOuterLink) {
            window.open(item.articleOuterLink)
        }else {
            this.props.history.push({
                pathname: '/news/detail/' + articleId,
                query: {}
            })
        }
    };

    handleChangePage = (pageNumber) => {
        if (pageNumber === this.state.pageIndex) {

        }else {
            this.setState({
                pageIndex: pageNumber
            }, () => {
                this.handleLoad();
            });
        }
    };

    render() {
        return (
            <div className="news">
                <Header nav="news"></Header>
                <div className="about-top">
                    <div className="media-top"></div>
                    {/*<img className="about-top-img" src={require('../../assets/image/news-title.png')} alt=""/>*/}
                </div>
                <div className="news-warp">
                    <News nav="enterprise"></News>
                    <div className="news-content" style={this.state.minHeight}>
                        <div className="news-content-header">
                            企业新闻
                        </div>
                        {
                            this.state.newsList ? this.state.newsList.map((item, index) => (
                                <div className="news-content-item" key={index} onClick={() => this.handleToDetail(item.articleId,item)}>
                                    <div className="news-content-item-title">{item.articleTitle}</div>
                                    <div className="news-content-item-time">{item.articlePublishTime ? item.articlePublishTime.substring(0,10) : ''}</div>
                                </div>
                            )) : ''
                        }
                        <div className="pagination">
                            <Pagination current={this.state.pageIndex}
                                        pageSize={this.state.pageSize}
                                        total={this.state.total}
                                        onChange={this.handleChangePage} />
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
// export default connect(({bindActionCreators }) => ({bindActionCreators }))(Index);
