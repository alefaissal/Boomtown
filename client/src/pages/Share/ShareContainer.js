import React, { Component } from 'react';
import Share from './Share';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';
import Loading from '../../components/Loading';

class ShareContainer extends Component {
	render () {
		return (
			<Query query={ALL_TAGS_QUERY}>
				{({ loading, error, data }) => {
					if (loading) return <Loading />;
					if (error) return `Error: ${error}`;
					if (data) {
						return <Share tags={data.tags} />;
					}
				}}
			</Query>
		);
	}
}

export default ShareContainer;
