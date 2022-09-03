import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home"

const Admin = () => {
    return (
        <Router>
            <div className="App">
                wawu
                <div className="">
                    <Switch>
                        <Route path="/">
                            <div className="">wowwwwwwwwwwwwwww</div>
                            <Home />
                        </Route>
                    
                    </Switch>
                </div>
            
            </div>
        </Router>
     );
}
 
export default Admin;