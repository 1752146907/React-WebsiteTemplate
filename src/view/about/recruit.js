import React, {Component} from 'react';
// import {connect} from 'dva';
import { Pagination } from 'antd';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import About from "../../component/about/About";

import '../../assets/css/recruit.css';

import http from '../../util/http';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            recruitmentList: [],
            pageIndex: 1,
            pageSize: 5,
            total: 0,
            clientHeight: document.body.clientHeight,
            minHeight: {minHeight: document.body.clientHeight - 66 - 120 - 130 - 48 + 'px'}
        }
    }

    componentDidMount() {
        document.title = "中采云-诚聘英才";

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad = () => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/recruitment/website/v1/list',
            data: {
                recruitmentPosition: '',
                recruitmentDepartment: '',
                recruitmentStatus: '',
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            },
            success: (data) => {
                let recruitmentList = this.state.recruitmentList;
                recruitmentList = recruitmentList.length > 0 ? recruitmentList.concat(data.list) : data.list;
                this.setState({
                    recruitmentList: recruitmentList,
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

    handleToDetail = (recruitmentId) => {
        this.props.history.push(
            {
                pathname: '/about/recruitdetail/' + recruitmentId,
                query: {}
            }
        )
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
            <div className="about">
                <Header nav="about"></Header>
                <div className="about-top">
                    <div className="about-top-banner"></div>
                    {/*<img className="about-top-img" src={require('../../assets/image/about-top.png')} alt=""/>*/}
                </div>
                <div className="about-warp">
                    <About nav="recruit" />
                    <div className="about-content" style={this.state.minHeight}>
                        <div className="about-content-header">
                            诚聘英才
                        </div>
                        <div className="about-recruit">
                            <div className="recruit-list">
                                {
                                    this.state.recruitmentList ? this.state.recruitmentList.map((item, index) => (
                                        <div className="recruit-item" key={index} onClick={() => this.handleToDetail(item.recruitmentId)}>
                                            <div className="recruit-item-position">
                                                <div className="recruit-item-position-title">
                                                    {item.recruitmentPosition}
                                                </div>
                                                <div className="recruit-item-position-department">
                                                    {item.recruitmentDepartment}
                                                </div>
                                            </div>
                                            <div className="recruit-item-requirement">
                                                <span className="recruit-item-requirement-span">{item.recruitmentWorkingYears}</span>
                                                <span className="recruit-item-requirement-line"></span>
                                                <span className="recruit-item-requirement-education">{item.recruitmentEducationLevel}</span>
                                            </div>
                                            <div className="recruit-item-right">{item.recruitmentSalary}</div>
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
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
