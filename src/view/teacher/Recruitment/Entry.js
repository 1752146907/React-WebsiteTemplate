import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Header from '../../../component/Header';
import Footer from '../../../component/Footer';
import PageSubNav from '../../../component/PageSubNav';
import DepartmentSubNav from '../../../component/DepartmentSubNav';

import util from '../../../common/util';

class Entry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            result_type: '',
            result_message: '',
            menu_index: 1
        }
    }

    componentDidMount() {
        util.setTitle('教师招聘');

        util.scrollToTop(0);
    }

    componentWillReceiveProps(nextProps) {

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
                            <Link to="/index">首页</Link> > <Link to="/page/e8417cd60aeb474aad40d4ecc8d52b22">招生招聘</Link> >  教师招聘
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="subnav col-md-3 hidden-xs">
                            <PageSubNav website_menu_id="a8398373a697416eba6847c2e42c781d" page_id="d46f020e9a28412c911e580ec22574f2"/>
                            <DepartmentSubNav/>
                        </div>
                        <div className="col-md-9">
                            <div className="col-xs-12 visible-xs-inline-block visible-sm-inline-block margin-top-30"></div>
                            <div className="col-xs-12 col-md-4">
                                <Link to="/page/1e5cd187f8b2468a9adcaf4582864357" className="thumbnail">
                                    <div className="signup-enter-item">
                                        <div className="signup-enter-item-text">
                                            <img className="signup-enter-item-icon" src="../image/evaluate.png" alt=""/>
                                            招聘信息
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <Link to="/teacher/recruitment/index" className="thumbnail">
                                    <div className="signup-enter-item">
                                        <div className="signup-enter-item-text">
                                            <img className="signup-enter-item-icon" src="../image/activity.png" alt=""/>
                                            报名应聘
                                        </div>
                                    </div>
                                </Link>
                            </div>
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
})(Entry);
