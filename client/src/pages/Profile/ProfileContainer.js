import React, { Component } from 'react';
import Profile from './Profile';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import Loading from '../../components/Loading';
import { ViewerContext } from '../../context/ViewerProvider';

class ProfileContainer extends Component {
	render () {
		return (
			<ViewerContext.Consumer>
				{({ viewer }) => {
					return (
						//TODO change to: id: viewer.id
						<Query query={ALL_USER_ITEMS_QUERY} variables={{ id: 2 }}>
							{({ loading, error, data }) => {
								if (loading) return <Loading />;
								if (error) return `Error: ${error}`;
								if (data) {
									return <Profile user={data.user} />;
								}
							}}
						</Query>
					);
				}}
			</ViewerContext.Consumer>
		);
	}
}

export default ProfileContainer;
