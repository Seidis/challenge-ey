import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import AppRouter from './routes';
import * as dotenv from 'dotenv';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

dotenv.config();

root.render(
	<React.StrictMode>
		<AppRouter />
	</React.StrictMode>
);