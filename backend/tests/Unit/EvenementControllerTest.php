<?php


namespace App\Test\Unit;

 
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
class EvenementControllerTest extends TestCase 
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
        //on envoie ici l'url pour récupérer la liste des evenements ainsi que la requete
        $response = $this->client->request('GET', 'https://127.0.0.1:8000/api/evenement');

        //pour ensuite que le code de statut de la réponse soit 200 (OK) 
        //et que le contenu de la réponse est au format JSON.
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getBody()->getContents());
    }
    public function testCreate()
    {
        $client = new Client(); 
        // Données pour la création d'un evenement
        $data = array(
            'titre' => 'Titre de l\'événement',
            'description' => 'Description de l\'événement',
            'date' => '2024-05-14',
            'prix' => 10,
            'lieu' => 'Lieu de l\'événement',
            'maximum' => 100,
            'annulation' => 0
        );
         //on envoie ici l'url et requête HTTP POST pour créer un evenement avec les données spécifiées
 
        $response = $client->request('POST', 'https://127.0.0.1:8000/api/evenement/create', [
            'json' => $data 
        ]);
 
        // Vérification que la création du billet a réussi (code de statut 201)
        $this->assertEquals(201, $response->getStatusCode());
 
    }
    public function testUpdate()
    {
        $client = new Client();
        // Données pour la modif d'un evenement
        $data = array(
            'titre' => 'MODIFIE',
            'description' => 'MODIFIE',
            'date' => '2024-05-14',
            'prix' => 102,
            'lieu' => 'Lieu de l\'événement',
            'maximum' => 100,
            'annulation' => 0
        );
        //recuperer un id existant ! (manuellement pour l'instant)
        $evenementId = 4; 
        //on envoie ici l'url et requête HTTP PUT pour modifier un evenement
        $response = $client->request('PUT', "https://127.0.0.1:8000/api/evenement/{$evenementId}/update", [
            'json' => $data
        ]);


        $this->assertEquals(200, $response->getStatusCode());
    }
    public function testDelete()
    {
        $client = new Client();
        //recuperer un id existant ! (manuellement pour l'instant)
        $evenementId = 3; 

        $response = $client->request('DELETE', "https://127.0.0.1:8000/api/evenement/{$evenementId}/delete");

        $this->assertEquals(204, $response->getStatusCode());
    }
    public function testAnnuler(): void
    {
        $client = new Client();
        $evenementId = 4; 
        
        $data = ['reason' => 'Raison de l\'annulation'];

        // Appel de la méthode annuler avec des données JSON
        $response = $client->request('PUT', "https://127.0.0.1:8000/api/evenement/{$evenementId}/annuler", [
            'json' => $data
        ]);

        // Vérification que la méthode renvoie une réponse HTTP 200
        $this->assertEquals(200, $response->getStatusCode());
    }

}