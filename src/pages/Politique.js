import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Politique = () => {
    return (
        <>
            <Header />

            <div className="container  mt-5 mb-5">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h1 className="">Politique de Confidentialité</h1>
                        <h4 className="mt-5">Introduction</h4>
                        <p style={{ fontSize: '16px' }}>


                            Chez <span style={{ color: 'rgba(234, 106, 8, 1)' }}>Bloom Events </span>, la protection de vos informations personnelles est une priorité. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données lorsque vous utilisez notre plateforme. <br /><br />

                            <h4 className="">1. Informations Collectées</h4>


                            Nous recueillons les informations que vous nous fournissez directement, telles que votre nom, votre adresse e-mail, votre numéro de téléphone, et les informations relatives aux événements que vous créez ou auxquels vous assistez. Nous pouvons également collecter des données liées à votre navigation sur la plateforme (adresses IP, préférences d’utilisation, etc.).<br /><br />

                            <h4 className=""> 2. Utilisation des Données</h4>

                            Vos informations sont utilisées pour :
                            <ul className="">
                                <li className=""> Gérer votre compte et vous fournir un accès à la plateforme</li>
                                <li className=""> Faciliter l’achat de billets et la gestion d’événements</li>
                                <li className=""> Vous envoyer des notifications importantes liées à vos activités sur la plateforme</li>
                                <li className=""> Améliorer notre service à travers l’analyse des données d’utilisation</li>
                            </ul>
                            
                            
                            
                            
                            <h4 className=""> 3. Partage des Données</h4>
                            

                            Nous ne partageons pas vos données personnelles avec des tiers, sauf dans les cas suivants :

                            <ul className="">
                                <li className="">  Si cela est nécessaire pour le bon fonctionnement de la plateforme (paiements, notifications, etc.)</li>
                                <li className=""> Si cela est requis par la loi ou pour protéger les droits de Bloom Events</li>
                            </ul>
                           
                            
                            <h4 className=""> 4. Sécurité des Données</h4>
                            

                            Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. <br /><br />

                            <h4 className="">  5. Vos Droits</h4>
                           

                            Vous avez le droit d’accéder à vos données personnelles, de les corriger ou de demander leur suppression. Pour exercer ces droits, contactez nous à l’adresse support@bloomevents.com. <br /><br />

                            <h4 className="">   6. Modifications de la Politique de Confidentialité</h4>
                           

                            Nous nous réservons le droit de modifier cette politique à tout moment. En cas de changement important, nous vous en informerons par e-mail ou via une notification sur la plateforme.</p>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>

            <div className="container-fluid" style={{ background: 'rgba(0, 0, 0, 1)' }}>
                <Footer />
            </div>
        </>
    );
};

export default Politique;
