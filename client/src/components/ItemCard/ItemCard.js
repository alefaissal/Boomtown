import styles from "./styles";
import React from "react";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Gravatar from "react-gravatar";
import { Box } from "@material-ui/core";
import PropTypes from "prop-types";

const ItemCard = ({ classes, item }) => {
  const date = new Date().toDateString();
  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={`/profile/${item.itemowner.id}`}>
        <CardMedia
          className={classes.media}
          image={item.imageurl}
          title="Item image"
        />
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.itemowner}
            variant="body2"
            color="textSecondary"
            component="div"
          >
            <Box component="span" className={classes.itemownerDetails}>
              <div className={classes.itemownerAvatar}>
                <Gravatar
                  className={classes.itemownerAvatarImg}
                  email={item.itemowner.email}
                />
              </div>

              <div className={classes.iteownerFullName}>
                <div>{item.itemowner.fullname}</div>
                <div className={classes.datePosted}>{date}</div>
              </div>
            </Box>
          </Typography>
          <div className={classes.itemsDetails}>
            <Typography gutterBottom variant="h5" component="h2">
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.tags.map((tag, key) =>
                key !== item.tags.length - 1 ? tag.title + ", " : tag.title
              )}
            </Typography>

            <Typography
              className={classes.itemDescription}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {item.description}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="outlined" className={classes.button}>
          BORROW
        </Button>
      </CardActions>
    </Card>
  );
};

ItemCard.propTypes = {
  itemInfo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageurl: PropTypes.string,
    tags: PropTypes.array,
    itemowner: PropTypes.object,
    borrower: PropTypes.object,
    created: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }),

  viewer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    userimageurl: PropTypes.string,
    bio: PropTypes.string
  })
};

ItemCard.defaultProps = {
  item: {
    imageurl:
      "https://pixelsoftek.in/wp-content/uploads/2018/09/demo-image.jpg",
    itemowner: {
      fullname: "Name here",
      email: "test@test.com"
    },
    date: "date here",
    title: "Item Title",
    tags: [
      { id: 0, title: "Tags here" },
      { id: 1, title: "Tags here" },
      { id: 2, title: "Tags here" },
      { id: 3, title: "Tags here" }
    ],
    description: "Description goes here"
  }
};

export default withStyles(styles)(ItemCard);
