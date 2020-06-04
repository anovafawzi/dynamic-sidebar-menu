import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import MainContainer from "./components/MainContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#373737",
    },
  })
);

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>
        <MainContainer />
      </header>
    </div>
  );
};

export default App;
