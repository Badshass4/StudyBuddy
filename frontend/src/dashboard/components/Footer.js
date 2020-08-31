import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import Divider from '@material-ui/core/Divider';
import '../styles/footer.css';

const Footer = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    return (
        <div className={innerWidth >= 500 ? "footer-main" : "footer-main-mobile"}>
            <Grid container>
                <Grid item sm={3} xs={6}>
                    <h3>Top Subjects</h3>
                    <ul>
                        <li>C</li>
                        <li>DBMS</li>
                        <li>Data Structure</li>
                        <li>Algorithm</li>
                    </ul>
                </Grid>
                <Grid item sm={3} xs={6}>
                    <h3>Top Courses</h3>
                    <ul>
                        <li>B.Tech</li>
                        <li>BCA</li>
                        <li>M.Tech</li>
                        <li>MBBS</li>
                    </ul>
                </Grid>
                <Grid item sm={3} xs={6}>
                    <h3>Support</h3>
                    <ul>
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                </Grid>
                <Grid item sm={3} xs={6}>
                    <h3>Community</h3>
                    <ul>
                        <li>Github</li>
                        <li>StackOverflow</li>
                        <li>Twitter</li>
                        <li>YouTube</li>
                    </ul>
                </Grid>
            </Grid>
            <Divider />
            <div className="icon-bar">
                <FacebookIcon className="icons" />
                <LinkedInIcon className="icons" />
                <TwitterIcon className="icons" />
                <PinterestIcon className="icons" />
            </div>
        </div>
    )
}

export default Footer
