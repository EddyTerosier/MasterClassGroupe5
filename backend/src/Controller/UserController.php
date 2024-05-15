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

    #[Route("/users", name:"get_users", methods:["GET"])]
    public function getUsers(): Response
    {
        $userRepository = $this->entityManager->getRepository(User::class);
        $users = $userRepository->findAll();

        $usersArray = [];
        foreach ($users as $user) {
            $usersArray[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
                // Ajoutez d'autres champs si nécessaire
            ];
        }

        return $this->json($usersArray);
    }

    #[Route("/users/{id}", name:"get_user_by_id", methods:["GET"])]
    public function getUserById(User $user): Response
    {
        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ]);
    }

    #[Route("/users/{id}", name:"update_user", methods:["PUT"])]
    public function updateUser($id, Request $request, UserPasswordHasherInterface $userPasswordHasher): Response
    {
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($id);

        if (!$user) {
            return $this->json(['error' => 'Utilisateur non trouvé.'], 404);
        }

        $requestData = json_decode($request->getContent(), true);

        $email = $requestData['email'] ?? null;
        $password = $requestData['password'] ?? null;
        $roles = $requestData['roles'] ?? null;

        if ($email !== null) {
            $user->setEmail($email);
        }

        if ($password !== null) {
            $user->setPassword($userPasswordHasher->hashPassword($user, $password));
        }

        if ($roles !== null) {
            $user->setRoles($roles);
        }

        $this->entityManager->flush();

        return $this->json(['message' => 'Utilisateur mis à jour'], 200);
    }

    #[Route("/users/{id}", name:"delete_user", methods:["DELETE"])]
    public function deleteUser($id): Response
    {
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($id);

        if (!$user) {
            return $this->json(['error' => 'Utilisateur non trouvé.'], 404);
        }

        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return $this->json(['message' => 'Utilisateur supprimé'], 200);
    }
}
