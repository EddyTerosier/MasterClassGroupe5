<?php

namespace App\Controller;

use App\Entity\Billet;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Evenement;
use App\Entity\User;

//use Symfony\Component\Security\Core\Security; // Importez la classe Security

#[Route("/api/billet")]
class BilletController extends AbstractController
{
    private $entityManager;
    private $validator;
    private $security; // Ajoutez une propriété pour le service Security

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator)/*Security $security)*/ // Ajoutez Security à la liste des dépendances injectées
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        //$this->security = $security; // Initialisez la propriété $security
    }
    #[Route('/', name: 'billet_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $repository = $this->entityManager->getRepository(Billet::class);
        $billets = $repository->findAll();

        return $this->json($billets, Response::HTTP_OK, [], ['groups' => 'billet']);
    }
    

    #[Route('/create', name: 'billet_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $billet = new Billet();

        
        $evenementId = $data['evenement_id_id'] ?? null;
        $evenement = $entityManager->getRepository(Evenement::class)->find($evenementId);
        $utilisateurId = $data['utilisateur_id_id'] ?? null;
        $utilisateur = $entityManager->getRepository(User::class)->find($utilisateurId);

        
        if (!$evenement) {
            return $this->json(['error' => 'L\'événement spécifié n\'existe pas'], Response::HTTP_BAD_REQUEST);
        }
        //$user = $this->security->getUser();

        $billet->setEvenementId($evenement); // Définit l'objet Evenement sur le billet
        $billet->setUtilisateurId($utilisateur);
        $billet->setQuantite($data['quantite'] ?? null);
        $billet->setDateAchat(new \DateTime());

        $errors = $this->validator->validate($billet);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return $this->json(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }
        
        $entityManager->persist($billet);
        $entityManager->flush();

        return $this->json(['message' => 'Billet créé avec succès'], Response::HTTP_CREATED);
    }

    
    #[Route('/{id}/update', name: 'billet_update', methods: ['PUT'])]
    public function update(Request $request, Billet $billet): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $billet->setQuantite($data['quantite'] ?? $billet->getQuantite());

        $this->entityManager->flush();

        return $this->json($billet, Response::HTTP_OK, [], ['groups' => 'billet']);
    }

    #[Route('/{id}/delete', name: 'billet_delete', methods: ['DELETE'])]
    public function delete(Billet $billet): JsonResponse
    {
        $this->entityManager->remove($billet);
        $this->entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
