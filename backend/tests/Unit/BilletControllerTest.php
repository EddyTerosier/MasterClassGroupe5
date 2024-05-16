<?php

namespace App\Test\Unit;


use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client; 
 
class BilletControllerTest extends TestCase 
{
    private $client;
    //La fonction setUp crée une nouvelle instance du client Guzzle HTTP
    //pour configurer l'environnement de test
    protected function setUp(): void
    {
        $this->client = new Client([
            'base_uri' => 'http://localhost',
            'http_errors' => false, 
        ]);
    }

    public function testIndex(): void
    {
        //on envoie ici l'url pour récupérer la liste des billets ainsi que la requete
        $response = $this->client->request('GET', 'https://127.0.0.1:8000/api/billet');

        //pour ensuite que le code de statut de la réponse soit 200 (OK) 
        //et que le contenu de la réponse est au format JSON.
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody()->getContents());
    }
    public function testCreate()
    {
        // Données pour la création d'un billet
        $client = new Client(); 
 
        $data = array(
            'evenement_id_id' => 1,
            'utilisateur_id_id' => 1,
            'date_achat' => '2024-05-14',
            'quantite' => 5
        );

        //on envoie ici l'url et requête HTTP POST pour créer un billet avec les données spécifiées
 
        $response = $client->request('POST', 'https://127.0.0.1:8000/api/billet/create', [
            'json' => $data 
        ]);
        // Vérification que la création du billet a réussi (code de statut 201)
        $this->assertEquals(201, $response->getStatusCode());
 
    }
    public function testUpdate()
    {
        // Données pour la modif d'un billet
        
        $client = new Client();
        
        $data = [
            'evenement_id' => 1,
            'utilisateur_id' => 1,
            'date_achat' => '2024-05-14',
            'quantite' => 17
        ];

        $billetId = 3; // ID du billet à modifier (manuellement !il faut qu'il existe!)

        //on envoie ici l'url et requête HTTP PUT pour modifier un billet 
        $response = $client->request('PUT', "https://127.0.0.1:8000/api/billet/{$billetId}/update", [
            'json' => $data
        ]);


        $this->assertEquals(200, $response->getStatusCode());

    }
    public function testDelete()
    {
        $client = new Client();

        $billetId = 2; // ID du billet à supprimer (manuellement !il faut qu'il existe!)

        //on envoie ici l'url et requête HTTP DELETE pour suprimer un billet 
        $response = $client->request('DELETE', "https://127.0.0.1:8000/api/billet/{$billetId}/delete");

        $this->assertEquals(204, $response->getStatusCode());
    }
        
}