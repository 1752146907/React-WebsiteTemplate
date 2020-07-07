import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Modal, Button} from 'react-bootstrap';

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import PageSubNav from '../../component/PageSubNav';
import DepartmentSubNav from '../../component/DepartmentSubNav';

import util from '../../common/util';
import storage from "../../common/storage";

class Entry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
			is_show: false,
            result_type: '',
            result_message: '',
            menu_index: 1
        }
    }

    componentDidMount() {
        util.setTitle('佛山协同(国际)学校小升初自荐报名');

        util.scrollToTop(0);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    handleBrochures() {
        this.props.history.push({
            pathname: "/page/26b436febeb348d480a681825b44ccb4",
            query: {}
        });
    }

    handleLogin() {
        this.props.history.push({
            pathname: "/junior/login",
            query: {}
        });
    }

    handleSignup() {
        this.props.history.push({
            pathname: "/junior/signup",
            query: {}
        });
    }

	handleOpen() {
		this.setState({
			is_show: true
		});
	}

	handleClose() {
		this.setState({
			is_show: false
		});
	}

    render() {
        return (
            <div>
                <Header history={this.props.history} website_menu_id=""/>
                <div className="content container">
                    <div className="title margin-top-20">
                        <div className="title-icon"></div>
                        <div className="title-breadcrumb">
                            <Link to="/index">首页</Link> > <Link to="/page/e8417cd60aeb474aad40d4ecc8d52b22">招生招聘</Link> >  初中报名
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="subnav col-md-3 hidden-xs">
                            <PageSubNav website_menu_id="a8398373a697416eba6847c2e42c781d" page_id="7d32e0491eed4fa58a2e05cf2079303c"/>
                            <DepartmentSubNav/>
                        </div>
                        <div className="col-md-9">
                            <div className="col-xs-12 visible-xs-inline-block visible-sm-inline-block margin-top-30"></div>
                            <div className="col-xs-12 col-md-4">
                                <Link to="/page/26b436febeb348d480a681825b44ccb4" className="thumbnail">
                                    <div className="signup-enter-item">
                                        <div className="signup-enter-item-text">
                                            <img className="signup-enter-item-icon" src="../image/evaluate.png" alt=""/>
                                            招生简章
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-xs-12 col-md-4">
								{/*<Link to={storage.getJuniorToken() ? "/junior/check" : "/junior/signup"} className="thumbnail">*/}
									{/*<div className="signup-enter-item">*/}
										{/*<div className="signup-enter-item-text">*/}
											{/*<img className="signup-enter-item-icon" src="../image/activity.png" alt=""/>*/}
											{/*开始报名*/}
										{/*</div>*/}
									{/*</div>*/}
								{/*</Link>*/}
								<div className="thumbnail" onClick={this.handleOpen.bind(this)}>
									<div className="signup-enter-item">
										<div className="signup-enter-item-text">
											<img className="signup-enter-item-icon" src="../image/activity.png" alt=""/>
											开始报名
										</div>
									</div>
								</div>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <Link to="/junior/login" className="thumbnail">
                                    <div className="signup-enter-item">
                                        <div className="signup-enter-item-text">
                                            <img className="signup-enter-item-icon" src="../image/location.png" alt=""/>
                                            报名查询
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
				<Modal show={this.state.is_show} onHide={this.handleClose.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>系统提示</Modal.Title>
					</Modal.Header>
					<Modal.Body>暂时停止报名！</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={this.handleClose.bind(this)}>
							确定
						</Button>
					</Modal.Footer>
				</Modal>
            </div>
        );
    }
}

export default connect((state) => {
    return {

    }
})(Entry);
