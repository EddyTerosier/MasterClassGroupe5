<?php

namespace App\Tests\Entity;

// tests/Entity/UserTest.php

namespace App\Tests\Entity;

use App\Entity\User;
use App\Entity\Billet;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function testGetSetEmail(): void
    {
        // Crée une nouvelle instance de l'entité User.
        $user = new User();
        // Définit une adresse e-mail de test.
        $email = 'test@example.com';

        // Utilise la méthode setEmail pour définir l'e-mail de l'utilisateur.
        $user->setEmail($email);

        // Vérifie que l'e-mail défini correspond à celui obtenu.
        $this->assertSame($email, $user->getEmail());
    }

    public function testGetSetRoles(): void
    {
        $user = new User();
        $roles = ['ROLE_ADMIN'];

        $user->setRoles($roles);

        $this->assertSame($roles, $user->getRoles());
    }

    public function testGetSetPassword(): void
    {
        $user = new User();
        $password = 'hashed_password';

        $user->setPassword($password);

        $this->assertSame($password, $user->getPassword());
    }

    public function testBilletsCollection(): void
    {
        $user = new User();
        $billet = new Billet();
        $billet->setUtilisateurId($user);


        $user->addBillet($billet);
        $this->assertCount(1, $user->getBillets());
        $this->assertSame($user, $billet->getUtilisateurId());

        $user->removeBillet($billet);
        $this->assertCount(0, $user->getBillets());
        $this->assertNull($billet->getUtilisateurId());
    }

    public function testUserIdentifier(): void
    {
        $user = new User();
        $email = 'test@example.com';

        $user->setEmail($email);

        $this->assertSame($email, $user->getUserIdentifier());
    }
}

