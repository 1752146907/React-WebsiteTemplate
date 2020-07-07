import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Form, FormGroup, FormControl, Row, Col, Button, Alert, ControlLabel, Radio} from 'react-bootstrap';
import Print from 'rc-print';
import moment from 'moment';

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import PageSubNav from '../../component/PageSubNav';
import DepartmentSubNav from '../../component/DepartmentSubNav';

import http from '../../common/http';
import util from '../../common/util';
import storage from '../../common/storage';
import {createForm} from "rc-form";

class Check extends Component {
	constructor (props) {
		super(props);

		this.state = {
			is_load: false,
			result_type: '',
			result_message: '',
			menu_index: 1,
			signup_junior: {},
			tip: '',
			schedule_id: '',
			schedule_date: '',
			schedule_assigned_id: '',
			schedule_scene_id: '',
			schedule_scene_time: '',
			schedule_assigned_change: -1,
			schedule_assigned_score: {},
			schedule_assigned_status: false,
			is_edit: false,
			schedule_scene_list: []
		}
	}

	componentDidMount () {
		util.scrollToTop(0);

		if (storage.getJuniorToken()) {
			this.handleFind();
		}
	}

	componentWillReceiveProps (nextProps) {

	}

	componentWillUnmount () {

	}

	handleEdit () {
		this.props.history.push({
			pathname: "/junior/edit",
			query: {}
		});
	}

	handleLoad (signup_id) {
		http.request({
			url: '/desktop/xietong/schedule/assigned/find',
			data: {
				schedule_assigned_type: 'junior',
				signup_id: signup_id
			},
			token: storage.getPrimaryToken(),
			success: function (data) {
				if (data != null) {
					this.setState({
						schedule_id: data.schedule_id,
						schedule_date: data.schedule_date,
						schedule_assigned_id: data.schedule_assigned_id,
						schedule_scene_id: data.schedule_scene_id,
						schedule_scene_time: data.schedule_scene_time,
						schedule_assigned_change: data.schedule_assigned_change,
						schedule_assigned_score: data.schedule_assigned_score,
						schedule_assigned_status: data.schedule_assigned_status
					});

					this.props.form.setFieldsValue({
						schedule_date: data.schedule_date,
						schedule_scene_id: data.schedule_scene_id,
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
			url: '/desktop/xietong/signup/junior/find',
			data: {},
			token: storage.getJuniorToken(),
			success: function (data) {
				this.setState({
					tip: data.tip,
					signup_junior: data.signup_junior
				});

				// this.handleLoad(data.signup_junior.signup_id);
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

	handleSceneEdit () {
		this.setState({
			is_load: true
		});

		http.request({
			url: '/desktop/xietong/schedule/scene/list',
			data: {
				schedule_id: this.state.schedule_id
			},
			token: storage.getJuniorToken(),
			success: function (data) {
				this.setState({
					schedule_scene_list: data,
					is_load: false,
					is_edit: true
				});
			}.bind(this),
			error: function (data) {

			}.bind(this),
			complete: function () {

			}.bind(this)
		});
	}

	handleChange () {
		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				var message = '';
				for (var error in errors) {
					message += "<p>";
					message += errors[error].errors[0].message;
					message += "</p>";
				}
				this.setState({
					result_type: 'danger',
					result_message: message
				});

				return;
			}

			if (this.state.schedule_date == values.schedule_date && this.state.schedule_scene_id == values.schedule_scene_id) {
				this.setState({
					result_type: 'danger',
					result_message: '不能选同一天的同一个场次'
				});

				return false;
			}

			this.setState({
				is_load: true,
				result_type: ""
			});

			http.request({
				url: '/desktop/xietong/schedule/assigned/change',
				data: {
					schedule_assigned_id: this.state.schedule_assigned_id,
					schedule_date: values.schedule_date,
					schedule_scene_id: values.schedule_scene_id
				},
				token: storage.getJuniorToken(),
				success: function (data) {
					this.handleFind();

					this.setState({
						schedule_assigned_change: 1,
						is_edit: false
					});
				}.bind(this),
				error: function (data) {
					this.setState({
						result_type: 'danger',
						result_message: data.message
					});
				}.bind(this),
				complete: function () {
					this.setState({
						is_load: false
					})
				}.bind(this)
			});
		});
	}

	render () {
		const {getFieldProps, getFieldError, getFieldValue} = this.props.form;

		return (
			<div>
				<Header history={this.props.history} website_menu_id=""/>
				<div className="content container">
					<div className="title margin-top-20">
						<div className="title-icon"></div>
						<div className="title-breadcrumb">
							<Link to="/index">首页</Link> > <Link
							to="/page/e8417cd60aeb474aad40d4ecc8d52b22">招生招聘</Link> > <Link
							to="/junior/entry">初中报名</Link> > 初中报名结果查询
						</div>
					</div>
					<div className="row margin-top-20">
						<div className="subnav col-md-3 hidden-xs">
							<PageSubNav website_menu_id="a8398373a697416eba6847c2e42c781d"
										page_id="7d32e0491eed4fa58a2e05cf2079303c"/>
							<DepartmentSubNav/>
						</div>
						<div className="col-md-9">
							{
								this.state.schedule_scene_id != '' ?
									<div>
										<div style={{
											fontSize: '30px',
											fontWeight: '1000',
											textAlign: 'center',
											marginBottom: '30px'
										}}>
											面谈信息
										</div>
										<Form horizontal className="margin-top-20"
											  style={{
												  display: this.state.is_edit ? 'inline' : 'none'
											  }}>
											<FormGroup {...getFieldProps('schedule_date', {
												rules: [{
													required: true,
													message: '面谈日期不能为空'
												}],
												initialValue: ''
											})} validationState={getFieldError('schedule_date') ? 'error' : getFieldValue('schedule_date') === '' ? null : 'success'}>
												<Col componentClass={ControlLabel} md={2}>
													面谈日期
												</Col>
												<Col md={8}>
													<FormControl type="date" placeholder="请输入面谈日期"
																 value={getFieldValue('schedule_date')}/>
													<FormControl.Feedback/>
													<span
														className="error-message">{getFieldError('schedule_date')}</span>
												</Col>
											</FormGroup>
											<FormGroup {...getFieldProps('schedule_scene_id', {
												rules: [{
													required: true,
													message: '面谈场次不能为空'
												}],
												initialValue: ''
											})} validationState={getFieldError('schedule_scene_id') ? 'error' : getFieldValue('schedule_scene_id') === '' ? null : 'success'}>
												<Col componentClass={ControlLabel} md={2}>
													面谈场次
												</Col>
												<Col md={8} className="col-no-padding">
													{
														this.state.schedule_scene_list.map(function (scene) {
															return (
																<Col md={3} key={scene.schedule_scene_id}>
																	<Radio name="schedule_scene_id" value={scene.schedule_scene_id}
																		   checked={getFieldValue('schedule_scene_id') == scene.schedule_scene_id}>
																		{scene.schedule_scene_time}
																	</Radio>
																</Col>
															)
														}.bind(this))
													}
													<Col md={12}>
														<span className="error-message">{getFieldError('schedule_scene_id')}</span>
													</Col>
												</Col>
											</FormGroup>
										</Form>
										<table border="1" cellSpacing="0" cellPadding="0" width="100%" style={{
											display: this.state.is_edit ? 'none' : 'table',
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
													textAlign: 'right'
												}}>
													面谈时间
												</td>
												<td style={{
													width: '80%',
													padding: '10px',
													borderRight: 'solid 1px black',
													borderBottom: 'solid 1px black',
													textAlign: 'left'
												}}>
													<span style={{marginRight: '10px'}}>{this.state.schedule_date} {this.state.schedule_scene_time}</span>
												</td>
											</tr>
											{
												this.state.schedule_assigned_status ?
													<tr>
														<td style={{
															width: '20%',
															padding: '10px',
															borderRight: 'solid 1px black',
															borderBottom: 'solid 1px black',
															textAlign: 'right'
														}}>
															面谈成绩
														</td>
														<td style={{
															width: '80%',
															padding: '10px',
															borderRight: 'solid 1px black',
															borderBottom: 'solid 1px black',
															textAlign: 'left'
														}}>
															<span style={{marginRight: '10px'}}>{this.state.schedule_assigned_score.score0Title}</span>{this.state.schedule_assigned_score.score0}<br/>
															<span style={{marginRight: '10px'}}>{this.state.schedule_assigned_score.score1Title}</span>{this.state.schedule_assigned_score.score1}<br/>
															<span style={{marginRight: '10px'}}>{this.state.schedule_assigned_score.score2Title}</span>{this.state.schedule_assigned_score.score2}<br/>
															<span style={{marginRight: '10px'}}>总分</span>{this.state.schedule_assigned_score.scoreTotal}<br/>
														</td>
													</tr>
													:
													''
											}
											{
												this.state.schedule_assigned_status ?
													<tr>
														<td style={{
															width: '20%',
															padding: '10px',
															borderRight: 'solid 1px black',
															borderBottom: 'solid 1px black',
															textAlign: 'right'
														}}>
															温馨提示
														</td>
														<td style={{
															width: '80%',
															padding: '10px',
															borderRight: 'solid 1px black',
															borderBottom: 'solid 1px black',
															textAlign: 'left'
														}}>
															{this.state.schedule_assigned_score.remind}
														</td>
													</tr>
													:
													''
											}
											</tbody>
										</table>
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
										<div style={{
											marginTop: '50px',
											textAlign: 'center'
										}}>
											{
												this.state.is_edit ?
													<Button disabled={this.state.is_load}
															style={{
																backgroundColor: '#C26B60',
																color: 'white',
															}} bsSize="large"
															onClick={() => {
																this.handleChange();
															}}>
														提交修改信息（只有一次修改机会）
													</Button>
													:
													this.state.schedule_assigned_change > 0 || this.state.schedule_assigned_status ?
														''
														:
														<Button disabled={this.state.is_load}
																style={{
																	backgroundColor: '#C26B60',
																	color: 'white',
																}} bsSize="large"
																onClick={() => {
																	this.handleSceneEdit();
																}}>
															修改面谈时间（只有一次修改机会）
														</Button>
											}
										</div>
										<div style={{
											borderBottom: '1px solid #C8C8C8',
											marginTop: '50px',
											marginBottom: '100px'
										}}>
										</div>
									</div>
									:
									''
							}
							<Print ref="print" insertHead={false}>
								<div>
									<div style={{marginBottom: '30px'}}></div>
									<Row>
										<Col md={24} style={{textAlign: 'center'}}>
											<span style={{
												fontSize: '30px',
												fontWeight: '1000'
											}}>佛山协同（国际）学校初一新生自荐报名表</span>
										</Col>
									</Row>
									<div style={{marginBottom: '25px'}}></div>
									<Row>
										<Col md={24}>
											<table width="100%" style={{width: '100%'}}>
												<tr>
													<td style={{width: '65%', textAlign: 'left'}}>
														报名序号: {this.state.signup_junior.signup_number}
													</td>
													<td style={{width: '35%', textAlign: 'left'}}>
														填报日期：{moment(this.state.signup_junior.system_create_time).format('YYYY-MM-DD')}
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
														{this.state.signup_junior.student_name}
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														性别
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_junior.student_sex}
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
														出生年月日
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_junior.student_birthday}
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														原就读小学
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_junior.primary_school}
													</td>
													<td style={{width: '20%', padding: '10px', textAlign: 'center'}}>
														粘贴照片
													</td>
												</tr>
												<tr>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														textAlign: 'center'
													}}>
														小学班级
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_junior.primary_school_class}
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														textAlign: 'center'
													}}>
														担任职务
													</td>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_junior.job}
													</td>
													<td style={{width: '20%', padding: '10px', textAlign: 'center'}}>

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
														证件类型
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_junior.id_type}
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
														{this.state.signup_junior.id_no}
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
														{this.state.signup_junior.permanent_address}
													</td>
													<td style={{
														width: '20%',
														padding: '10px',
														borderRight: 'solid 1px black',
														textAlign: 'center'
													}}>
														居住地址
													</td>
													<td style={{width: '40%', padding: '10px', textAlign: 'center'}}>
														{this.state.signup_junior.live_addresss}
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
														{this.state.signup_junior.father_name}
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
														{this.state.signup_junior.father_phone}
													</td>
													<td style={{
														width: '25%',
														padding: '10px',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_junior.father_work}
													</td>
												</tr>
												<tr>
													<td style={{
														padding: '10px',
														borderRight: 'solid 1px black',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_junior.mother_name}
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
														{this.state.signup_junior.mother_phone}
													</td>
													<td style={{
														padding: '10px',
														borderBottom: 'solid 1px black',
														textAlign: 'center'
													}}>
														{this.state.signup_junior.mother_work}
													</td>
												</tr>
												<tr dangerouslySetInnerHTML={{__html: `<td colspan='4' style="padding: 10px; border-bottom: solid 1px black; text-align: center">特长爱好</td>`}}></tr>
												<tr dangerouslySetInnerHTML={{__html: `<td colspan='4' style="padding: 10px; border-bottom: solid 1px black; text-align: left">${this.state.signup_junior.remark}</td>`}}></tr>
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
									<Row style={{fontSize: '12px'}}>
										<Col md={24}>
											温馨提示：<br/>
											1.面谈时间：按规定的时间到校参加面谈。<br/>
											2.测试内容：人文素养，数理思维，英语交流。<br/>
											3.携带资料：<br/>
											1）报名表，请自行网上打印，贴照片；<br/>
											2）户口本学生页复印件1张（港澳台籍身份证复印件，外籍护照复印件）；<br/>
											3）3张一寸证件照（不限底色）。<br/>
											4.请家长车辆在东鄱南路和轻工三路右侧车道斜停放。<br/>
											5.联系我们：0757-82596128、18188719581。<br/>
											6.打印报名表说明：请使用电脑端的浏览器进行打印。打印路径：登录我校官方网站www.fcis.net.cn点击招生招聘-初一新生报名-报名查询-输入学生的身份证件号码（身份证）、密码-打印报名表
										</Col>
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
										this.state.schedule_scene_id != '' ?
											''
											:
											<Button disabled={this.state.is_load} style={{
												backgroundColor: '#C26B60',
												color: 'white',
												marginLeft: '30px'
											}} bsSize="large" onClick={this.handleEdit.bind(this)}>
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
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

Check = createForm({})(Check);

export default connect((state) => {
	return {}
})(Check);
