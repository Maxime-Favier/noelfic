import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Link from 'react-router-dom/Link'

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div><
                Jumbotron fluid>
                <Container>
                    <div className="mb-2">
                        <h1>Bienvenue sur Noelfic</h1>
                        <p>
                            Pour les grotteux Noelfic était le site qui recensait toutes les FIC de l'histoire de
                            jvc.<br/>
                            Ce magnifique site n'était plus depuis plusieurs années. Il y avait des perles, des FIC de
                            légende... Ce petit bout de l'histoire de la commu avait disparu avec lui.
                        </p>
                    </div>
                    <div>
                        <ButtonToolbar>
                            <Link to="/oldfic">
                                <Button varient="primary" size='lg'>Accéder aux anciennes Fic</Button>
                            </Link>
                        </ButtonToolbar>
                    </div>
                    <hr/>
                    <div className="mt-4">
                        <h3>Pourquoi noelfic</h3>
                        <p>
                            Disons-le clairement : JVC se meurt et la base de données est en danger.
                            L'ignoble <strong>CENSURE</strong> ainsi que le climat délétère n'incitent plus personne à
                            CREER quoi que ce soit. À quoi bon se lancer dans une FIC si le moindre chapitre un peu osé
                            peut faire sauter TOUT le topic ? Bon nombre de FIC légendaires de l'histoire du site ne
                            survivraient même pas 1 semaine aujourd'hui (ma cousine, cette bombe, ma vie en internat de
                            fille, L'Été de mes 17 ans etc).
                        </p>
                    </div>
                    <hr/>
                    <div className="mt-2">
                        <h3>Noelfic revient</h3>
                        <p>
                            Pour un but au court terme, ce site a pour but d'archiver et de mettre à disposition de
                            kheys les anciennes fictions de l'ancien site. Pour l'instant, nous avons récupéré 2461
                            histoires de 2009 à 2017.<br/>
                            Dans un plus long terme, ce site deviendra un site de publication de FIC à la manière de
                            fanfiction.net mais réservé aux kheys. On y recenserait toutes les FIC parues depuis la
                            fondation du site et, via inscription sous pseudonyme, les écrivains en herbe des forums
                            pourraient en publier de nouvelles.
                        </p>
                    </div>
                    <hr/>
                    <div className="mt-2">
                        <h4>Pour être plus précis, le site fonctionnerait ainsi</h4>
                        <ul>
                            <li>Inscription via formulaire pour pouvoir écrire des commentaires sous les FIC, les noter,
                                et en publier
                            </li>
                            <li>Plusieurs statuts : Admin, modérateur, correcteurs, auteurs.... avec code couleur et
                                autres joyeusetés
                            </li>
                            <li>Bibliothèque simple et accessible, tri par date, auteur, note (moyenne arithmétique sur
                                10)
                            </li>
                            <li>Possibilité de lier un pseudo NoelFIC à JVC, c-à-d simplement d'indiquer aux lecteurs
                                le(s) pseudo(s) jvc
                            </li>
                            <li>Système de catégories ou tags (policier, étudiant, sayks, :noel:, SF, fantasy etc)</li>
                            <li>Infos sur la périodicité des publications des chapitres d'une FIC (hebdomadaire,
                                bi-hebdomadaire, mensuel...) et infos visibles d'un coup d'oeil pour savoir si l'auteur
                                est ponctuel, si la FIC est laissée à l'abandon
                            </li>
                            <li>Système d'alerte à la parution d'un chapitre d'une FIC suivie</li>
                            <li>Système de favoris, de collection pour organiser vos FIC lues ou en cours de lecture
                            </li>
                            <li>Et bien évidemment un système de chapitres avec navigation fluides</li>
                        </ul>
                    </div>
                </Container>
            </Jumbotron>
            </div>
        );
    };

}

export default Index;