<?php

namespace App\Controller;

use App\Entity\Evenement;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route("/api/evenement")]
class EvenementController extends AbstractController
{
    private $entityManager;
    private $validator;

    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    #[Route('/', name: 'evenement_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $repository = $this->entityManager->getRepository(Evenement::class);
        $evenements = $repository->findAll();

        return $this->json($evenements, Response::HTTP_OK, [], ['groups' => 'evenement']);
    }

    #[Route('/{id}', name: 'evenement_show', methods: ['GET'])]
    public function show(Evenement $evenement): JsonResponse
    {
        return $this->json($evenement, Response::HTTP_OK, [], ['groups' => 'evenement']);
    }

    #[Route('/create', name: 'evenement_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $evenement = new Evenement();
        $evenement->setTitre($data['titre'] ?? null);
        $evenement->setDescription($data['description'] ?? null);
        $evenement->setDate(new \DateTime($data['date'] ?? 'now'));
        $evenement->setPrix($data['prix'] ?? null);
        $evenement->setLieu($data['lieu'] ?? null);
        $evenement->setMaximum($data['maximum'] ?? null);
        $evenement->setRaison($data['raison'] ?? null);
        $evenement->setAnnulation($data['annulation'] ?? null);

        $errors = $this->validator->validate($evenement);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return $this->json(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($evenement);
        $this->entityManager->flush();

        return $this->json(['message' => 'Événement créé avec succès'], Response::HTTP_CREATED);
    }

    #[Route('/{id}/update', name: 'evenement_update', methods: ['PUT'])]
    public function update(Request $request, Evenement $evenement): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $evenement->setTitre($data['titre'] ?? $evenement->getTitre());
        $evenement->setDescription($data['description'] ?? $evenement->getDescription());
        $evenement->setDate(new \DateTime($data['date'] ?? $evenement->getDate()->format('Y-m-d H:i:s')));
        $evenement->setPrix($data['prix'] ?? $evenement->getPrix());
        $evenement->setLieu($data['lieu'] ?? $evenement->getLieu());
        $evenement->setMaximum($data['maximum'] ?? $evenement->getMaximum());
        $evenement->setRaison($data['raison'] ?? $evenement->getRaison());
        $evenement->setAnnulation($data['annulation'] ?? $evenement->isAnnulation());

        $this->entityManager->flush();

        return $this->json($evenement, Response::HTTP_OK, [], ['groups' => 'evenement']);
    }

    #[Route('/{id}/annuler', name: 'evenement_annuler', methods: ['PUT'])]
    public function annuler(Request $request, Evenement $evenement): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $evenement->setAnnulation(true);
        $evenement->setRaison($data['reason'] ?? $evenement->getRaison());

        $this->entityManager->flush();

        return $this->json($evenement, Response::HTTP_OK, [], ['groups' => 'evenement']);
    }

    #[Route('/{id}/delete', name: 'evenement_delete', methods: ['DELETE'])]
    public function delete(Evenement $evenement): JsonResponse
    {
        $this->entityManager->remove($evenement);
        $this->entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
