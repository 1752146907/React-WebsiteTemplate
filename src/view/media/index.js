import React, {Component} from 'react';
// import {connect} from 'dva';
import { Pagination } from 'antd';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import News from "../../component/news/News";

import '../../assets/css/news.css';
import http from "../../util/http";
import constant from "../../util/application";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            playList: [],
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            clientHeight: document.body.clientHeight,
            minHeight: {minHeight: document.body.clientHeight - 66 - 120 - 130 - 48 + 'px'}
        }
    }

    componentDidMount() {
        document.title = "中采云-直播回放";
        this.handleLoad();

    }

    componentWillUnmount() {

    }

    handleLoad = () => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/replay/group/website/v1/list',
            data: {
                // channelId: '1229679455635640320',
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            },
            success: (data) => {
                this.setState({
                    playList: data.list,
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

    handleToDetail = (articleId) => {
        this.props.history.push({
            pathname: '/media/detail/' + articleId,
            query: {}
        })
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
                    <News nav="media"></News>
                    <div className="news-content" style={this.state.minHeight}>
                        <div className="news-content-header">
                            直播回放
                        </div>
                        <div className="live-list">
                            {
                                this.state.playList ? this.state.playList.map((item, index) => (
                                    <div className="live-content-item" key={index} onClick={() => this.handleToDetail(item.replayGroupId)}>
                                        <div className="live-item-img-warp">
                                            <img className="live-item-img" src={constant.imagePreviewHost + item.replayGroupImage} alt=""/>
                                            <div className="live-item-img-info">
                                                <div className="live-play">
                                                    <img className="live-play-img" src={require('../../assets/image/play-icon.png')} alt=""/>
                                                    {/*<span>{item.num}</span>*/}
                                                </div>
                                                {/*<div className="live-play-duration">{item.duration}</div>*/}
                                            </div>
                                        </div>
                                        <div className="live-item-info">
                                            <div className="live-item-info-left">
                                                <div className="live-item-info-title">{item.replayGroupTitle}</div>
                                                <div className="live-item-info-desc">{item.replayGroupDescription}</div>

                                            </div>
                                            <div className="live-item-info-right">
                                                <div className="live-item-info-time">{item.systemCreateTime ? item.systemCreateTime.substring(0,10) : ''}</div>
                                            </div>
                                        </div>
                                    </div>
                                )) : ''
                            }
                        </div>
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
