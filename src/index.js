import ReactDOM from 'react-dom';
import Header from './componets/common/header';
import List from './componets/list';
import Register from './componets/form';
import Detail from './componets/detail';
import notFound from './componets/notFound'

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './index.css';

const App = () => { 
    return (
        <div>
            <BrowserRouter>
            <Header />
                <Switch>
                <Route exact path="/" exact  component={List} />
                <Route path="/register" component={Register}/>
                <Route exact path="/currency/:id" component={Detail} />
                <Route component={notFound}/>
                </Switch>
            </BrowserRouter> 
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root') )


