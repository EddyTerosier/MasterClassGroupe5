<?php

namespace App\Tests\Controller;
use PHPUnit\Framework\Exception;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserControllerTest extends WebTestCase
{
    public function testSignup()
    {
        $client = static::createClient();


        $data = array(
            'email' => "1",
            'password' => "password"
        );

        $client->request('POST', 'http://localhost:8000/signup', [], [], [], json_encode($data));


        try {
            $this->assertEquals(201, $client->getResponse()->getStatusCode());
        } catch (Exception $e) {
            $this->fail("Exception thrown: ".$e->getMessage());
        }

        try{
            $this->assertJsonStringEqualsJsonString(
                '{"message": "Utilisateur inscrit"}',
                $client->getResponse()->getContent()
            );
        } catch (Exception $e){
            $this->fail("Exception thrown: ".$e->getMessage());
        }

    }
}



