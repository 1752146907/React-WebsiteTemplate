import React, {Component} from 'react';
// import {connect} from 'dva';
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import News from "../../component/news/News";
import {createHashHistory} from 'history'

import '../../assets/css/news.css';
import http from "../../util/http";
import constant from "../../util/application";

const history = createHashHistory();

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            article: '',
            clientHeight: document.body.clientHeight,
            minHeight: {minHeight: document.body.clientHeight - 66 - 120 - 130 - 48 + 'px'},
            showLink: '',
            replayGroup: '',
            replayGroupId: '',
            nodeDetail: '<iframe src="//player.bilibili.com/player.html?aid=82331929&bvid=BV14J411V7Sw&cid=140868451&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
            replayGroupList: [],
        }
    }

    componentDidMount() {
        document.title = "中采云-媒体报道";

        this.setState({
            replayGroupId: this.props.match.params.articleId
        });
        this.handleLoad(this.props.match.params.articleId);
    }

    componentWillUnmount() {

    }

    handleLoad = (replayGroupId) => {
        this.setState({
            isLoading: true,
        });
        http.request({
            url: '/cloud/replay/group/website/v1/find',
            data: {
                replayGroupId: replayGroupId
            },
            success: (data) => {
                this.setState({
                    replayGroup: data,
                    replayGroupList: data.replayGroupList,
                    nodeDetail: data.replayGroupList ? data.replayGroupList[0].replayGroupVideoLink : '',
                    showLink: data.replayGroupList ? data.replayGroupList[0].replayGroupVideoLink : '',
                });
            },
            complete: () => {
                this.setState({
                    isLoading: false,
                });
            }
        });
    };

    handleChangePlayer = (link) => {
        this.setState({
            showLink: link,
            nodeDetail: link,
            // showUrl: url
        })
    };

    handleBack = () => {
        history.goBack();
    };

    render() {
        return (
            <div className="news">
                <Header nav="news"></Header>
                <div className="about-top">
                    <div className="media-top"></div>
                    {/*<img className="about-top-img" src={require('../../assets/image/news-title.png')} alt=""/>*/}
                </div>
                <div className="news-warp">
                    <News nav="media"></News>
                    <div className="news-content" style={this.state.minHeight}>
                        <div className="news-detail-header">
                            <div className="news-detail-title">
                                <div className="news-detail-title-text">{this.state.replayGroup.replayGroupTitle}</div>
                                <div className="news-detail-title-desc">{this.state.replayGroup.systemCreateTime ? this.state.replayGroup.systemCreateTime.substring(0,10) : ''}</div>
                            </div>
                            <div className="back-btn" onClick={this.handleBack}> 返回列表 </div>
                        </div>
                        <div className="live-content-html" dangerouslySetInnerHTML={{__html: this.state.nodeDetail}}></div>
                        <div className="live-desc">
                            {this.state.replayGroup.replayGroupDescription}
                        </div>
                        <div className="live-play-list">
                            {
                                this.state.replayGroupList ? this.state.replayGroupList.map((item, index) => (
                                    <div className="live-play-item" key={index} onClick={() => this.handleChangePlayer(item.replayGroupVideoLink)}>
                                        <div className="live-play-item-img-warp">
                                            <img className="live-play-item-img" src={constant.imagePreviewHost + item.replayGroupVideoImage} alt=""/>
                                            <div className="live-item-img-info">
                                                <div className="live-play">
                                                    <img className="live-play-img" src={require('../../assets/image/play-icon.png')} alt=""/>
                                                    {/*<span>{item.num}</span>*/}
                                                </div>
                                                {/*<div className="live-play-duration">{item.duration}</div>*/}
                                            </div>
                                        </div>
                                        <div className={this.state.showLink === item.replayGroupVideoLink ? "live-play-item-content-active" : "live-play-item-content"}>
                                            <div className="live-play-item-title">{item.replayGroupVideoName}</div>
                                        </div>
                                    </div>
                                )) : ''
                            }

                        </div>
                        {/*<div className="about-content-html" dangerouslySetInnerHTML={{__html: this.state.article.articleContent}}></div>*/}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;
