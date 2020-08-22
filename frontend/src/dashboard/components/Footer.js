import React from 'react';
import Grid from '@material-ui/core/Grid';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import Divider from '@material-ui/core/Divider';
import '../styles/footer.css';

const Footer = () => {
    return (
        <div className="footer-main">
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
                    <h3>Top Subjects</h3>
                    <ul>
                        <li>C</li>
                        <li>DBMS</li>
                        <li>Data Structure</li>
                        <li>Algorithm</li>
                    </ul>
                </Grid>
                <Grid item sm={3} xs={6}>
                    <h3>Top Subjects</h3>
                    <ul>
                        <li>C</li>
                        <li>DBMS</li>
                        <li>Data Structure</li>
                    </ul>
                </Grid>
                <Grid item sm={3} xs={6}>
                    <h3>Top Subjects</h3>
                    <ul>
                        <li>C</li>
                        <li>DBMS</li>
                        <li>Data Structure</li>
                        <li>Algorithm</li>
                        <li>Data Structure</li>
                        <li>Algorithm</li>
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
