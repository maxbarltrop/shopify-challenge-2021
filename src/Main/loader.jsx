import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = () => {
  const useStyles = makeStyles({
    loader: {
      color: "white",
    },
  });
  const classes = useStyles();
  return <CircularProgress className={classes.loader} size="60px" />;
};

export default Loader;
