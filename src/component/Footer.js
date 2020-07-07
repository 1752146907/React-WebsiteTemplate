import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="footer">
                <div className="container col-padding">
                    <div className="menu margin-top-20">
                        {
                            this.props.menu.map(function (website_menu) {
                                return (
                                    <li key={website_menu.website_menu_id}>
                                        <Link to={website_menu.website_menu_url === '' ? '/page/' + website_menu.page_id : website_menu.website_menu_url}>{website_menu.website_menu_name}</Link>
                                    </li>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Footer.propTypes = {

};

Footer.defaultProps = {

};

export default connect((state) => {
    return {
        website_menu: state.website_menu
    }
})(Footer);