import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemsGrid from '../../components/ItemsGrid';
import Gravatar from 'react-gravatar';

const Profile = ({ classes, user }) => {
	return (
		<div className={classes.profileContainer}>
			<div className={classes.marginTop} />
			<div className={classes.useBox}>
				<div className={classes.userNameContainer}>
					<Gravatar className={classes.userImage} email={user.email} />
					<p className={classes.userFullname}>{user.fullname}</p>
				</div>
				<div className={classes.itemsStatus}>
					<p className={classes.itemsShared}>{user.items ? user.items.length : 0} Items Shared</p>
					<p className={classes.itemsBorrowed}>{user.borrowed ? user.borrowed.length : 0} Items Borrowed</p>
				</div>
				<div className={classes.userBio}>{user.bio}</div>
			</div>
			<div className={classes.itemsBox}>
				<div className={classes.sharedContainer}>
					<h1 className={classes.sharedItemsTitle}>Shared Items</h1>
					<div className={classes.itemsGridContainer}>
						<ItemsGrid items={user.items} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default withStyles(styles)(Profile);
