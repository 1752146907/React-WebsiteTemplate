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

class Train extends Component {
	constructor(props) {
		super(props);

		this.state = {
			is_load: false,
			page_index: 1,
			page_size: 10,
			article_category_id: '',
			article_list: [],
			page_id: '',
			page: {}
		}
	}

	componentDidMount() {
        util.scrollToTop(0);

		this.setState({
			page_id: this.props.params.page_id,
            website_menu_list: this.props.website_menu.list,
            article_category_id: this.props.params.article_category_id
		}, function () {
			this.handleLoadPage();
			this.handleLoadArticle();
		}.bind(this));
	}

	componentWillReceiveProps(nextProps) {
        util.scrollToTop(0);

        if (this.state.page_id !== nextProps.params.page_id) {
            this.setState({
                page_id: nextProps.params.page_id
            }, function () {
                this.handleLoadPage();
            }.bind(this));
        }

        if (this.state.article_category_id !== nextProps.params.article_category_id) {
            this.setState({
                article_category_id: nextProps.params.article_category_id
            }, function () {
                this.handleLoadArticle();
            }.bind(this));
        }
	}

	componentWillUnmount() {

	}

	handleLoadPage() {
		http.request({
			url: '/desktop/page/find',
			data: {
				page_id: this.state.page_id
			},
			success: function (data) {
                util.setTitle(data.page_name);

                this.setState({
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

	handleLoadArticle() {
		http.request({
			url: '/desktop/article/acticle/category/list',
			data: {
				article_category_id: this.state.article_category_id,
				page_index: this.state.page_index,
				page_size: this.state.page_size
			},
			success: function (data) {
				this.setState({
					page_index: this.state.page_index,
					total: data.total,
					article_list: data.list,
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
								this.state.article_list.map(function (article, index) {
									return (
										<Link key={article.article_id} to={"/article/detail/" + article.article_id}>
											<div className={"article-item" + (index > 0 ? " margin-top-30" : "")}>
												<img className="article-item-image"
													 src={constant.image_host + article.file_path}
													 alt=""/>
												<div className="article-item-title">{article.article_name}</div>
												<div className="article-item-description">{article.article_summary}</div>
											</div>
										</Link>
									)
								})
							}
							{
								this.state.article_list.length > 0 ?
									<Pagination
										ellipsis
										boundaryLinks
										items={Math.ceil(this.state.total / this.state.page_size)}
										maxButtons={5}
										activePage={this.state.page_index}
										onSelect={this.handlePagination.bind(this)}
									/>
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
		website_menu: state.website_menu
	}
})(Train);
