const styles = theme => ({
  card: {
    width: "28.5vw",
    height: "65vh",
    display: "flex",
    justifyContent: "space-between",
    flexFlow: "column wrap"
  },
  media: {
    maxWidth: "100%",
    height: 300,
    backgroundSize: "cover",
    backgroundPosition: "top"
  },
  itemowner: {
    height: "10vh"
  },
  itemownerDetails: {
    display: "flex",
    justifyContent: "space-between"
  },
  itemownerAvatar: {
    height: 60,
    width: 60
  },
  itemownerAvatarImg: {
    height: 60,
    width: 60,
    borderRadius: 50
  },
  iteownerFullName: {
    width: "85%",
    textAlign: "left",
    paddingTop: 10,
    paddingBottom: 10,
    color: "black"
  },
  datePosted: {
    color: "grey"
  },
  itemsDetails: {},
  itemDescription: {
    color: "black"
  },
  button: {
    marginLeft: 10,
    marginBottom: 10
  }
});

export default styles;
