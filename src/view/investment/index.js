import React, {Component} from 'react';
// import {connect} from 'dva';
import { Pagination } from 'antd';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

import '../../assets/css/investment.css';
import http from "../../util/http";
import constant from "../../util/application";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            pageIndex: 1,
            pageSize: 4,
            investmentList: [],
            total: 0,
            clientHeight: document.body.clientHeight,
            minHeight: {minHeight: document.body.clientHeight - 66 - 120 - 130 - 48 + 'px'}
        }
    }

    componentDidMount() {
        document.title = "中采云-招商信息";

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
                channelId: '1229678766670876672',
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            },
            success: (data) => {
                this.setState({
                    investmentList: data.list,
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
                pathname: '/investment/detail/' + articleId,
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
            <div className="investment">
                <Header nav="investment"></Header>
                <div className="about-top">
                    <div className="business-top"></div>
                    {/*<img className="about-top-img" src={require('../../assets/image/business-title.png')} alt=""/>*/}
                </div>
                <div className="investment-warp">
                    <div className="investment-warp-content" style={this.state.minHeight}>
                        { this.state.investmentList ? this.state.investmentList.map((item, index) =>
                            <div className="investment-content-item" key={index} onClick={() => this.handleToDetail(item.articleId,item)}>
                                <div className="investment-item-left">
                                    <img className="investment-item-img" src={constant.imagePreviewHost + item.articleImagePath} alt=""/>
                                </div>
                                <div className="investment-item-right">
                                    <div className="investment-item-right-info">
                                        <div className="investment-item-info-title">{item.articleTitle}</div>
                                        <div className="investment-item-info-desc">{item.articleSummary}</div>
                                    </div>
                                    <div className="investment-item-right-time">
                                        {item.articlePublishTime ? item.articlePublishTime.substring(0,10) : ''}
                                    </div>
                                </div>
                            </div>) : ''
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
