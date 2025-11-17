<?php

$consultaHabilidades = $_POST['consultaHabilidades'];

$url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD3eCqjCiXhN85LwrY5hk8hIP_i6WkC4BU'; // copiar su API Key de ai.google.dev

$datos = [
  'contents' => [
      [
          'parts' => [
              [
                  'text' => $consultaHabilidades
              ]
          ]
      ]
  ]
];
$datosJSON = json_encode($datos);

// Configura las opciones de la solicitud cURL
$opciones = array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER => false,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => '',
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => $datosJSON,
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
    ),
);

// Inicializa cURL y configura las opciones
$curl = curl_init();
curl_setopt_array($curl, $opciones);

// Ejecuta la solicitud cURL
$respGemini = curl_exec($curl);

$respuesta = json_decode($respGemini,true);
// Cierra la sesión cURL
curl_close($curl);

// Envia la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode(['mensaje' => $respuesta['candidates'][0]['content']['parts'][0]['text'] ]);