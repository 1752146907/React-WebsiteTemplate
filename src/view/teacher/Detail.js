import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import PageSubNav from '../../component/PageSubNav';
import DepartmentSubNav from '../../component/DepartmentSubNav';

import constant from '../../common/constant';
import http from '../../common/http';
import util from '../../common/util';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page_id: '',
            teacher: {}
        }
    }

    componentDidMount() {
        util.scrollToTop(0);

        http.request({
            url: '/desktop/xietong/teacher/find',
            data: {
                teacher_id: this.props.params.teacher_id
            },
            success: function (data) {
                var page_id = '';
                if (data.teacher_category_id === '70699f5ca3df49bfb4c742827e1a060c') {
                    page_id = 'bda8c7a0c4584abf8e41d60685af5c57';
                } else if (data.teacher_category_id === '75b1b7bca5214bad9c79a9927659f8cb') {
                    page_id = 'cac641d6533e413a820ed8b019b3b100';
                } else if (data.teacher_category_id === '54a612b9e5454814adb72ee1417d3e57') {
                    page_id = 'e253866195a64d059d9f66100f11680f';
                }

                util.setTitle(data.teacher_name);

                this.setState({
                    teacher: data,
                    page_id: page_id
                });
            }.bind(this),
            error: function (data) {

            },
            complete: function () {

            }
        });
    }

    componentWillReceiveProps(nextProps) {
        util.scrollToTop(0);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <Header history={this.props.history} website_menu_id=""/>
                <div className="content container">
                    <div className="title margin-top-20">
                        <div className="title-icon"></div>
                        <div className="title-breadcrumb">
                            <Link to="/index">首页</Link> > 老师介绍
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="subnav col-md-3 hidden-xs">
                            <PageSubNav website_menu_id="80d321d42ae945a4951f83568452c284"
                                        page_id={this.state.page_id}/>
                            <DepartmentSubNav/>
                        </div>
                        <div className="col-md-9">
                            <div className="teacher-title margin-top">
                                <h3>{this.state.teacher.teacher_name}</h3>
                                <div>{this.state.teacher.teacher_title}</div>
                            </div>
                            <div className="margin-top-30 col-md-6 col-no-padding">
                                {
                                    this.state.teacher.file_original_path ?
                                        <img className="img-circle" src={constant.image_host + this.state.teacher.file_original_path} alt=""/>
                                        :
                                        ''
                                }
                            </div>
                            <div className="margin-top-30 col-md-6" dangerouslySetInnerHTML={{__html: this.state.teacher.teacher_description}}></div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect((state) => {
    return {

    }
})(ArticleDetail);