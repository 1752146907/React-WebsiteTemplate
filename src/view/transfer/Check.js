import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Row, Col, Button, Alert} from 'react-bootstrap';
import Print from 'rc-print';
import moment from 'moment';

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import PageSubNav from '../../component/PageSubNav';
import DepartmentSubNav from '../../component/DepartmentSubNav';

import http from '../../common/http';
import util from '../../common/util';
import storage from '../../common/storage';

class Check extends Component {
	constructor (props) {
		super(props);

		this.state = {
			is_load: false,
			result_type: '',
			result_message: '',
			menu_index: 1,
			signup_transfer: {},
			tip: '',
			schedule_date: '',
			schedule_assigned_scene: -1
		}
	}

	componentDidMount () {
		util.scrollToTop(0);
		console.log(storage.getTransferToken())
		if (storage.getTransferToken()) {
			this.handleFind();
		}
	}

	componentWillReceiveProps (nextProps) {

	}

	componentWillUnmount () {

	}

	handleEdit () {
		this.props.history.push({
			pathname: "/transfer/edit",
			query: {}
		});
	}

	handleLoad (signup_id) {
		http.request({
			url: '/desktop/xietong/schedule/assigned/find',
			data: {
				schedule_assigned_type: 'transfer',
				signup_id: signup_id
			},
			token: storage.getPrimaryToken(),
			success: function (data) {
				if (data != null) {
					this.setState({
						schedule_date: data.schedule_date,
						schedule_assigned_scene: data.schedule_assigned_scene
					});
				}
			}.bind(this),
			error: function (data) {

			}.bind(this),
			complete: function () {

			}.bind(this)
		})
	}

	handleFind () {
		this.setState({
			is_load: true,
			result_type: ""
		});

		http.request({
			url: '/desktop/xietong/signup/transfer/find',
			data: {},
			token: storage.getTransferToken(),
			success: function (data) {
				this.setState({
					tip: data.tip,
					signup_transfer: data.signup_transfer
				});

				// this.handleLoad(data.signup_transfer.signup_id);
			}.bind(this),
			error: function (data) {
				this.setState({
					result_type: 'danger',
					result_message: data.message,
					is_update: false
				});
			}.bind(this),
			complete: function () {
				this.setState({
					is_load: false
				})
			}.bind(this)
		})
	}

	render () {
		return (
			<div>
				<Header history={this.props.history} website_menu_id=""/>
				<div className="content container">
					<div className="title margin-top-20">
						<div className="title-icon"></div>
						<div className="title-breadcrumb">
							<Link to="/index">首页</Link> > <Link
							to="/page/e8417cd60aeb474aad40d4ecc8d52b22">招生招聘</Link> > <Link
							to="/transfer/entry">插班生报名</Link> > 插班生报名结果查询
						</div>
					</div>
					<div className="row margin-top-20">
						<div className="subnav col-md-3 hidden-xs">
							<PageSubNav website_menu_id="a8398373a697416eba6847c2e42c781d"
										page_id="92913aee2a8f4da0b36c0ae33d58677f"/>
							<DepartmentSubNav/>
						</div>
						<div className="col-md-9">
							{
								this.state.schedule_assigned_scene > -1 ?
									<div>
										<div style={{
											fontSize: '30px',
											fontWeight: '1000',
											textAlign: 'center',
											marginBottom: '30px'
										}}>
											面谈信息
										</div>
										<table border="1" cellSpacing="0" cellPadding="0" width="100%" style={{
											width: '100%',
											borderLeft: 'solid 1px black',
											borderTop: 'solid 1px black',
											borderRight: 'solid 1px black'
										}}>
											<tbody>
											<tr>
												<td style={{
													width: '20%',
													padding: '10px',
													borderRight: 'solid 1px black',
													borderBottom: 'solid 1px black',
													textAlign: 'center'
												}}>
													面谈时间
												</td>
												<td style={{
													width: '20%',
													padding: '10px',
													borderRight: 'solid 1px black',
													borderBottom: 'solid 1px black',
													textAlign: 'center'
												}}>
													<span
														style={{marginRight: '10px'}}>{this.state.schedule_date}</span>
													{
														this.state.schedule_assigned_scene == 0 ? '上午第一场' : ''
													}
													{
														this.state.schedule_assigned_scene == 1 ? '上午第二场' : ''
													}
													{
														this.state.schedule_assigned_scene == 2 ? '下午第一场' : ''
													}
													{
														this.state.schedule_assigned_scene == 3 ? '下午第二场' : ''
													}
												</td>
											</tr>
											</tbody>
										</table>
										<div style={{
											borderBottom: '1px solid #C8C8C8',
											marginTop: '100px',
											marginBottom: '100px'
										}}></div>
									</div>
									:
									''
							}
							<Print ref="print" insertHead={false}>
								<div>
									<div style={{marginBottom: '0px'}}></div>
									<Row>
										<Col md={24} style={{textAlign: 'center'}}>
											<span style={{
												fontSize: '30px',
												fontWeight: '1000'
											}}>佛山协同（国际）学校2019年插班生报名表</span>
										</Col>
									</Row>
									<Row style={{paddingTop: '0px', paddingLeft: '50px', paddingRight: '50px'}}>
										<Col md={24}>
											<table width="100%" style={{width: '100%'}}>
												<tr>
													<td style={{width: '65%', textAlign: 'left'}}>
														报名序号: {this.state.signup_transfer.signup_number}
													</td>
													<td style={{width: '35%', textAlign: 'left'}}>
														填报日期：{moment(this.state.signup_transfer.system_create_time).format('YYYY-MM-DD')}
													</td>
												</tr>
											</table>
											<table border="1" cellSpacing="0" cellPadding="0" width="100%" style={{
												width: '100%',
												borderLeft: 'solid 1px black',
												borderTop: 'solid 1px black',
												borderRight: 'solid 1px black'
											}}>
												<tr>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														学生姓名
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.student_name}
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														报读年级
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.read_grade}
													</td>
													<td style={{width: '20%', padding: '10px', textAlign: 'center'}}>

													</td>
												</tr>
												<tr>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														性别
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.student_sex}
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														出生年月日
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.student_birthday}
													</td>
													<td style={{width: '20%', padding: '10px', textAlign: 'center'}}>
														粘贴照片
													</td>
												</tr>
												<tr dangerouslySetInnerHTML={{__html: `<td style="padding: 10px; border-right: solid 1px black; text-align: center">原就读学校</td><td colspan="3" style="padding: 10px; border-right: solid 1px black; text-align: center">${this.state.signup_transfer.primary_school}</td><td style="width: 20%; padding: 10px; text-align: center"></td>`}}>

												</tr>
											</table>
											<table border="1" cellSpacing="0" cellPadding="0" width="100%" style={{
												width: '100%',
												borderLeft: 'solid 1px black',
												borderTop: 'solid 1px black',
												borderRight: 'solid 1px black'
											}}>
												<tr>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														证件类型
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.id_type}
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														学生证件号码
													</td>
													<td style={{
														width: '40%',
														padding: '10px',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.id_no}
													</td>
												</tr>
												<tr>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														textAlign: 'center'
													}}>
														户籍地址
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.permanent_address}
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														textAlign: 'center'
													}}>
														现地址
													</td>
													<td style={{width: '40%', padding: '10px', textAlign: 'center'}}>
														{this.state.signup_transfer.live_addresss}
													</td>
												</tr>
											</table>
											<table border="1" cellSpacing="0" cellPadding="0" width="100%"
												   style={{width: '100%', border: 'solid 1px black'}}>
												<tr dangerouslySetInnerHTML={{__html: `<td colspan='4' style="padding: 10px; border-bottom: solid 1px black; text-align: center">家庭主要成员</td>`}}></tr>
												<tr>
													<td style={{
														width: '25%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														姓名
													</td>
													<td style={{
														width: '25%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														称谓
													</td>
													<td style={{
														width: '25%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														联系电话
													</td>
													<td style={{
														width: '25%',
														padding: '10px',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														工作单位
													</td>
												</tr>
												<tr>
													<td style={{
														width: '25%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.father_name}
													</td>
													<td style={{
														width: '25%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														父亲
													</td>
													<td style={{
														width: '25%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.father_phone}
													</td>
													<td style={{
														width: '25%',
														padding: '10px',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.father_work}
													</td>
												</tr>
												<tr>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.mother_name}
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														母亲
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.mother_phone}
													</td>
													<td style={{
														padding: '10px',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_transfer.mother_work}
													</td>
												</tr>
												<tr dangerouslySetInnerHTML={{__html: `<td colspan='4' style="padding: 10px; border-bottom: solid 1px black; text-align: center">特长爱好</td>`}}></tr>
												<tr dangerouslySetInnerHTML={{__html: `<td colspan='4' style="padding: 10px; border-bottom: solid 1px black; text-align: left">${this.state.signup_transfer.remark}</td>`}}></tr>
												<tr>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														家长签名
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>

													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														学校受理人签名
													</td>
													<td style={{
														padding: '10px',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>

													</td>
												</tr>
												<tr dangerouslySetInnerHTML={{__html: `<td colspan='1' style="padding: 10px; border-right: solid 1px black; text-align: center">报名日期</td><td colspan='1' style="padding: 10px; border-right: solid 1px black; text-align: center"></td><td colspan='1' style="padding: 10px; border-right: solid 1px black; text-align: center">报名状态</td><td colspan='1' style="padding: 10px; text-align: left">已报名</td>`}}></tr>
											</table>
										</Col>
									</Row>
									<Row style={{
										paddingTop: '0px',
										paddingLeft: '50px',
										paddingRight: '50px',
										fontSize: '12px'
									}}>
										温馨提示：<br/>
										1.面谈测试时间：按学校规定时间参加测试，提前20分钟签到，自备文具。<br/>
										2.测试内容：<br/>
										1）报读小学插班生：语文，数学，三至六年级增加英语；<br/>
										2）报读初中插班生：数学，英语，初二和初三增加物理。<br/>
										3.携带资料：<br/>
										1）报名表，请自行网上打印，贴照片；<br/>
										2）户口本学生页复印件1张（港澳台籍身份证复印件，外籍护照复印件）；<br/>
										3）3张一寸证件照（不限底色）。<br/>
										4.请家长车辆在东鄱南路和轻工三路右侧车道斜停放。<br/>
										5.联系我们：0757-82596128、18188719581。<br/>
										6.打印报名表说明：请使用电脑端的浏览器进行打印。打印路径：登录我校官方网站www.fcis.net.cn点击“招生招聘”-“插班生报名”-报名查询-输入学生的身份证件号码（身份证）、密码-打印报名表
									</Row>
								</div>
							</Print>
							<div style={{marginBottom: '50px'}}></div>
							<Row>
								<Col smOffset={4} md={7}>
									<Button disabled={this.state.is_load}
											style={{backgroundColor: '#C26B60', color: 'white'}} bsSize="large"
											onClick={() => {
												this.refs.print.onPrint();
											}}>
										{this.state.is_load ? "加载中.." : "打印报名表"}
									</Button>
									{
										this.state.schedule_assigned_scene > -1 ?
											''
											:
											<Button disabled={this.state.is_load}
													style={{
														backgroundColor: '#C26B60',
														color: 'white',
														marginLeft: '30px'
													}}
													bsSize="large" onClick={this.handleEdit.bind(this)}>
												{this.state.is_load ? "加载中.." : "修改报名信息"}
											</Button>
									}
									<Button disabled={this.state.is_load}
											style={{
												backgroundColor: '#C26B60',
												color: 'white',
												marginLeft: '30px'
											}} bsSize="large"
											onClick={() => {
												localStorage.clear();

												this.props.history.push({
													pathname: "/transfer/entry",
													query: {}
												});
											}}>
										退出登录
									</Button>
								</Col>
							</Row>
							<Row>
								<Col md={11}>
									{
										this.state.result_type === "" ?
											""
											:
											<Alert bsStyle={this.state.result_type}>
												<h4>系统提示</h4>
												<div className="margin-top-15"
													 dangerouslySetInnerHTML={{__html: this.state.result_message}}></div>
											</Alert>
									}
								</Col>
							</Row>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default connect((state) => {
	return {}
})(Check);
