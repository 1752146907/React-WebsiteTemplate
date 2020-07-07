import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createForm} from 'rc-form';
import {Form, FormGroup, Col, ControlLabel, FormControl, Radio, Button, Alert} from 'react-bootstrap';
import moment from 'moment';

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import PageSubNav from '../../component/PageSubNav';
import DepartmentSubNav from '../../component/DepartmentSubNav';

import http from '../../common/http';
import util from '../../common/util';
import storage from '../../common/storage';

class Signup extends Component {
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
        util.setTitle(`佛山协同(国际)学校小升初自荐报名`);

        util.scrollToTop(0);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    handlSubmit() {
        debugger;
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
            values.father_id_no = '';
            values.mother_id_no = '';
            values.chinese_score = '';
            values.math_score = '';
            values.english_score = '';
            values.student_category = '初中一年级新生';
            http.request({
                url: '/desktop/xietong/signup/junior/save',
                data: values,
                success: function (data) {
                    this.setState({
                        result_type: 'success',
                        result_message: '提交成功, 账号为证件号码，初始密码123456，可查询报名'
                    });
                    storage.setJuniorToken(data.token);
                    this.props.form.resetFields();
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

    render() {
        const {getFieldProps, getFieldError, getFieldValue} = this.props.form;

        return (
            <div>
                <Header history={this.props.history} website_menu_id=""/>
                <div className="content container">
                    <div className="title margin-top-20">
                        <div className="title-icon"></div>
                        <div className="title-breadcrumb">
                            <Link to="/index">首页</Link> > <Link to="/page/e8417cd60aeb474aad40d4ecc8d52b22">招生招聘</Link> >  <Link to="/junior/entry">初中报名</Link> > 初中报名信息填写
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="subnav col-md-3 hidden-xs">
                            <PageSubNav website_menu_id="a8398373a697416eba6847c2e42c781d" page_id="7d32e0491eed4fa58a2e05cf2079303c"/>
                            <DepartmentSubNav/>
                        </div>
                        <div className="col-md-9">
                            <Form horizontal className="margin-top-20">
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
                                        message: '班级不能为空'
                                    }],
                                    initialValue: ''
                                })} validationState={getFieldError('primary_school_class') ? 'error' : getFieldValue('primary_school_class') === '' ? null : 'success'}>
                                    <Col componentClass={ControlLabel} md={2}>
                                        班级
                                    </Col>
                                    <Col md={8}>
                                        <FormControl placeholder="请输入班级" value={getFieldValue('primary_school_class')}/>
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
                                        message: '学生的证件号码不能为空'
                                    }],
                                    initialValue: ''
                                })} validationState={getFieldError('id_no') ? 'error' : getFieldValue('id_no') === '' ? null : 'success'}>
                                    <Col componentClass={ControlLabel} md={2}>
										学生的证件号码
                                    </Col>
                                    <Col md={8}>
                                        <FormControl placeholder="请输入学生的证件号码" value={getFieldValue('id_no')}/>
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
                                <FormGroup {...getFieldProps('father_phone', {
                                    initialValue: ''
                                })} validationState={getFieldError('father_phone') ? 'error' : getFieldValue('father_phone') === '' ? null : 'success'}>
                                    <Col componentClass={ControlLabel} md={2}>
                                        手机号码
                                    </Col>
                                    <Col md={8}>
                                        <FormControl type="tel" placeholder="请输入手机号码" value={getFieldValue('father_phone')}/>
                                        <FormControl.Feedback/>
                                        <span className="error-message">{getFieldError('father_phone')}</span>
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
                                <FormGroup {...getFieldProps('mother_phone', {
                                    initialValue: ''
                                })} validationState={getFieldError('mother_phone') ? 'error' : getFieldValue('mother_phone') === '' ? null : 'success'}>
                                    <Col componentClass={ControlLabel} md={2}>
                                        手机号码
                                    </Col>
                                    <Col md={8}>
                                        <FormControl type="tel" placeholder="请输入手机号码" value={getFieldValue('mother_phone')}/>
                                        <FormControl.Feedback/>
                                        <span className="error-message">{getFieldError('mother_phone')}</span>
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
                                    <Col smOffset={2} md={8}>
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

Signup = createForm({})(Signup);

export default connect((state) => {
    return {

    }
})(Signup);
