import React, { useState } from 'react';
import '../styles/dashboardPage.css';
import FeatureElements from '../components/FeatureElements';
import TextCarousal from '../components/TextCarousal';
import InfoCard from '../components/InfoCard';
import BuddiesCard from '../components/BuddiesCard';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Grid from '@material-ui/core/Grid';

const DashboardPage = () => {

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    const infoCardMessage = [{
        type: "Person",
        header: "Individuals",
        message: "Store, share, and access materials from any " +
            "mobile device, tablet, or computer."
    },
    {
        type: "Group",
        header: "Teams",
        message: "Collaborate with your buddies and use our" +
            " platform that makes it easy for you to share, store, and access materials."
    },
    {
        type: "Institute",
        header: "Institutions",
        message: "Ensure safety of your institute's owned materials and share them among your members."
    },
    {
        type: "Public",
        header: "Public",
        message: "Enjoy a seamless experience of publicly available materials anywhere on any device."
    }];

    return (
        <React.Fragment>
            <div className={innerWidth >= 500 ? "dashboard-main" : "dashboard-main__mobile"}>
                <div class="upper-container">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <TextCarousal />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span style={{ fontSize: '2.5em' }}>
                                One Stop hassle free solution to maintain course related study materials and access from any device.
                            </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img className="image_dashboard"
                                alt="photo"
                                src={require('../../shared/photos/Logo4.png')}
                            />
                        </Grid>
                        {innerWidth >= 500 &&
                            <React.Fragment>
                                <Grid item xs={12} sm={6}>
                                    <img className="image_other"
                                        alt="photo"
                                        src={require('../../shared/photos/others1.png')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div style={{ paddingTop: '10%' }}>
                                        <span style={{ fontSize: '2em' }}>
                                            Store, share, and collaborate on study materials from any mobile device, tablet, or computer
                                    </span>
                                    </div>
                                </Grid>
                            </React.Fragment>
                        }
                        {innerWidth < 500 &&
                            <React.Fragment>
                                <Grid item xs={12} sm={6}>
                                    <span style={{ fontSize: '2em' }}>
                                        Store, share, and collaborate on study materials from any mobile device, tablet, or computer
                                    </span>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div style={{ paddingTop: '10%' }}>
                                        <img className="image_other"
                                            alt="photo"
                                            src={require('../../shared/photos/others1.png')}
                                        />
                                    </div>
                                </Grid>
                            </React.Fragment>
                        }
                    </Grid>
                </div>

                <div id="infoContainer" className="info-container">
                    <div className="key_features-text">
                        Get Started
                    </div>
                    <Grid container spacing={4}>
                        <Grid sm={3} xs={12}>
                            <InfoCard info={infoCardMessage[0]}></InfoCard>
                        </Grid>
                        <Grid sm={3} xs={12}>
                            <InfoCard info={infoCardMessage[1]}></InfoCard>
                        </Grid>
                        <Grid sm={3} xs={12}>
                            <InfoCard info={infoCardMessage[2]}></InfoCard>
                        </Grid>
                        <Grid sm={3} xs={12}>
                            <InfoCard info={infoCardMessage[3]}></InfoCard>
                        </Grid>
                    </Grid>
                </div>

                <div id="buddiesContainer" className="buddies-container">
                    <div className="key_features-text">
                        Buddies
                    </div>
                    <Grid className="buddies-grid" container spacing={4}>
                        <Grid sm={6} xs={12}>
                            <BuddiesCard info={{ name: "Badsha Mandal", image: require("../../shared/photos/badsha_dp.jpg") }} />
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <BuddiesCard info={{ name: "Sayantan Kundu", image: require("../../shared/photos/sayantan_dp.jpeg") }} />
                        </Grid>
                    </Grid>
                </div>

                <div id="contactContainer" className="contact-us-container">
                    <div className="key_features-text">
                        Contact Us
                    </div>
                    <div className="contact-us-card">
                        <ContactForm />
                    </div>
                </div>

                <FeatureElements />

                <Footer></Footer>
            </div>

        </React.Fragment >
    )
}


export default DashboardPage