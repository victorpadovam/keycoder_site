<?php

// Verifica se o formulário foi submetido
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    // Verifica se a extensão do arquivo é PDF
    echo $fileExtension;

        // Nome do arquivo temporário
        $tempFilePath = $file['tmp_name'];
        
        // Diretório de saída para o PNG
        $outputDir = 'output/';
        if (!file_exists($outputDir)) {
            mkdir($outputDir, 0777, true);
        }
        
        // Caminho para o arquivo PNG
        $outputFilePath = $outputDir . pathinfo($file['name'], PATHINFO_FILENAME) . '.png';

        echo "enviando";
        // Converte PDF para PNG usando Imagick
        try {
            $imagick = new Imagick();
            $imagick->readImage($tempFilePath);
            $imagick->setImageFormat('png');
            $imagick->writeImage($outputFilePath);
            $imagick->clear();
            $imagick->destroy();
            
            // Envia o arquivo PNG para a API Gemini do Google
            $apiUrl = 'https://gemini.googleapis.com/v1/processDocument';
            $apiKey = 'AIzaSyCLSG4wQ3mvKDtBf8-23TQYtFr9q_rC-vw'; // Substitua pela sua chave de API

            $postData = [
                'file' => new CURLFile($outputFilePath)
            ];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $apiKey
            ]);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            
            echo $httpCode;


            if ($httpCode === 200) {
                echo 'Arquivo enviado com sucesso!';
            } else {
                echo 'Erro ao enviar arquivo: ' . $response;
            }

            curl_close($ch);

        } catch (ImagickException $e) {
            echo 'Erro ao converter PDF para PNG: ', $e->getMessage();
        }
   
} else {
    echo 'Nenhum arquivo enviado.';
}

?>
