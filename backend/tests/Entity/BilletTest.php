<?php

namespace App\Tests\Entity;

use App\Entity\Billet;
use App\Entity\Evenement;
use App\Entity\User;
use PHPUnit\Framework\TestCase;

class BilletTest extends TestCase
{
    public function testGetSetEvenementId(): void
    {
        // Crée une nouvelle instance de l'entité Billet.
        $billet = new Billet();
        // rée une nouvelle instance de l'entité Evenement.
        $evenement = new Evenement();

        // Définit un id evenement de test.
        $billet->setEvenementId($evenement);
        // Vérifie que l'evenement id défini correspond à celui obtenu.
        $this->assertSame($evenement, $billet->getEvenementId());
    }

    public function testGetSetUtilisateurId(): void
    {
        $billet = new Billet();
        $user = new User();

        $billet->setUtilisateurId($user);

        $this->assertSame($user, $billet->getUtilisateurId());
    }

    public function testGetSetQuantite(): void
    {
        $billet = new Billet();
        $quantite = 5;

        $billet->setQuantite($quantite);

        $this->assertSame($quantite, $billet->getQuantite());
    }

    public function testGetSetDateAchat(): void
    {
        $billet = new Billet();
        $dateAchat = new \DateTime('2024-05-15');

        $billet->setDateAchat($dateAchat);

        $this->assertSame($dateAchat, $billet->getDateAchat());
    }
}
