import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import NavDrawer from './NavDrawer';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      left: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  toggleDrawer(side, open) {
    return () => {
      this.setState({
        [side]: open,
      });
    };
  }

  render() {

    let button;
    let drawerButton;

    
      drawerButton = (
        <IconButton color="inherit" onClick={this.toggleDrawer('left', true)}>
          <MenuIcon />
        </IconButton>
      );
    

    return (
      <div className="nav_root" style={{background: "black"}} >
        <AppBar position="static" className="" style={{background: "#348498", height: "100%", display: "flex", flexDirection: "row", justifyContent: "column"}}>
          <Toolbar>
            {drawerButton}
            <Typography variant="title" >
              {/* &nbsp;&nbsp;Block Dust */}
            </Typography>
            {button}
          </Toolbar>
        </AppBar>

        <NavDrawer open={this.state.left} onClose={this.toggleDrawer('left', false)}  />
      </div>
    );
  }
}



export default Nav;

