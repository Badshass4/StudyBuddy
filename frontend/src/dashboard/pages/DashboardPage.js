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
                                One Stop hassle free solution to maintain course related study materials
                            </span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img className="image"
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
                        Key Features
                    </div>
                    <Grid container spacing={4}>
                        <Grid sm={4} xs={12}>
                            <InfoCard></InfoCard>
                        </Grid>
                        <Grid sm={4} xs={12}>
                            <InfoCard></InfoCard>
                        </Grid>
                        <Grid sm={4} xs={12}>
                            <InfoCard></InfoCard>
                        </Grid>
                    </Grid>
                </div>

                <div id="buddiesContainer" className="buddies-container">
                    <div className="key_features-text">
                        Buddies
                    </div>
                    <Grid className="buddies-grid" container spacing={4}>
                        <Grid sm={6} xs={12}>
                            <BuddiesCard />
                        </Grid>
                        <Grid sm={6} xs={12}>
                            <BuddiesCard />
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