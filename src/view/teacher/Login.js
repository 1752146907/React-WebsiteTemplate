import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createForm} from 'rc-form';
import {Form, FormGroup, Col, ControlLabel, FormControl, Button, Alert} from 'react-bootstrap';

import Header from '../../component/Header';
import Footer from '../../component/Footer';
import DepartmentSubNav from '../../component/DepartmentSubNav';

import http from '../../common/http';
import util from '../../common/util';

class TeacherLogin extends Component {
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
        util.setTitle('老师登录');

        util.scrollToTop(0);
    }

    componentWillReceiveProps(nextProps) {
        util.scrollToTop(0);
    }

    componentWillUnmount() {

    }

    handlSubmit() {
        this.props.form.validateFields((errors, value) => {
            if (!!errors) {
                var message = '';
                for (var error in errors) {
                    message += '<p>';
                    message += errors[error].errors[0].message;
                    message += '</p>';
                }
                this.setState({
                    result_type: 'danger',
                    result_message: message
                });

                return;
            }

            this.setState({
                is_load: true,
                result_type: ''
            });

            http.request({
                url: '/desktop/xietong/student/login',
                data: {
                    page_id: this.state.page_id
                },
                success: function (data) {
                    // setToken(data.token);
                    // setStudentName(data.student_name);
                    // setClazzName(data.clazz_name);

                    this.setState({
                        result_type: 'success',
                        result_message: '登录成功'
                    });

                    setTimeout(function () {
                        this.props.history.push({
                            pathname: "/index",
                            query: {}
                        });
                    }.bind(this), 500);
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
                            <Link to="/index">首页</Link> >  老师登录
                        </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="subnav col-md-3 hidden-xs">
                            <DepartmentSubNav/>
                        </div>
                        <div className="col-md-9">
                            <Form horizontal className="form">
                                <FormGroup {...getFieldProps('user_account', {
                                    rules: [{
                                        required: true,
                                        message: '老师账号不能为空'
                                    }],
                                    initialValue: ''
                                })} validationState={getFieldError('user_account') ? 'error' : getFieldValue('user_account') === '' ? null : 'success'}>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        老师账号
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl placeholder="请输入老师账号"/>
                                        <FormControl.Feedback/>
                                        <span className="error-message">{getFieldError('user_account')}</span>
                                    </Col>
                                </FormGroup>

                                <FormGroup {...getFieldProps('user_password', {
                                    rules: [{
                                        required: true,
                                        message: '登录密码不能为空'
                                    }],
                                    initialValue: ''
                                })} validationState={getFieldError('user_password') ? 'error' : getFieldValue('user_password') === '' ? null : 'success'}>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        登录密码
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl type="password" placeholder="请输入登录密码"/>
                                        <FormControl.Feedback/>
                                        <span className="error-message">{getFieldError('user_password')}</span>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={7}>
                                        <Button disabled={this.state.is_load}
                                                onClick={this.handlSubmit.bind(this)}>
                                            {this.state.is_load ? "加载中.." : "登录系统"}
                                        </Button>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={7}>
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

TeacherLogin = createForm({})(TeacherLogin);

export default connect((state) => {
    return {

    }
})(TeacherLogin);
