<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\SecurityRequestAttributes;
use App\Repository\UserRepository;

class AppAuthenticator extends AbstractLoginFormAuthenticator
{
    public const LOGIN_ROUTE = 'app_login';
    private UserRepository $userRepository;

    public function __construct(private UrlGeneratorInterface $urlGenerator, UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function authenticate(Request $request): Passport
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';

        $request->getSession()->set(SecurityRequestAttributes::LAST_USERNAME, $email);

        return new Passport(
            new UserBadge($email),
            new PasswordCredentials($data['password'] ?? ''),
            [
                new CsrfTokenBadge('authenticate', $data['_csrf_token'] ?? ''),
            ]
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?JsonResponse
    {
        // Obtenez le rôle de l'utilisateur authentifié
        $role = $this->getRole($token);

        // Retournez la réponse JSON avec le message et le rôle
        return new JsonResponse(['message' => 'Authentication successful', 'role' => $role], JsonResponse::HTTP_OK);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): JsonResponse
    {
        return new JsonResponse(['error' => $exception->getMessageKey()], JsonResponse::HTTP_UNAUTHORIZED);
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }

    // Méthode pour obtenir le rôle de l'utilisateur à partir du jeton d'authentification
    private function getRole(TokenInterface $token): string
    {
        // Récupérer l'utilisateur à partir du token
        $user = $token->getUser();

        // Assurez-vous que l'utilisateur est une instance de votre classe User
        if (!$user instanceof \App\Entity\User) {
            throw new \LogicException('Unable to get the role from the token.');
        }

        // Récupérer les rôles de l'utilisateur
        $roles = $user->getRoles();

        // Ici, nous supposons que l'utilisateur a un seul rôle
        // Vous devrez adapter cette logique en fonction de la structure de vos rôles
        return $roles[0];
    }
}
