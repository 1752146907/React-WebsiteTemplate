import React, {Component} from 'react';
// import {connect} from 'dva';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

import '../../assets/css/zck.css';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        document.title = "中采云-筑材库";

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="zck">
                <Header nav="zck"></Header>
                <div className="zck-content">
                    <div className="zck-content-left">
                        <div className="zck-content-title">
                            <img className="zck-content-title-img" src={require('../../assets/image/zck-title.png')} alt=""/>
                            <div className="zck-content-title-desc">中采云平台期下的筑材库是中采云的大数据建材供应商库。把项目需求精准匹配到建材供应商，实时接收项目采购清单，云端报价。一手项目采购清单触手可及，您的工程项目好助手。</div>
                            <div className="zck-code">
                                <img className="zck-code-img" src={require('../../assets/image/zck-code.png')} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="jxt-content-right">
                        <img className="jxt-right-img" src={require('../../assets/image/zck-phone.png')} alt=""/>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
