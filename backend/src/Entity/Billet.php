<?php

namespace App\Entity;

use App\Repository\BilletRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BilletRepository::class)]
class Billet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'billets')]
    private ?Evenement $evenementId = null;

    #[ORM\ManyToOne(inversedBy: 'billets')]
    private ?User $utilisateurId = null;

    #[ORM\Column]
    private ?int $quantite = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $dateAchat = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEvenementId(): ?Evenement
    {
        return $this->evenementId;
    }

    public function setEvenementId(?Evenement $evenementId): static
    {
        $this->evenementId = $evenementId;

        return $this;
    }

    public function getUtilisateurId(): ?User
    {
        return $this->utilisateurId;
    }

    public function setUtilisateurId(?User $utilisateurId): static
    {
        $this->utilisateurId = $utilisateurId;

        return $this;
    }

    public function getQuantite(): ?int
    {
        return $this->quantite;
    }

    public function setQuantite(int $quantite): static
    {
        $this->quantite = $quantite;

        return $this;
    }

    public function getDateAchat(): ?\DateTimeInterface
    {
        return $this->dateAchat;
    }

    public function setDateAchat(\DateTimeInterface $dateAchat): static
    {
        $this->dateAchat = $dateAchat;

        return $this;
    }
}
