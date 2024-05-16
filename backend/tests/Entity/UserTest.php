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
        $user = new User();
        $email = 'test@example.com';

        $user->setEmail($email);

        $this->assertSame($email, $user->getEmail());
    }

    public function testGetSetRoles(): void
    {
        $user = new User();
        $roles = ['ROLE_ADMIN'];

        $user->setRoles($roles);

        $this->assertSame(array_unique(array_merge($roles, ['ROLE_USER'])), $user->getRoles());
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

        // Test adding a billet
        $user->addBillet($billet);
        $this->assertCount(1, $user->getBillets());
        $this->assertSame($user, $billet->getUtilisateurId());

        // Test removing a billet
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

