import React from 'react';
import logo from '../assets/images/logo.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';


const About = () => {
  return (
    <>
      <Header />

      <div className="container-fluid col-xxl-8 px-4 py-5 mt-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5" style={{ boxShadow: ' 0 4px 8px rgba(0, 0, 0, 0.1)', transition: ' box-shadow 0.3s ease' }}>
          <div className="col-10 col-sm-8 col-lg-6">
            <img src={logo} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" style={{ width: "700", height: "535" }} loading="lazy" />
          </div>
          <div className="col-lg-6">
            <h3 className="display-5 fw-bold lh-1 mb-3"> <span style={{ color: 'rgba(234, 106, 8, 1)' }}>Bloom Events </span>,la clé pour vivre des moments inoubliables </h3>
            <p className="lead">Chez Bloom Events, nous croyons que chaque événement mérite d'être exceptionnel. Notre plateforme innovante vous permet de découvrir, organiser, et réserver vos billets pour les événements les plus excitants. Que vous soyez promoteur ou passionné d'événements, nous vous offrons une expérience fluide, sécurisée et intuitive, pour que chaque instant compte. Rejoignez nous pour transformer vos idées en réalité et vos événements en succès !</p>

          </div>
        </div>
      </div>
      <div className="container-fluid col-xxl-8 px-4 py-5 ">
        <h3 className="mb-4 text-center" style={{ fontSize: '32px' }}>Notre<span style={{ color: 'rgba(234, 106, 8, 1)' }}> Mission </span></h3>
        <div className="row align-items-center justify-content-between" >


          <div className=" col-md-6 col-lg-6">
            <img src={logo} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" style={{ width: "700", height: "535" }} loading="lazy" />
          </div>
          <div className="col-md-6 col-lg-6">

            <p className="" style={{ fontSize: '15px' }}><span style={{ color: 'rgba(234, 106, 8, 1)' }}>Bloom Events </span> est une solution de billetteries en  ligne développée par <span style={{ color: 'rgba(234, 106, 8, 1)' }}>Digital Future Lab </span> . <br /><br />

              Elle s’est attribuée pour mission de révolutionner la gestion d'événements en offrant une plateforme simple et accessible à tous. Elle permet aux promoteurs d’organiser, gérer et vendre des billets en ligne de manière fluide et sécurisée, tout en offrant aux utilisateurs une expérience intuitive et agréable pour découvrir et réserver des événements. <span style={{ color: 'rgba(234, 106, 8, 1)' }}>Bloom Events </span> vise à rendre chaque moment inoubliable en connectant les organisateurs à leur public avec des solutions modernes et efficaces.</p>

          </div>
        </div>
      </div>
      <div className='container-fluid' style={{ background: 'rgba(0, 0, 0, 1)' }}>

        <Footer />
      </div>
    </>
  );
};

export default About;
