<?php

namespace App\Tests\Unit;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class BilletControllerTest extends WebTestCase
{
    public function testCreate()
    {
        // Créer un client HTTP pour tester l'application
        $client = static::createClient();

        // Les données à envoyer dans la requête POST
        $data = array(
            'evenement_id_id' => 1,
            'utilisateur_id_id' => 1,
            'date_achat' => '2024-05-14',
            'quantite' => 5
        );

        // Faites une requête POST vers votre endpoint API
        $client->request('POST', '/api/billet/create', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($data));

        // Vérifie que la réponse a un statut HTTP 201
        $this->assertEquals(201, $client->getResponse()->getStatusCode());
    }

    public function testUpdate()
    {
        // Créer un client HTTP pour tester l'application
        $client = static::createClient();
        
        // Les données à envoyer dans la requête pour modifier
        $data = [
            'evenement_id' => 4,
            'utilisateur_id' => 1,
            'date_achat' => '2024-05-14',
            'quantite' => 17
        ];

        // Identifiant du billet à mettre à jour
        $billetId = 1; 

        // Faites une requête PUT vers l'endpoint de mise à jour du billet
        $client->request('PUT', "https://127.0.0.1:8000/api/billet/{$billetId}/update", [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($data));

        // Vérifie que la réponse a un statut HTTP 
        //200 (OK)
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testDelete()
    {
        // Créer un client HTTP pour tester l'application
        $client = static::createClient();

        // Identifiant du billet à supprimer
        $billetId = 42;

        // requête DELETE vers l'endpoint de suppression du billet
        $client->request('DELETE', "https://127.0.0.1:8000/api/billet/{$billetId}/delete");

        // Vérifie que la réponse a un statut HTTP
        //204 
        $this->assertEquals(204, $client->getResponse()->getStatusCode());
    }
    public function testDeleteNonExistant()
    {
        // Créer un nouveau client pour effectuer des requêtes HTTP vers l'application
        $client = static::createClient();
        
        // Définir l'identifiant de l'événement à supprimer
        //il faut un ID qui n'existe pas
        $billetId = 999;

        // Envoyer une requête DELETE à l'endpoint API qui 'delete'
        $client->request('DELETE', "https://127.0.0.1:8000/api/billet/{$billetId}/delete");

        // S'assurer que le code de statut de la réponse est 404 
        //Not found
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
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
         $client->request('POST', '/api/billet/create', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode($data));
     
         // Vérifie que la réponse a un statut HTTP 400 
         //Bad Request
         $this->assertEquals(400, $client->getResponse()->getStatusCode());
         // Vérifie que la réponse est au format JSON
         $this->assertJson($client->getResponse()->getContent());
     }
}
