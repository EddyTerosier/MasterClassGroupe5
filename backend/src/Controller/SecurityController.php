<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use App\Entity\User;
use App\Repository\UserRepository;
class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login')]

    // Dans votre méthode login du contrôleur SecurityController
    
    public function login(Request $request, AuthenticationUtils $authenticationUtils, UserRepository $userRepository): Response
    {
        // Récupérer les erreurs de connexion
        $error = $authenticationUtils->getLastAuthenticationError();
    
        // Récupérer le nom d'utilisateur saisi par l'utilisateur
        $requestData = json_decode($request->getContent(), true);
    
        // Récupérer l'e-mail depuis la requête
        $email = $requestData['email'] ?? null;
    
        // Rechercher l'utilisateur par son adresse e-mail
        $user = null;
        if ($email !== null) {
            $user = $userRepository->findOneBy(['email' => $email]);
        }
    
        // Vérifier si l'utilisateur est connecté
        if ($user !== null) {
            // Si les identifiants sont corrects, renvoyer "Connecté"
            return new Response("Connecté", Response::HTTP_OK);
        } else {
            // Si les identifiants ne sont pas corrects, renvoyer un message d'erreur
            return new Response("Identifiants incorrects", Response::HTTP_UNAUTHORIZED);
        }
    
        // Vérifier si une erreur s'est produite lors de la tentative de connexion
        if ($error !== null) {
            // Si une erreur s'est produite, renvoyer un message d'erreur approprié
            return new Response("Erreur lors de la connexion: " . $error->getMessage(), Response::HTTP_UNAUTHORIZED);
        }
    }
    
}
