import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from '../component/Header';
import Footer from '../component/Footer';

import util from '../common/util';
import {Link} from "react-router";

class ArticleIndex extends Component {
	constructor(props) {
		super(props);

		this.state = {
			is_load: false,
			page_index: 1,
			page_size: 10,
			total: 0,
			article_list: []
		}
	}

	componentDidMount() {
		util.setTitle('全站搜索');

		util.scrollToTop(0);
	}

	componentWillReceiveProps(nextProps) {
		util.scrollToTop(0);
	}

	componentWillUnmount() {

	}

	render() {
		return (
			<div>
				<Header history={this.props.history} website_menu_id="" keyword={this.props.params.keyword}/>

				<Link to="/index">回到首页</Link>

				<div className="margin-top-20 margin-bottom-20">全站搜索</div>

				<Footer menu={[{
					website_menu_id: 1,
					website_menu_url: '/index',
					page_id: 1,
					website_menu_name: '不能握的手'
				}]} />
			</div>
		);
	}
}

export default connect((state) => {
	return {}
})(ArticleIndex);
