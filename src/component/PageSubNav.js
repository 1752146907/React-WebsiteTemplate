import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

class PageSubNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page_id: ''
        }
    }

    componentDidMount() {
        this.setState({
            page_id: this.props.page_id
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.page_id !== nextProps.page_id) {
            this.setState({
                page_id: nextProps.page_id
            });
        }
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                {
                    this.props.website_menu.list.map(function (website_menu) {
                        return (
                            website_menu.children.map(function (children_website_menu, index) {
                                return (
                                    children_website_menu.website_menu_parent_id === this.props.website_menu_id ?
                                        children_website_menu.website_menu_url.startsWith('http')?
                                            <a href={children_website_menu.website_menu_url} target="_blank">
                                                <div className={"subnav-item" + (children_website_menu.page_id === this.state.page_id ? " active" : "") + (index === 0 ? "" : " margin-top")}>
                                                    <div className="subnav-item-menu">{children_website_menu.website_menu_name}</div>
                                                    {
                                                        children_website_menu.page_id === this.state.page_id ?
                                                            <img className="subnav-item-arrow" src="../image/right-active.png" alt=""/>
                                                            :
                                                            <img className="subnav-item-arrow" src="../image/right.png" alt=""/>
                                                    }
                                                </div>
                                            </a>
                                            :

                                        <Link key={children_website_menu.website_menu_id} to={children_website_menu.website_menu_url === '' ? '/page/' + children_website_menu.page_id : children_website_menu.website_menu_url}>
                                            <div className={"subnav-item" + (children_website_menu.page_id === this.state.page_id ? " active" : "") + (index === 0 ? "" : " margin-top")}>
                                                <div className="subnav-item-menu">{children_website_menu.website_menu_name}</div>
                                                {
                                                    children_website_menu.page_id === this.state.page_id ?
                                                        <img className="subnav-item-arrow" src="../image/right-active.png" alt=""/>
                                                        :
                                                        <img className="subnav-item-arrow" src="../image/right.png" alt=""/>
                                                }
                                            </div>
                                        </Link>
                                        :
                                        ""
                                )
                            }.bind(this))
                        )
                    }.bind(this))
                }
            </div>
        );
    }
}

PageSubNav.propTypes = {
    website_menu_id: React.PropTypes.string.isRequired,
    page_id: React.PropTypes.string.isRequired
};

PageSubNav.defaultProps = {

};

export default connect((state) => {
    return {
        website_menu: state.website_menu
    }
})(PageSubNav);