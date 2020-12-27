import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Lobby from './pages/Lobby';
import Game from './pages/Game';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Lobby />
            </Route>
            <Route exact path="/game/:id">
                <Game />
            </Route>
        </Switch>
    </BrowserRouter>
)

export default Router;