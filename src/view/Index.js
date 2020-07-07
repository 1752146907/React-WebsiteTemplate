import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Header from '../component/Header';
import Footer from '../component/Footer';

// import http from '../common/http';
import util from '../common/util';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: 'none'
        }
    }

    componentDidMount() {
        util.setTitle('首页');

        util.scrollToTop(0);

        if (util.isPc()) {
            // window.advertisement = new window.AdMove("advertisement");
            // window.advertisement.Run();
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        if (util.isPc()) {
            // window.advertisement.Stop();
        }
    }

    handleCloseAdvertisement() {
        this.setState({
            display: 'none'
        });
    }
    handleClickSearch () {
        this.props.history.push({
            pathname: '/search/' + 1212,
            query: {}
        });
    }

    render() {
        return (
            <div className="index">
                <Header history={this.props.history} website_menu_id="home"/>

                <div className="margin-top-20 margin-bottom-20">
                    {
                        util.isPc() ?
                            '我是电脑'
                            :
                            '我是手机'
                    }
                </div>
                <Link to="/search/2222">跳转到搜索</Link>

                <Footer menu={[{
                    website_menu_id: 1,
                    website_menu_url: '/index',
                    page_id: 1,
                    website_menu_name: '不能握的手'
                }]} />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        index: state.index,
        advertisement: state.advertisement
    }
})(Index);
