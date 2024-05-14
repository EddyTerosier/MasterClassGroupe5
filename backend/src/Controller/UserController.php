<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;

    }
    

    #[Route("/signup", name:"signup", methods:["POST"])]
    public function signup(Request $request, UserPasswordHasherInterface $userPasswordHasher): Response
    {
        $requestData = json_decode($request->getContent(), true);

        $email = $requestData['email'] ?? null;
        $password = $requestData['password'] ?? null;

        if ($email === null || $password === null) {
            return $this->json(['error' => 'Les données email et password sont obligatoires.'], 400);
        }

        $user = new User();
        $user->setEmail($email);

        $user->setPassword($userPasswordHasher->hashPassword($user,$password));
        
        $user->setRoles(['ROLE_USER']);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json(['message' => 'Utilisateur inscrit'], 201);
    }
}
