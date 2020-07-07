import React, {Component} from 'react';

import http from '../common/http';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        console.log(this.props.website_menu_id);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/desktop/xietong/website/init',
            data: {
            },
            success: (data) => {
            },
            error: function (data) {
            }.bind(this),
            complete: function () {
            }
        });
    }


    render() {
        return (
            <div className="header">
                {
                    this.props.website_menu_id ?
                        '欢迎光临'
                        :
                        'Welcome'
                }
            </div>
        );
    }
}

Header.propTypes = {
    history: React.PropTypes.object.isRequired,
    website_menu_id: React.PropTypes.string.isRequired
};

Header.defaultProps = {
    website_menu_id: '',
    keyword: ''
};


export default Header;