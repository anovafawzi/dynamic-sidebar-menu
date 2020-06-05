import React from "react";
import produce from "immer"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Drawer,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import SettingList from "./SettingList";
import { setSidebarItems } from "../actions/sidebar";

import avaHolder from "../assets/img/avana-holder.png";

const drawerWidth = 255;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      display: "block",
      margin: "0 auto",
      width: 162,
      marginTop: 35,
    },
    avatarText: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
      marginBottom: 35,
    },
    root: {
      display: "flex",
      backgroundColor: "#373737",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#1D1D1D",
      color: "rgba(255,255,255,0.9)",
    },
    contentTitle: {
      color: "white",
      fontWeight: "bold",
      marginBottom: 20,
    },
    content: {
      flexGrow: 1,
      backgroundColor: "#373737",
      padding: theme.spacing(3),
      height: "100%",
    },
    settingList: {
      maxWidth: 560,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    settingText: {
      marginLeft: 15,
    },
  })
);

const MainContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sidemenuconfig = useSelector((state) => state.sidebar.sidebarItems);

  const updateSidebarItems = (parentItemId, itemId, itemToUpdate) => {
    if (parentItemId === itemId) {
      // if top level
      const copySidebarItems = produce(sidemenuconfig, draftState => {
        const findIndex = draftState.findIndex(x => x.id === itemId);
        if (findIndex !== -1) {
          draftState[findIndex] = { ...draftState[findIndex], ...itemToUpdate };
        }
      });
      // update redux state
      dispatch(setSidebarItems(copySidebarItems));
    } else {
      // if child level
      console.log(itemToUpdate);
      const copySidebarItems = produce(sidemenuconfig, draftState => {
        draftState.forEach(function iter(a) {
          if(a.id === itemId) {
            if (itemToUpdate.hasOwnProperty("isShowed")) {
              a.isShowed = itemToUpdate.isShowed;
            }
            if (itemToUpdate.hasOwnProperty("isAllowed")) {
              a.isAllowed = itemToUpdate.isAllowed;
            }
          }
          Array.isArray(a.childs) && a.childs.forEach(iter);
        });
      });
      // update redux state
      dispatch(setSidebarItems(copySidebarItems));
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <img src={avaHolder} className={classes.avatar} alt="avatar" />
        <div className={classes.avatarText}>Anova Fawzi</div>
        <Sidebar
          items={sidemenuconfig}
          onClick={(item) => console.log(JSON.stringify(item, null, 2))}
        />
      </Drawer>
      <main className={classes.content}>
        <Typography variant="h4" noWrap className={classes.contentTitle}>
          Side menu settings
        </Typography>
        
        <SettingList
          items={sidemenuconfig}
          onClick={(parentItemId, itemId, item) => updateSidebarItems(parentItemId, itemId, item)}
        />
      </main>
    </div>
  );
};

export default MainContainer;
