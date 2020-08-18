import React, {Component} from 'react';
// import {connect} from 'dva';
// import {routerRedux} from 'dva/router';
import ReconnectingWebSocket from 'reconnecting-websocket';

import { Carousel } from 'antd';
import '../../assets/css/sign.css';
import http from "../../util/http";
import constant from "../../util/application";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            pageIndex: 1,
            pageSize: 14,
            total: 0,
            meetingSignQrCode: '',
            meetingSignImageList: [],
            memberAvatar: '',
            investmentRegistrationCompany: '',
            signList: [],
            signNew: {},
            clientHeight: document.body.clientHeight,
            minHeight: document.body.clientHeight,
            meetingSignBackgroundImage: '',
            bgStyle: {
                minHeight: document.documentElement.clientHeight,
                backgroundImage: `url(${''})`,
                backgroundSize: '100%,100%',
            },
        }
    }

    componentDidMount() {
        document.title = "";

        this.handleLoad();
        this.handleRoll(50);
        // this.handleWebSocket();
        if (constant.webSocketHost) {
            const noticeSocket = new ReconnectingWebSocket(`${constant.webSocketHost}/notification/sign/${constant.appId}/signer`);
            noticeSocket.onopen = () => {
                console.log('连接成功');
            };

            noticeSocket.onclose = () => {
                console.log('连接关闭');
            };

            noticeSocket.onerror = () => {
                console.log('连接出错');
            };

            noticeSocket.onmessage = (event) => {
                this.state.signList.unshift(JSON.parse(event.data));
                this.setState({
                    signNew: JSON.parse(event.data),
                    signList: this.state.signList
                })
                // if (event.data === userId) {
                //     message.info('您收到新的通知，请及时查看');
                //     if (dispatch) {
                //         dispatch({
                //             type: 'global/fetchNotices',
                //         });
                //     }
                // }
            }
        }
    }

    componentWillUnmount() {

    }

    handleLoad = () => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/purchase/meeting/sign/website/v1/find',
            data: {
                meetingSignId: '1282561786196922368'
            },
            success: (data) => {
                var newStyle = {
                    minHeight: document.documentElement.clientHeight,
                    backgroundImage: `url(${''})`,
                    backgroundSize: '100%,100%',
                };
                if(data.meetingSignBackgroundImage) {
                    var bgImage = constant.imagePreviewHost + data.meetingSignBackgroundImage;
                    newStyle.backgroundImage = `url(${bgImage})`;
                }else {
                    newStyle.backgroundImage = `url(${require('../../assets/image/sign-bg.jpg')})`;
                }

                this.setState({
                    meetingSignQrCode: data.meetingSignQrCode,
                    meetingSignImageList: data.meetingSignImageList,
                    meetingSignBackgroundImage: data.meetingSignBackgroundImage,
                    bgStyle: newStyle,
                });
                this.handleSignList();
            },
            complete: () => {
                this.setState({
                    isLoading: false,
                });
            }
        });
    };

    handleRoll = (t) => {
        var ul1 = document.getElementById("sign-box1");
        var ul2 = document.getElementById("sign-box2");
        var ulbox = document.getElementById("sign-box");
        ul2.innerHTML = ul1.innerHTML;
        ulbox.scrollTop = 0; // 开始无滚动时设为0
        var timer = setInterval(this.handleRollStart, t); // 设置定时器，参数t用在这为间隔时间（单位毫秒），参数t越小，滚动速度越快
    };

    handleRollStart = () => {
        var ul1 = document.getElementById("sign-box1");
        var ul2 = document.getElementById("sign-box2");
        var ulbox = document.getElementById("sign-box");
        if (ulbox.scrollTop >= ul1.scrollHeight) {
            ulbox.scrollTop = 0;
        } else {
            ulbox.scrollTop++;
        }
    };

    handleSignList = () => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/purchase/meeting/sign/website/v1/signed/list',
            data: {
                investmentRegistrationIdsStr: '1271395884441145344-1281466551467380736'
            },
            success: (data) => {
                this.setState({
                    signNew: data && data.length > 0 ? data[0] : {},
                    signList: data,
                });
            },
            complete: () => {
                this.setState({
                    isLoading: false,
                });
            }
        });
    };


    render() {
        // style={this.state.bgStyle}
        return (
            <div className="sign" style={this.state.bgStyle}>
                <div className="sign-left">
                    <div className="sign-carousel">
                        <Carousel autoplay dots={false} >
                            {
                                this.state.meetingSignImageList ? this.state.meetingSignImageList.map((item, index) => (
                                    <div className="sign-carousel-item" key={index}>
                                        <img className="sign-carousel-item" src={constant.imagePreviewHost + item} alt=""/>
                                    </div>
                                )) : null
                            }
                        </Carousel>
                    </div>
                </div>
                <div className="sign-right">
                    {/*<img className="sign-code" src={require('../../assets/image/sign-bg.jpg')} alt=""/>*/}
                    <img className="sign-code" src={require('../../assets/image/sign-code.png')} alt=""/>
                    {
                        this.state.signList && this.state.signList.length > 0 ?  <div className="sign-new">
                            <div className="sign-ul-li">
                                <img className="li-img" src={constant.imagePreviewHost + this.state.signNew.memberAvatar} alt=""/>
                                <div className="li-title">{this.state.signNew.investmentRegistrationCompany}</div>
                                <div className="li-success">已签到</div>
                            </div>
                        </div> : null
                    }
                    <div className="sign-list" id="sign-box">
                        <div className="sign-ul" id="sign-box1">
                            {
                                this.state.signList ? this.state.signList.map((item, index) => (
                                    index > 0 ?
                                    <div className="sign-ul-li" key={index}>
                                        <img className="li-img" src={constant.imagePreviewHost + item.memberAvatar} alt=""/>
                                        <div className="li-title">{item.investmentRegistrationCompany}</div>
                                        <div className="li-success">已签到</div>
                                    </div> : null
                                )) : null
                            }
                        </div>
                        <div id="sign-box2"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
// export default connect(({bindActionCreators }) => ({bindActionCreators }))(Index);
