import { Provider } from 'react-redux';
import GlobalStyle from '@styles/global';
import ReduxToastr from 'react-redux-toastr';

import store from '@store/';
import Routes from '@routes';

function App() {
  return (
    <Provider store={store}>
      <>
        <Routes />
        <ReduxToastr />
        <GlobalStyle />
      </>
    </Provider>
  );
}

export default App;
