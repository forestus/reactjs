import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Main from '@pages/Main';

import SignUp from '@pages/Auth/SignUp';
import SignIn from '@pages/Auth/SignIn';
import Private from './private';
import history from './history'; // torna a pagina privada
import Guest from './guest'; // caso logado não pode acessar /signin (voce não pode logar novamente)

export default function Routes() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Guest path="/signin" component={SignIn} />
        <Guest path="/signup" component={SignUp} />
        <Private path="/" exact component={Main} />
      </Switch>
    </ConnectedRouter>
  );
}
