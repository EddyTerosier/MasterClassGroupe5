<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use App\Entity\User;
use App\Repository\UserRepository;
class SecurityController extends AbstractController
{
    private $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    #[Route(path: '/csrf-token', name: 'csrf_token', methods: ['GET'])]
    public function getCsrfToken(): JsonResponse
    {
        $csrfToken = $this->csrfTokenManager->getToken('authenticate')->getValue();
        return new JsonResponse(['csrf_token' => $csrfToken]);
    }
    #[Route(path: '/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, AuthenticationUtils $authenticationUtils, UserRepository $userRepository): JsonResponse
    {
        if ($this->getUser()) {
            return new JsonResponse(['message' => 'Already logged in'], JsonResponse::HTTP_OK);
        }
    
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();
    
        if ($error) {
            return new JsonResponse(['error' => $error->getMessageKey()], JsonResponse::HTTP_UNAUTHORIZED);
        }
    
        // Récupérer l'email depuis la requête POST
        $email = $request->request->get('email');
    
        // Recherche de l'utilisateur par email
        $user = $userRepository->findOneByEmail($email);
    
        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
        }
    
        // Récupérer les rôles de l'utilisateur
        $roles = $user->getRoles();
    
        // Envoyer les rôles dans la réponse JSON
        return new JsonResponse(['last_username' => $lastUsername, 'roles' => $roles], JsonResponse::HTTP_OK);
    }
    #[Route(path: '/logout', name: 'app_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        return new JsonResponse(['message' => 'Logged out'], JsonResponse::HTTP_OK);
    }
}



