import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import axios from 'axios';
import Banner from '../component/Banner';
import ConnectSection from '../component/Connect';
import QuoteContainer from '../component/quotecontainer';
import ProtectSection from '../component/ProtectSection';
import HomeGod from './HomeGod';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import { Link, useHistory } from 'react-router-dom';

const Home = () => {



    return (
        <>


            <Header />


            {/* <Banner /> */}


            <QuoteContainer />

            <ProtectSection />
            {/* Here home section putis there put if needed as that will rended the prouduct  */}
            <hr></hr>
            <HomeGod />
            <ConnectSection />
            <Footer />



        </>
    )
}

export default Home


