<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login')]
    public function login(Request $request, AuthenticationUtils $authenticationUtils): JsonResponse
    {
        // Récupérer les erreurs de connexion
        $error = $authenticationUtils->getLastAuthenticationError();

        // Récupérer le nom d'utilisateur saisi par l'utilisateur
        $lastUsername = $authenticationUtils->getLastUsername();

        // Vérifier si une erreur s'est produite lors de la tentative de connexion
        if ($error !== null) {
            // Si une erreur s'est produite, renvoyer un message d'erreur approprié
            return new JsonResponse("Erreur lors de la connexion: " . $error->getMessage(), JsonResponse::HTTP_UNAUTHORIZED);
        }

        // Vérifier si l'utilisateur est connecté
        if ($this->getUser() !== null) {
            // Si les identifiants sont corrects, renvoyer "Connecté"
            return new JsonResponse("Connecté", JsonResponse::HTTP_OK);
        } else {
            // Si les identifiants ne sont pas corrects, renvoyer un message d'erreur
            return new JsonResponse("Identifiants incorrects", JsonResponse::HTTP_UNAUTHORIZED);
        }
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
