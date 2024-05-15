<?php

namespace App\Test\Unit;

use App\Controller\BilletController;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client; 
use Doctrine\ORM\EntityManagerInterface; 

 
class BilletControllerTest extends TestCase 
{
    public function testCreate()
    {
        $client = new Client(); 
 
        $data = array(
            'evenement_id_id' => 1,
            'utilisateur_id_id' => 1,
            'date_achat' => '2024-05-14',
            'quantite' => 5
        );
 
        $response = $client->request('POST', 'https://127.0.0.1:8000/api/billet/create', [
            'json' => $data 
        ]);

        $this->assertEquals(201, $response->getStatusCode());
 
    }
    public function testUpdate()
    {
        $client = new Client();
        
        $data = [
            'evenement_id' => 4,
            'utilisateur_id' => 1,
            'date_achat' => '2024-05-14',
            'quantite' => 17
        ];

        $billetId = 9; 

        $response = $client->request('PUT', "https://127.0.0.1:8000/api/billet/{$billetId}/update", [
            'json' => $data
        ]);


        $this->assertEquals(200, $response->getStatusCode());

    }
    public function testDelete()
    {
        $client = new Client();

        $billetId = 8; // ID du billet à supprimer

        $response = $client->request('DELETE', "https://127.0.0.1:8000/api/billet/{$billetId}/delete");

        $this->assertEquals(204, $response->getStatusCode());
    }
        
}