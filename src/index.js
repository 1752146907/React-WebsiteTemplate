import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Index from './App';
import Sign from './view/sign/index';
import AboutIndex from './view/about/index';
import AboutRecruit from './view/about/recruit';
import AboutContact from './view/about/contact';
import Jxt from './view/jxt/index';
import Zck from './view/zck/index';
import Investment from './view/investment/index';
import NewsIndex from './view/news/index';
import NewsDetail from './view/news/detail';
import Dynamic from './view/dynamic/index';
import DynamicDetail from './view/dynamic/detail';
import Media from './view/media/index';
import MediaDetail from './view/media/detail';
import RecruitDetail from './view/about/recruitdetail';
import InvestmentDetail from './view/investment/detail';
import * as serviceWorker from './serviceWorker';
import {Router as HashRouter , Route, Switch, Redirect } from "react-router-dom";
import {createHashHistory} from 'history'
const history = createHashHistory();


ReactDOM.render(
    <HashRouter history={history}>
        {/*<Router>*/}
            <Switch>
                <Route exact path="/" render={()=>(<Redirect to='/index'/>)}/>
                <Route path="/index" component={Index}/>
                <Route path="/about/index" component={AboutIndex} />
                <Route path="/about/recruit" component={AboutRecruit} />
                <Route path="/about/recruitdetail/:recruitmentId" component={RecruitDetail} />
                <Route path="/about/contact" component={AboutContact} />
                <Route path="/zck/index" component={Zck} />
                <Route path="/jxt/index" component={Jxt} />
                <Route path="/investment/index" component={Investment} />
                <Route path="/investment/detail/:articleId" component={InvestmentDetail} />
                <Route path="/news/index" component={NewsIndex} />
                <Route path="/news/detail/:articleId" component={NewsDetail} />
                <Route path="/dynamic/index" component={Dynamic} />
                <Route path="/dynamic/detail/:articleId" component={DynamicDetail} />
                <Route path="/media/index" component={Media} />
                <Route path="/media/detail/:articleId" component={MediaDetail} />
                <Route path="/sign/index" component={Sign} />
            </Switch>
        {/*</Router>*/}
    </HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
