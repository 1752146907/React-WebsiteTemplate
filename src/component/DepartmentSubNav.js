import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

class DepartmentSubNav extends Component {
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
            <div>
                <div className="department margin-top col-xs-4 col-md-12 col-no-padding">
                    <div className="department">
                        <Link to="/primary/index">
                            <img src="/image/department0.jpg" alt=""/>
                            <div className="department-mask">小学部</div>
                        </Link>
                    </div>
                </div>
                <div className="department margin-top col-xs-4 col-md-12 col-no-padding">
                    <div className="department">
                    <Link to="/junior/index">
                        <img src="/image/department1.jpg" alt=""/>
                        <div className="department-mask">中学部</div>
                    </Link>
                </div>
                </div>
                {/*<div className="department margin-top col-xs-4 col-md-12 col-no-padding">*/}
                    {/*<div className="department">*/}
                        {/*<img src="/image/department2.jpg" alt=""/>*/}
                        {/*<div className="department-mask">国际部</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

DepartmentSubNav.propTypes = {

};

DepartmentSubNav.defaultProps = {

};

export default connect((state) => {
    return {

    }
})(DepartmentSubNav);