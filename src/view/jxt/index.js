import React, {Component} from 'react';
import CountUp from 'react-countup';
// import {connect} from 'dva';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

import '../../assets/css/jxt.css';
import http from "../../util/http";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            tagList: [],
            showId: 0,
            startNum: 0,
            totalPrice: 597865239015,
            totalNum: '',
            duration: 1,
            projectInfoTypeList: [],
            projectInfoAreaList: []
        };
    }

    componentDidMount() {
        document.title = "中采云-建信通";

        var that = this;

        that.handleLoad();

        var showId = that.state.showId;
        setInterval(function(){
            showId += 1;
            that.setState({
                showId: showId
            });
            if(showId === that.state.projectInfoAreaList.length){
                showId = 0
            }
        }, 3000);


    }

    componentWillUnmount() {

    }

    handleLoad = () => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/info/project/info/website/v1/find/contract/price',
            data: {},
            success: (data) => {
                data.projectInfoTypeList.map((item, index) => {
                    var param = this.numberFormat(item.projectInfoContractPrice);
                    item.projectInfoContractPrice = param.value;
                    item.unit = param.unit;
                    return item
                });
                data.projectInfoAreaList.map((item, index) => {
                    var param = this.numberFormat(item.projectInfoContractPrice);
                    item.projectInfoContractPrice = param.value;
                    item.unit = param.unit;
                    item.top = Math.ceil(Math.random() * 10 * 4);
                    item.left = Math.ceil(Math.random() * 10 * 4);
                    return item
                });
                this.setState({
                    totalPrice: data.totalProjectInfoContractPrice,
                    projectInfoTypeList: data.projectInfoTypeList,
                    projectInfoAreaList: data.projectInfoAreaList
                });

                this.numberFormat(data.totalProjectInfoContractPrice);

            },
            complete: () => {
                this.setState({
                    isLoading: false,
                });
            }
        });
    };

    formattingMoney = (money) => {
        if (isNaN(parseFloat(money))) {
            //另千分符金额框为空
            return false
        } else {//是数字，将数字保留两位小数赋给真实金额框
            let totalPrice = money;//转换为数字类型
            totalPrice = totalPrice.toFixed(0);//保留两位小数
            totalPrice = totalPrice.replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1<span class='icon-d' >,</span>");//使用正则替换，每隔三个数加一','
            return totalPrice
        }
    };
    numberFormat = (value) => {
        var param = {};
        var k = 10000,
            sizes = ['元', '万元', '亿元', '万亿元'],
            i;
        if (value < k) {
            param.value = value
            param.unit = ''
        } else {
            i = Math.floor(Math.log(value) / Math.log(k));

            param.value = ((value / Math.pow(k, i))).toFixed(2);
            param.unit = sizes[i];
        }

        this.setState({
            totalNum: param
        });
        return param;

    };

    render() {
        const domFun = (value) => {
            let gmvDom = "";
            if (value){
                let gmv = [];
                gmv = this.formattingMoney(value).split("");
                gmv.forEach(function (item,index) {
                    if (item.match('^[0-9]*$')){
                        gmvDom += '<span class="gmv-num">' + item + '</span>';
                    }
                    else{
                        gmvDom += item;
                    }
                });
            }
            return gmvDom;
        };
        return (
            <div className="jxt">
                <Header nav="jxt"></Header>
                <div className="jxt-content">
                    <img src={require('../../assets/image/jxt-bg.png')} className="content-bg" alt=""/>
                    <div className="jxt-content-wrap">
                        <div className="content-title">
                            <img className="" src={require('../../assets/image/jxt-title.png')} alt=""/>
                            <div className="content-title-desc">中采云平台期下的建信通小程序，以大型央企工程项目集采为背景，为您提供招投标信息、项目概况、采购清单、劳务分包、设备租赁等信息。手机在手，随时随地，掌握中采工程项目商机。</div>
                        </div>
                        <div className="content-cumulative">
                            <div className="content-cumulative-label">项目累计采购金额 ( 元 )</div>
                            <div className="content-cumulative-total">
                                <CountUp className="gmv-show-gmv" start={this.state.startNum} end={this.state.totalPrice} duration={this.state.duration} formattingFn={domFun}/>
                            </div>
                            <div className="content-cumulative-statistics">约 {this.state.totalNum.value + this.state.totalNum.unit}</div>
                            <img className="content-cumulative-icon" src={require('../../assets/image/right-top.png')} alt=""/>
                        </div>
                        <div className="content-map-warp">
                            <img src={require('../../assets/image/map.png')} className="content-map" alt=""/>
                            {
                                this.state.projectInfoAreaList.map((item, index) => (
                                    this.state.showId === index ? <div className="project-item-warp" style={{top: 260 - item.top, left: 420 - item.left}} key={index}>
                                        <img className="project-item" src={require('../../assets/image/project-item.png')} alt=""/>
                                        <div className="project-item-content">
                                            <div className="project-item-content-title">{item.projectInfoAddressCity}累计采购金额</div>
                                            <div className="project-item-content-total"><span className="project-item-content-value">{item.projectInfoContractPrice}</span> {item.unit}</div>
                                        </div>
                                    </div> : ''
                                ))
                            }

                        </div>
                        <img src={require('../../assets/image/phone.png')} className="content-phone" alt=""/>
                        <div className="jxt-info">
                            <div className="info-content">
                                {
                                    this.state.projectInfoTypeList.map((item, index) => (
                                        index  < 6 ?  <div className="info-content-item" key={index}>
                                            <div className="info-content-item-title">{item.projectInfoType}</div>
                                            <div className="info-content-item-text">
                                                总投资额 <span className="info-content-item-value">{item.projectInfoContractPrice}</span> {item.unit}
                                            </div>
                                        </div> : ''
                                    ))
                                }
                            </div>
                            <div className="info-code">
                                <img className="info-code-img" src={require('../../assets/image/jxt-code.png')} alt=""/>
                                <div className="info-code-text margin-top-10">微信扫一扫</div>
                                <div className="info-code-text">打开建信通</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
