import { Query } from 'react-apollo';
import React, { Fragment } from 'react';
import { VIEWER_QUERY } from '../apollo/queries';
import Loading from '../components/Loading';

const ViewerContext = React.createContext();

const ViewerProvider = ({ children }) => {
	return (
		<Query query={VIEWER_QUERY}>
			{({ loading, error, data }) => {
				if (loading) return <Loading />;
				if (error) return `Error: ${error}`;

				const viewer = data && data.viewer ? data.viewer : null;
				return <ViewerContext.Provider value={{ viewer }}>{children}</ViewerContext.Provider>;
			}}
		</Query>
	);
};

export { ViewerContext };
export default ViewerProvider;
