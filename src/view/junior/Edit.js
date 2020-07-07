import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createForm} from 'rc-form';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Alert, Radio} from 'react-bootstrap';
import moment from 'moment';

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import PageSubNav from '../../component/PageSubNav';
import DepartmentSubNav from '../../component/DepartmentSubNav';

import http from '../../common/http';
import util from '../../common/util';
import storage from '../../common/storage';

class Edit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			is_load: false,
			result_type: '',
			result_message: '',
			menu_index: 1,
			signup_id: '',
			system_version: '',
			user_id: ''
		}
	}

	componentDidMount() {
		util.scrollToTop(0);
		if (storage.getJuniorToken()) {
			this.handleFind();
		}
	}

	componentWillReceiveProps(nextProps) {

	}

	componentWillUnmount() {

	}

	handlSubmit() {
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

			this.setState({
				is_load: true,
				result_type: ""
			});
			values.signup_id = this.state.signup_id;
			values.system_version = this.state.system_version;
			values.user_id = this.state.user_id;

			values.father_id_no = '';
			values.mother_id_no = '';
            values.student_category = '初中一年级新生';
			http.request({
				url: '/desktop/xietong/signup/junior/update',
				data: values,

				success: function (data) {
					this.setState({
						result_type: 'success',
						result_message: '修改成功',
						system_version: this.state.system_version + 1
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
					});
				}.bind(this)
			});
		});
	}

	handleFind() {
		this.setState({
			result_type: ""
		});

		http.request({
			url: '/desktop/xietong/signup/junior/find',
			data: {},
			token: storage.getJuniorToken(),
			success: function (data) {
				this.setState({
					result_type: 'success',
					result_message: data.tip,
					signup_id: data.signup_junior.signup_id,
					system_version: data.signup_junior.system_version,
					user_id: data.signup_junior.user_id
				}, function() {
					this.props.form.setFieldsValue({
						student_name: data.signup_junior.student_name,
						student_sex: data.signup_junior.student_sex,
						student_birthday: data.signup_junior.student_birthday,
						primary_school: data.signup_junior.primary_school,
						primary_school_class: data.signup_junior.primary_school_class,
						job: data.signup_junior.job,
						id_type: data.signup_junior.id_type,
						id_no: data.signup_junior.id_no,
						permanent_address: data.signup_junior.permanent_address,
						live_addresss: data.signup_junior.live_addresss,
						father_name: data.signup_junior.father_name,
						father_work: data.signup_junior.father_work,
						father_phone: data.signup_junior.father_phone,
						mother_name: data.signup_junior.mother_name,
						mother_work: data.signup_junior.mother_work,
						mother_phone: data.signup_junior.mother_phone,
						remark: data.signup_junior.remark
					});
				});
			}.bind(this),
			error: function (data) {
				this.setState({
					result_type: 'danger',
					result_message: data.message
				});
			}.bind(this),
			complete: function () {

			}
		})
	}

	render() {

		const {getFieldProps, getFieldError, getFieldValue} = this.props.form;

		return (
			<div>
				<Header history={this.props.history} website_menu_id=""/>
				<div className="content container">
					<div className="title margin-top-20">
						<div className="title-icon"></div>
						<div className="title-breadcrumb">
							<Link to="/index">首页</Link> > <Link to="/page/e8417cd60aeb474aad40d4ecc8d52b22">招生招聘</Link> >  <Link to="/junior/entry">初中报名</Link>  > 初中报名信息修改
						</div>
					</div>
					<div className="row margin-top-20">
						<div className="subnav col-md-3 hidden-xs">
							<PageSubNav website_menu_id="a8398373a697416eba6847c2e42c781d" page_id="7d32e0491eed4fa58a2e05cf2079303c"/>
							<DepartmentSubNav/>
						</div>
						<div className="col-md-9">
							<Form horizontal style={{marginTop: '20px'}}>
								<FormGroup>
									<Col componentClass={ControlLabel} md={1}>
									</Col>
									<Col md={9} style={{textAlign: 'center'}}>
										<span style={{fontSize: '24px', fontWeight: '1000'}}>佛山协同（国际）学校初一新生自荐报名</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('student_name', {
									rules: [{
										required: true,
										message: '学生姓名不能为空'
									}],
									initialValue: ''
								})} validationState={getFieldError('student_name') ? 'error' : getFieldValue('student_name') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										学生姓名
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入姓名" value={getFieldValue('student_name')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('student_name')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('student_sex', {
									rules: [{
										required: true,
										message: '性别不能为空'
									}],
									initialValue: ''
								})} validationState={getFieldError('student_sex') ? 'error' : getFieldValue('student_sex') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										性别
									</Col>
									<Col md={8} className="col-no-padding">
										<Col md={6}>
											<Radio name="student_sex" value="男" checked={getFieldValue('student_sex') === '男'}>
												男
											</Radio>
										</Col>
										<Col md={6}>
											<Radio name="student_sex" value="女" checked={getFieldValue('student_sex') === '女'}>
												女
											</Radio>
											<FormControl.Feedback/>
										</Col>
										<Col md={12}>
											<span className="error-message">{getFieldError('student_sex')}</span>
										</Col>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('student_birthday', {
									rules: [{
										required: true,
										message: '出生日期不能为空'
									}],
									initialValue: ''
								})} validationState={getFieldError('student_birthday') ? 'error' : getFieldValue('student_birthday') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										出生日期
									</Col>
									<Col md={8}>
										<FormControl type="date" placeholder="请输入出生日期" value={getFieldValue('student_birthday')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('student_birthday')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('primary_school', {
									rules: [{
										required: true,
										message: '原就读小学不能为空'
									}],
									initialValue: ''
								})} validationState={getFieldError('primary_school') ? 'error' : getFieldValue('primary_school') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										原就读小学
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入原就读小学" value={getFieldValue('primary_school')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('primary_school')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('primary_school_class', {
									rules: [{
										required: true,
										message: '小学班级不能为空'
									}],
									initialValue: ''
								})} validationState={getFieldError('primary_school_class') ? 'error' : getFieldValue('primary_school_class') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										小学班级
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入小学班级" value={getFieldValue('primary_school_class')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('primary_school_class')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('job', {
									rules: [{
										required: true,
										message: '担任职务不能为空'
									}],
									initialValue: ''
								})} validationState={getFieldError('job') ? 'error' : getFieldValue('job') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										担任职务
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入担任职务" value={getFieldValue('job')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('job')}</span>
									</Col>
								</FormGroup>

								<FormGroup {...getFieldProps('id_type', {
									rules: [{
										required: true,
										message: '学生证件类型不能为空'
									}],
									initialValue: ''
								})} validationState={getFieldError('id_type') ? 'error' : getFieldValue('id_type') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										学生证件类型
									</Col>
									<Col md={8} className="col-no-padding">
										<Col md={3}>
											<Radio name="id_type" value="身份证" checked={getFieldValue('id_type') === '身份证'}>
												身份证
											</Radio>
										</Col>
										<Col md={3}>
											<Radio name="id_type" value="户口本" checked={getFieldValue('id_type') === '户口本'}>
												户口本
											</Radio>
										</Col>
										<Col md={3}>
											<Radio name="id_type" value="港澳台身份证" checked={getFieldValue('id_type') === '港澳台身份证'}>
												港澳台身份证
											</Radio>
										</Col>
										<Col md={3}>
											<Radio name="id_type" value="护照" checked={getFieldValue('id_type') === '护照'}>
												护照
											</Radio>
											<FormControl.Feedback/>
										</Col>
										<Col md={12}>
											<span className="error-message">{getFieldError('id_type')}</span>
										</Col>
									</Col>
								</FormGroup>

								<FormGroup {...getFieldProps('id_no', {
									rules: [{
										required: true,
										message: '证件号码不能为空'
									}],
									initialValue: ''
								})} validationState={getFieldError('id_no') ? 'error' : getFieldValue('id_no') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										证件号码
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入证件号码" value={getFieldValue('id_no')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('id_no')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('permanent_address', {
									rules: [{
										required: true,
										message: '户籍地址不能为空'
									}],
									initialValue: ''
								})} validationState={getFieldError('permanent_address') ? 'error' : getFieldValue('permanent_address') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										户籍地址
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入户籍地址" value={getFieldValue('permanent_address')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('permanent_address')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('live_addresss', {
									rules: [{
										required: true,
										message: '居住地址不能为空'
									}],
									initialValue: ''
								})} validationState={getFieldError('live_addresss') ? 'error' : getFieldValue('live_addresss') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										居住地址
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入居住地址" value={getFieldValue('live_addresss')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('live_addresss')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('father_name', {
									initialValue: ''
								})} validationState={getFieldError('father_name') ? 'error' : getFieldValue('father_name') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										父亲姓名
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入父亲姓名" value={getFieldValue('father_name')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('father_name')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('father_phone', {
									initialValue: ''
								})} validationState={getFieldError('father_phone') ? 'error' : getFieldValue('father_phone') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										父亲手机号码
									</Col>
									<Col md={8}>
										<FormControl type="tel" placeholder="请输入父亲手机号码" value={getFieldValue('father_phone')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('father_phone')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('father_work', {
									initialValue: ''
								})} validationState={getFieldError('father_work') ? 'error' : getFieldValue('father_work') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										父亲工作单位
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入父亲工作单位" value={getFieldValue('father_work')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('father_work')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('mother_name', {
									initialValue: ''
								})} validationState={getFieldError('mother_name') ? 'error' : getFieldValue('mother_name') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										母亲姓名
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入母亲姓名" value={getFieldValue('mother_name')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('mother_name')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('mother_phone', {
									initialValue: ''
								})} validationState={getFieldError('mother_phone') ? 'error' : getFieldValue('mother_phone') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										母亲手机号码
									</Col>
									<Col md={8}>
										<FormControl type="tel" placeholder="请输入母亲手机号码" value={getFieldValue('mother_phone')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('mother_phone')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('mother_work', {
									initialValue: ''
								})} validationState={getFieldError('mother_work') ? 'error' : getFieldValue('mother_work') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										母亲工作单位
									</Col>
									<Col md={8}>
										<FormControl placeholder="请输入母亲工作单位" value={getFieldValue('mother_work')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('mother_work')}</span>
									</Col>
								</FormGroup>
								<FormGroup {...getFieldProps('remark', {
									initialValue: ''
								})} validationState={getFieldError('remark') ? 'error' : getFieldValue('remark') === '' ? null : 'success'}>
									<Col componentClass={ControlLabel} md={2}>
										兴趣、爱好、特长
									</Col>
									<Col md={8}>
										<FormControl componentClass="textarea" value={getFieldValue('remark')}/>
										<FormControl.Feedback/>
										<span className="error-message">{getFieldError('remark')}</span>
									</Col>
								</FormGroup>
								<FormGroup>
									<Col smOffset={2} md={8}>
										<Button disabled={this.state.is_load} onClick={this.handlSubmit.bind(this)}>
											{this.state.is_load ? "加载中.." : "提交"}
										</Button>
									</Col>
								</FormGroup>
								<FormGroup>
									<Col smOffset={2} sm={9}>
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
								</FormGroup>
							</Form>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

Edit = createForm({})(Edit);

export default connect((state) => {
	return {}
})(Edit);
