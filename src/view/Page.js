import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Header from '../component/Header';
import Footer from '../component/Footer';
import PageSubNav from '../component/PageSubNav';
import DepartmentSubNav from '../component/DepartmentSubNav';

import http from '../common/http';
import util from '../common/util';

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            page_id: '',
            page_list: [],
            page: {}
        }
    }

    componentDidMount() {
        util.scrollToTop(0);

        this.setState({
            page_id: this.props.params.page_id,
            page_list: this.props.page.list,
            website_menu_list: this.props.website_menu.list
        }, function () {
            this.handleLoad();
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        util.scrollToTop(0);

        if (this.state.page_id !== nextProps.params.page_id) {
            this.setState({
                page_id: nextProps.params.page_id
            }, function () {
                this.handleLoad();
            }.bind(this));
        }
    }

    componentWillUnmount() {

    }

    handleLoad() {
        var is_exit = false;
        for (var i = 0; i < this.state.page_list.length; i++) {
            if (this.state.page_list[i].page_id === this.state.page_id) {
                util.setTitle(this.state.page_list[i].page_name);

                this.setState({
                    page: this.state.page_list[i]
                });

                is_exit = true;

                break;
            }
        }

        if (!is_exit) {
            this.setState({
                is_load: true,
                page: {}
            });

            http.request({
                url: '/desktop/page/find',
                data: {
                    page_id: this.state.page_id
                },
                success: function (data) {
                    util.setTitle(data.page_name);

                    var page_list = this.state.page_list;
                    page_list.push(data);

                    this.setState({
                        page_list: page_list,
                        page: data
                    });
                }.bind(this),
                error: function (data) {

                },
                complete: function () {
                    this.setState({
                        is_load: false
                    });
                }.bind(this)
            });
        }
    }

    render() {
        return (
            <div>
                <Header history={this.props.history} website_menu_id={this.state.page.website_menu_id}/>
                <div className="content container">
                    <div className="title margin-top-20">
                        <div className="title-icon"></div>
                        <div className="title-breadcrumb">
                            <a href="/index.html">首页</a> > <Link to="">{this.state.page.website_menu_name}</Link> > {this.state.page.page_name}
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="subnav col-md-3 hidden-xs">
                            <PageSubNav website_menu_id={this.state.page.website_menu_id ? this.state.page.website_menu_id : ''} page_id={this.state.page_id}/>
                            <DepartmentSubNav/>
                        </div>
                        <div className="col-md-9">
                            {
                                this.state.is_load ?
                                    <div className="text-center">正在努力加载中..</div>
                                    :
                                    <div dangerouslySetInnerHTML={{__html: this.state.page.page_content}}></div>
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
        website_menu: state.website_menu,
        page: state.page
    }
})(Page);
