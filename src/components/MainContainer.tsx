import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { CssBaseline, AppBar, Drawer, Typography } from "@material-ui/core";
import Sidebar from "./Sidebar";

import avaHolder from "../assets/img/avana-holder.png";
import sidemenuconfig from "../configs/sidemenu.json";

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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    contentTitle: {
      color: "white",
      fontWeight: "bold",
    },
    content: {
      flexGrow: 1,
      backgroundColor: "#373737",
      padding: theme.spacing(3),
      height: "100%",
    },
  })
);

const MainContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        {/* <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar> */}
      </AppBar>
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
          onClick={(item) => alert(JSON.stringify(item, null, 2))}
        />
      </Drawer>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        <Typography variant="h6" noWrap className={classes.contentTitle}>
          Side menu settings
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        <pre>{JSON.stringify(sidemenuconfig, null, 2)}</pre>
      </main>
    </div>
  );
};

export default MainContainer;
