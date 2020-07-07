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
            student: {}
        }
    }

    componentDidMount() {
        util.scrollToTop(0);

        http.request({
            url: '/desktop/xietong/student/find',
            data: {
                student_id: this.props.params.student_id
            },
            success: function (data) {
                util.setTitle(data.student_name);

                var page_id = '';
                if (data.student_category_id === '0bce6c38d8d3463bb62a3270251a126d') {
                    page_id = '371b4d2376c54dea975f832fa95b96b7';
                } else if (data.student_category_id === '1d49d03576954b3c998608b8f43be324') {
                    page_id = '0d2baae867af4745a6c768a75a907d75';
                }

                this.setState({
                    student: data,
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
                <Header history={this.props.history} website_menu_id="a34121161c2743f1b77feb64f65b80bf"/>
                <div className="content container">
                    <div className="title margin-top-20">
                        <div className="title-icon"></div>
                        <div className="title-breadcrumb">
                            <Link to="/index">首页</Link> > 学生介绍
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="subnav col-md-3 hidden-xs">
                            <PageSubNav website_menu_id="a34121161c2743f1b77feb64f65b80bf"
                                        page_id={this.state.page_id}/>
                            <DepartmentSubNav/>
                        </div>
                        <div className="col-md-9">
                            <div className="student-title margin-top">
                                <h3>{this.state.student.student_name}</h3>
                                <div>{this.state.student.clazz_name}</div>
                            </div>
                            <div className="margin-top-30 col-md-6 col-no-padding">
                                {
                                    this.state.student.file_original_path ?
                                        <img src={constant.image_host + this.state.student.file_original_path} alt=""/>
                                        :
                                        ''
                                }
                            </div>
                            <div className="margin-top-30 col-md-6" dangerouslySetInnerHTML={{__html: this.state.student.student_description}}></div>
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