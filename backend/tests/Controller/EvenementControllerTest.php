<?php

namespace App\Tests\Unit;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class EvenementControllerTest extends WebTestCase
{
    // Teste création d'un événement
    public function testCreate()
    {
        // Crée un client HTTP pour tester l'application
        $client = static::createClient();

        // Données de l'événement à créer
        $data = [
            'titre' => 'Titre de l\'événement',
            'description' => 'Description de l\'événement',
            'date' => '2024-05-14',
            'prix' => 10,
            'lieu' => 'Lieu de l\'événement',
            'maximum' => 100,
            'raison' => 'Raison de l\'événement',
            'annulation' => 'Motif d\'annulation de l\'événement'
        ];

        // Fait une requête POST vers l' API pour créer l'événement
        $client->request('POST', '/api/evenement/create', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($data));

        // Vérifie que la réponse a un statut HTTP 201 
        //créer avec succes
        $this->assertEquals(201, $client->getResponse()->getStatusCode());
    }

    //Teste la mise à jour d'un événement.
    public function testUpdate()
    {
        // Crée un client HTTP pour tester l'application
        $client = static::createClient();
        
        // Données de l'événement 
        $data = [
            'titre' => 'MODIFIE',
            'description' => 'MODIFIE',
            'date' => '2024-05-14',
            'prix' => 102,
            'lieu' => 'Lieu de l\'événement',
            'maximum' => 100,
            'raison' => 'Raison de l\'événement',
            'annulation' => 'Motif d\'annulation de l\'événement'
        ];

        $evenementId = 1; //id existant !!

        // Fait une requete PUT vers l'API pour mettre à jour l'événement
        $client->request('PUT', "https://127.0.0.1:8000/api/evenement/{$evenementId}/update", [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($data));

        // Vérifie que la réponse a un statut HTTP 200 
        //OK
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    //Teste la suppression d'un événement.

    public function testDelete()
    {
        // Crée un client HTTP pour tester l'application
        $client = static::createClient();

        $evenementId = 10;

        // Fait une requête DELETE vers l'API pour supprimer l'événement
        $client->request('DELETE', "https://127.0.0.1:8000/api/evenement/{$evenementId}/delete");

        // Vérifie que la réponse a un statut HTTP
        // 204 
        $this->assertEquals(204, $client->getResponse()->getStatusCode());
    }

    //Teste l'annulation d'un événement.

    public function testAnnuler(): void
    {
        // Crée un client HTTP pour tester l'application
        $client = static::createClient();
        $evenementId = 1;
        
        $data = ['reason' => 'Raison de l\'annulation'];

        // Fait une requête PUT vers l'API pour annuler l'événement
        $client->request('PUT', "https://127.0.0.1:8000/api/evenement/{$evenementId}/annuler", [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($data));

        // Vérifie que la réponse a un statut HTTP 
        //200 (OK)
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    //Teste la création d'un événement avec des données manquantes, ce qui devrait déclencher une erreur.

    public function testCreateErreur()
    {
        // Crée un client HTTP pour tester l'application
        $client = static::createClient();
    
        // Données manquantes pour créer un événement
        $data = [
            // Données manquantes à remplir
        ];
    
        // Fait une requête POST vers l'API pour créer l'événement avec des données manquantes
        $client->request('POST', '/api/evenement/create', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($data));
    
        // Vérifie que la réponse a un statut HTTP 400 
        //Bad Request
        $this->assertEquals(400, $client->getResponse()->getStatusCode());
        // Vérifie que la réponse est au format JSON
        $this->assertJson($client->getResponse()->getContent());
    }
    //Test de suppression d'un événement qui n'existe pas.

    public function testDeleteNonExistant()
    {
        // Créer un nouveau client pour effectuer des requêtes HTTP vers l'application
        $client = static::createClient();
        
        // Définir l'identifiant de l'événement à supprimer
        //il faut un ID qui n'existe pas
        $eventId = 999;

        // Envoyer une requête DELETE à l'endpoint API qui 'delete'
        $client->request('DELETE', "https://127.0.0.1:8000/api/evenement/{$eventId}/delete");

        // S'assurer que le code de statut de la réponse est 404 
        //Not found
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
    }
}
