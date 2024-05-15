<?php


namespace App\Test\Unit;

 
use PHPUnit\Framework\TestCase; 
use GuzzleHttp\Client;
 
class EvenementControllerTest extends TestCase 
{
    public function testCreate()
    {
        $client = new Client(); 
 
        $data = array(
            'titre' => 'Titre de l\'événement',
            'description' => 'Description de l\'événement',
            'date' => '2024-05-14',
            'prix' => 10,
            'lieu' => 'Lieu de l\'événement',
            'maximum' => 100,
            'raison' => 'Raison de l\'événement',
            'annulation' => 'Motif d\'annulation de l\'événement'
        );
 
        $response = $client->request('POST', 'https://127.0.0.1:8000/api/evenement/create', [
            'json' => $data 
        ]);
 
        
        $this->assertEquals(201, $response->getStatusCode());
 
    }
    public function testUpdate()
    {
        $client = new Client();
        
        $data = array(
            'titre' => 'MODIFIE',
            'description' => 'MODIFIE',
            'date' => '2024-05-14',
            'prix' => 102,
            'lieu' => 'Lieu de l\'événement',
            'maximum' => 100,
            'raison' => 'Raison de l\'événement',
            'annulation' => 'Motif d\'annulation de l\'événement'
        );

        $evenementId = 6; 

        $response = $client->request('PUT', "https://127.0.0.1:8000/api/evenement/{$evenementId}/update", [
            'json' => $data
        ]);


        $this->assertEquals(200, $response->getStatusCode());
    }
    public function testDelete()
    {
        $client = new Client();

        $evenementId = 10; // ID du billet à supprimer

        $response = $client->request('DELETE', "https://127.0.0.1:8000/api/billet/{$evenementId}/delete");

        $this->assertEquals(204, $response->getStatusCode());
    }
}