<?php

namespace App\Tests\Entity;

use App\Entity\Evenement;
use App\Entity\Billet;
use PHPUnit\Framework\TestCase;

class EvenementTest extends TestCase
{
    public function testGetSetTitre(): void
    {
        $evenement = new Evenement();
        $titre = 'Concert de musique';

        $evenement->setTitre($titre);

        $this->assertSame($titre, $evenement->getTitre());
    }

    public function testGetSetDescription(): void
    {
        $evenement = new Evenement();
        $description = 'Un super concert à ne pas manquer.';

        $evenement->setDescription($description);

        $this->assertSame($description, $evenement->getDescription());
    }

    public function testGetSetDate(): void
    {
        $evenement = new Evenement();
        $date = new \DateTime('2024-05-15');

        $evenement->setDate($date);

        $this->assertSame($date, $evenement->getDate());
    }

    public function testGetSetLieu(): void
    {
        $evenement = new Evenement();
        $lieu = 'Paris';

        $evenement->setLieu($lieu);

        $this->assertSame($lieu, $evenement->getLieu());
    }

    public function testGetSetPrix(): void
    {
        $evenement = new Evenement();
        $prix = 50.0;

        $evenement->setPrix($prix);

        $this->assertSame($prix, $evenement->getPrix());
    }

    public function testGetSetMaximum(): void
    {
        $evenement = new Evenement();
        $maximum = 100;

        $evenement->setMaximum($maximum);

        $this->assertSame($maximum, $evenement->getMaximum());
    }

    public function testGetSetRaison(): void
    {
        $evenement = new Evenement();
        $raison = 'Annulation pour cause de météo.';

        $evenement->setRaison($raison);

        $this->assertSame($raison, $evenement->getRaison());
    }

    public function testIsSetAnnulation(): void
    {
        $evenement = new Evenement();
        $annulation = true;

        $evenement->setAnnulation($annulation);

        $this->assertSame($annulation, $evenement->isAnnulation());
    }

    public function testAddRemoveBillet(): void
    {
        $evenement = new Evenement();
        $billet = new Billet();

        $evenement->addBillet($billet);
        $this->assertTrue($evenement->getBillets()->contains($billet));

        $evenement->removeBillet($billet);
        $this->assertFalse($evenement->getBillets()->contains($billet));
    }
}
