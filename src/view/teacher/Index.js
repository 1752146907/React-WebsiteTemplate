import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Pagination} from 'react-bootstrap';

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import PageSubNav from '../../component/PageSubNav';
import DepartmentSubNav from '../../component/DepartmentSubNav';

import constant from '../../common/constant';
import http from '../../common/http';
import util from '../../common/util';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacher_category_id: '',
            page_id: '',
            page_name: '',
            page_index: 1,
            page_size: 9,
            total: 0,
            teacher_list: []
        }
    }

    componentDidMount() {
        util.scrollToTop(0);

        this.setState({
            teacher_category_id: this.props.params.teacher_category_id
        }, function () {
            this.handleLoad();
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        util.scrollToTop(0);

        if (this.state.teacher_category_id !== nextProps.params.teacher_category_id) {
            this.setState({
                page_index: 1,
                page_size: 9,
                teacher_category_id: nextProps.params.teacher_category_id
            }, function () {
                this.handleLoad();
            }.bind(this));
        }
    }

    componentWillUnmount() {

    }

    handleLoad() {
        var page_id = '';
        var page_name = '';
        var page_size = this.state.page_size;
        if (this.state.teacher_category_id === '70699f5ca3df49bfb4c742827e1a060c') {
            page_id = 'bda8c7a0c4584abf8e41d60685af5c57';
            page_name = '管理团队';
            page_size = 100;
        } else if (this.state.teacher_category_id === '75b1b7bca5214bad9c79a9927659f8cb') {
            page_id = 'cac641d6533e413a820ed8b019b3b100';
            page_name = '优秀教师';
        } else if (this.state.teacher_category_id === '54a612b9e5454814adb72ee1417d3e57') {
            page_id = 'e253866195a64d059d9f66100f11680f';
            page_name = '国际教师';
        } else if (this.state.teacher_category_id === 'df17d19a032b41c78dc159ba548c8dcb') {
            page_id = '0bc1615e1b824359ae1120fca932f60e';
            page_name = '生涯导师';
        } else if (this.state.teacher_category_id.indexOf('5a3e3e701efe486383eaa54dbbe80467') > -1) {
            page_id = 'a3c0f17fa1bd4847be48cd00295d5551';
            page_name = '学术科组';
        }

        this.setState({
            page_id: page_id,
            page_name: page_name
        });

        util.setTitle(page_name);

        http.request({
            url: '/desktop/xietong/teacher/list',
            data: {
                teacher_category_id: this.state.teacher_category_id,
                page_index: this.state.page_index,
                page_size: page_size
            },
            success: function (data) {
                this.setState({
                    total: data.total,
                    teacher_list: data.list
                });
            }.bind(this),
            error: function (data) {

            },
            complete: function () {

            }
        });
    }

    handlePagination(page_index) {
        this.setState({
            page_index: page_index
        }, function () {
            this.handleLoad();
        }.bind(this));
    }

    render() {
        return (
            <div>
                <Header history={this.props.history} website_menu_id="80d321d42ae945a4951f83568452c284"/>
                <div className="content container">
                    <div className="title margin-top-20">
                        <div className="title-icon"></div>
                        <div className="title-breadcrumb">
                            <a href="/index.html">首页</a> > <Link to="">教师发展</Link> > {this.state.page_name}
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="subnav col-md-3 hidden-xs">
                            <PageSubNav website_menu_id="80d321d42ae945a4951f83568452c284"
                                        page_id={this.state.page_id}/>
                            <DepartmentSubNav/>
                        </div>
                        <div className="col-md-9">
                            {
                                this.state.teacher_category_id === '70699f5ca3df49bfb4c742827e1a060c' ?
                                this.state.teacher_list.map(function (teacher) {
                                    return (
                                        <div key={teacher.teacher_id} className="teacher-image">
                                            <div className="teacher-item margin-top-20">
                                                <div className="col-md-4 teacher-item-left">
                                                    <div className="teacher-image-item">
                                                        <img className="img-circle"
                                                             src={constant.image_host + teacher.file_path} alt=""/>
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-no-padding-left teacher-item-right">
                                                    <div className="teacher-name">{teacher.teacher_name}</div>
                                                    <div className="teacher-description"
                                                         dangerouslySetInnerHTML={{__html: teacher.teacher_description}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }.bind(this))
                                :
                                <div className="col-md-12">
                                    {
                                        this.state.teacher_list.map(function (teacher) {
                                            return (
                                                <div key={teacher.teacher_id} className="col-md-4">
                                                    <div className="teacher-item-2">
                                                        <Link to={"/teacher/detail/" + teacher.teacher_id}>
                                                            <img className="teacher-image"
                                                                 src={constant.image_host + teacher.file_path} alt=""/>
                                                            <div className="teacher-name">{teacher.teacher_name}</div>
                                                            <div className="teacher-title">{teacher.teacher_title}</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        }.bind(this))
                                    }
                                </div>
                            }
                            {
                                this.state.teacher_category_id !== '70699f5ca3df49bfb4c742827e1a060c' && this.state.teacher_list.length > 0 ?
                                    <div style={{paddingLeft: '30px'}}>
                                        <Pagination
                                            ellipsis
                                            boundaryLinks
                                            items={Math.ceil(this.state.total / this.state.page_size)}
                                            maxButtons={5}
                                            activePage={this.state.page_index}
                                            onSelect={this.handlePagination.bind(this)}
                                        />
                                    </div>
                                    :
                                    ''
                            }
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
        teacher: state.teacher
    }
})(Index);