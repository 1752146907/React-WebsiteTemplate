import React, {Component} from 'react';
// import {connect} from 'dva';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import About from "../../component/about/About";

import '../../assets/css/about.css';
import http from "../../util/http";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            article: '',
            clientHeight: document.body.clientHeight,
            minHeight: {minHeight: document.body.clientHeight - 66 - 120 - 130 - 48 + 'px'}
        }
    }

    componentDidMount() {
        document.title = "中采云-关于我们";

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad = () => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/article/website/v1/find',
            data: {
                articleId: '1229939735049408512'
            },
            success: (data) => {
                this.setState({
                    article: data
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
        return (
            <div className="about">
                <Header nav="about"></Header>
                <div className="about-top">
                    <div className="about-top-banner"></div>
                    {/*<img className="about-top-img" src={require('../../assets/image/about-top.png')} alt=""/>*/}
                </div>
                <div className="about-warp">
                    <About nav="introduction"></About>
                    <div className="about-content" style={this.state.minHeight}>
                        <div className="about-content-header">
                            公司简介
                        </div>
                        <div className="about-introduction">
                            <div className="about-content-html" dangerouslySetInnerHTML={{__html: this.state.article.articleContent}}></div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
