import React, { useEffect } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MoreIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import '../../shared/styles/font.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        display: 'flex'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '300px',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawer: {
        // width: 240,
        flexShrink: 0
    },
    drawerPaper: {
        width: 240,
        marginTop: theme.spacing(8),
        background: '#663d00',
        boxShadow: '2px -5px 8px #4d4d33'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: '#331f00'
    }
}));

const Header = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [courses, setCourses] = React.useState([]);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {
        axios.get('http://localhost:5000/user/courses')
            .then(response => {
                setCourses(response.data.result);
            })
            .catch(err => {
                console.log(err.response.data.message);
            });
    }, [])

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleSearchClick = (event) => {
        if (event.keyCode === 13) {
            props.history.push("/user/studymaterials/" + event.target.value);
        }
    };

    const handleAddNoteClick = () => {
        props.history.push("/admin/addnote");
    };

    const handlerOpenDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleCourseClick = (course) => {
        console.log(course);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color="inherit" onClick={handleAddNoteClick}>
                    <NoteAddIcon />
                </IconButton>
                <p>Add Notes</p>
            </MenuItem>
            {/* <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem> */}
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handlerOpenDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton color="inherit" >
                        <MenuBookIcon style={{ paddingRight: '8px' }} />
                        <Typography className="font" variant="h6" noWrap>
                            Study Buddy
                    </Typography>
                    </IconButton>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search Subject…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyUp={handleSearchClick}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Tooltip title="Add Notes">
                            <IconButton color="inherit" onClick={handleAddNoteClick}>
                                <NoteAddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Need any Support ?">
                            <IconButton color="inherit">
                                <ContactSupportIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="About Us !">
                            <IconButton color="inherit">
                                <SupervisorAccountIcon />
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Divider />
                <List>
                    {courses.map((course, index) => (
                        <React.Fragment key={course._id}>
                            <ListItem onClick={() => handleCourseClick(course)} button >
                                <ListItemIcon>
                                    <LocalLibraryIcon style={{ fill: "white" }} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography className="font">
                                        {course.name}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
            {renderMobileMenu}
            {renderMenu}
        </div>
    )
}

export default Header

