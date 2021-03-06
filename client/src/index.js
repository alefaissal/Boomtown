import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import client from './apollo';
import ItemPreviewProvider from './context/ItemPreviewProvider';
import ViewerProvider from './context/ViewerProvider';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme';
import AppRoutes from './routes';
import './index.css';

const App = () => {
	return (
		<ApolloProvider client={client}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<ViewerProvider>
					<ItemPreviewProvider>
						<BrowserRouter>
							<AppRoutes />
						</BrowserRouter>
					</ItemPreviewProvider>
				</ViewerProvider>
			</MuiThemeProvider>
		</ApolloProvider>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
