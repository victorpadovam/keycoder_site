document.addEventListener('DOMContentLoaded', async () => {
    const base64File = sessionStorage.getItem('pdfFile');
    const fileName = sessionStorage.getItem('fileName');

    if (base64File && fileName) {
      try {
        // Convert base64 to Blob
        const response = await fetch(base64File);
        const blob = await response.blob();
        const fileUrl = URL.createObjectURL(blob);

        const pdf = await pdfjsLib.getDocument({ url: fileUrl }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const text = content.items.map(item => item.str).join(' ');
          fullText += text + '\n\n';
        }

        fullText = fullText.replace(/[^\x00-\x7F]\s*| {2,}|\n{3,}/g, ' ').trim(); // Remove non-standard characters, emojis, and extra spaces

        enviardadosHabilidades(fullText);
      } catch (error) {
        alert('Erro');
        console.log(error);
      }
    } else {
        Swal.fire({
          title: 'Nenhum arquivo selecionado',
          text: 'Por favor, aguarde...',
          icon: 'warning',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
          didClose: () => {
            location.href = 'index.html';
          }
        });
    }
  });

  function enviardadosHabilidades(pdfConvertidoEmTexto) {
    const spinner = document.getElementById('loading_avaliacoes_das_habilidades');

    const texto = "Responda em Português (Brasil) Quais habilidades técnicas específicas você acha que estão faltando nesse currículo? abaixo:"
    const consultaHabilidades = texto + ' ' +  pdfConvertidoEmTexto;
  
    const datosFormulario = new FormData()
    datosFormulario.append("consultaHabilidades", consultaHabilidades)
    console.log(consultaHabilidades);

    spinner.style.display = 'block';
    // typedOutput.innerHTML = '';

    fetch("response.php", {
      method: 'POST',
      body: datosFormulario
    }).then(respuesta => respuesta.json())
      .then(respuesta => {
        new Typed('#avaliacoes_das_habilidades', {
          strings: [respuesta.mensaje],
          typeSpeed: 15,
          backSpeed: 25,
          loop: false
        });
        spinner.style.display = 'none';
        enviardadosMelhoriasExperiencias(pdfConvertidoEmTexto)
      }).catch(error => {
        console.error('Error en la solicitud fetch:', error)
        spinner.style.display = 'none';
      });
  }

  function enviardadosMelhoriasExperiencias(pdfConvertidoEmTexto) {
    const spinner = document.getElementById('loading_melhorias_de_experiiencias');
    const typedOutput = document.getElementById('typed-output');

    const texto = "Responda em Português (Brasil) de forma  resumida Quais Melhoria de Experiências Profissionais voce acha que esta faltando nesse currículo? abaixo:"
    const consultaHabilidades = texto + ' ' +  pdfConvertidoEmTexto;
  
    const datosFormulario = new FormData()
    datosFormulario.append("consultaHabilidades", consultaHabilidades)
    console.log(consultaHabilidades);

    spinner.style.display = 'block';
    // typedOutput.innerHTML = '';

    fetch("response.php", {
      method: 'POST',
      body: datosFormulario
    }).then(respuesta => respuesta.json())
      .then(respuesta => {
        new Typed('#melhorias_de_experiiencias', {
          strings: [respuesta.mensaje],
          typeSpeed: 15,
          backSpeed: 25,
          loop: false
        });
        spinner.style.display = 'none';
        enviardadosConciso(pdfConvertidoEmTexto);
      }).catch(error => {
        console.error('Error en la solicitud fetch:', error)
        spinner.style.display = 'none';
      });
  }

  function enviardadosConciso(pdfConvertidoEmTexto) {
    const spinner = document.getElementById('loading_melhorias_concisos');
    const typedOutput = document.getElementById('typed-output');

    const texto = "Responda em Português (Brasil) de forma resumida Você identificou alguma informação  nesse currículo abaixo que poderia ser omitida para torná-lo mais conciso e focado quais?     "
    const consultaHabilidades = texto + ' ' +  pdfConvertidoEmTexto;
  
    const datosFormulario = new FormData()
    datosFormulario.append("consultaHabilidades", consultaHabilidades)
    console.log(consultaHabilidades);

    spinner.style.display = 'block';
    // typedOutput.innerHTML = '';

    fetch("response.php", {
      method: 'POST',
      body: datosFormulario
    }).then(respuesta => respuesta.json())
      .then(respuesta => {
        new Typed('#melhorias_conciso', {
          strings: [respuesta.mensaje],
          typeSpeed: 15,
          backSpeed: 25,
          loop: false
        });
        spinner.style.display = 'none';
        enviardadosMelhoriasCurriculo(pdfConvertidoEmTexto);
      }).catch(error => {
        console.error('Error en la solicitud fetch:', error)
        spinner.style.display = 'none';
      });
  }

  function enviardadosMelhoriasCurriculo(pdfConvertidoEmTexto) {
    const spinner = document.getElementById('loading_melhorias_curriculo');
    const typedOutput = document.getElementById('typed-output');


    const texto = "Responda em Português (Brasil) de forma resumida Você acha que o currículo está claro  O que vc melhoraria?    "

    const consultaHabilidades = texto + ' ' +  pdfConvertidoEmTexto;
  
    const datosFormulario = new FormData()
    datosFormulario.append("consultaHabilidades", consultaHabilidades)
    console.log(consultaHabilidades);

    spinner.style.display = 'block';
    // typedOutput.innerHTML = '';

    fetch("response.php", {
      method: 'POST',
      body: datosFormulario
    }).then(respuesta => respuesta.json())
      .then(respuesta => {
        new Typed('#melhorias_curriculo', {
          strings: [respuesta.mensaje],
          typeSpeed: 15,
          backSpeed: 25,
          loop: false
        });
        spinner.style.display = 'none';
        enviardadosMelhoriasVisibilidade(pdfConvertidoEmTexto);
      }).catch(error => {
        console.error('Error en la solicitud fetch:', error)
        spinner.style.display = 'none';
      });
  }

  function enviardadosMelhoriasVisibilidade(pdfConvertidoEmTexto) {
    const spinner = document.getElementById('loading_melhorias_visibilidade');
    const typedOutput = document.getElementById('typed-output');

    const texto = "Responda em Português (Brasil) de forma resumida Quais palavras-chave ou termos específicos você acha que poderiam ser adicionados ao seu currículo para aumentar sua visibilidade nos sistemas de rastreamento de candidatos?    "
    const consultaHabilidades = texto + ' ' +  pdfConvertidoEmTexto;
  
    const datosFormulario = new FormData()
    datosFormulario.append("consultaHabilidades", consultaHabilidades)
    console.log(consultaHabilidades);

    spinner.style.display = 'block';
    // typedOutput.innerHTML = '';

    fetch("response.php", {
      method: 'POST',
      body: datosFormulario
    }).then(respuesta => respuesta.json())
      .then(respuesta => {
        new Typed('#melhorias_visibilidade', {
          strings: [respuesta.mensaje],
          typeSpeed: 15,
          backSpeed: 25,
          loop: false
        });
        spinner.style.display = 'none';
        enviardadosMelhoriasSoftSkill(pdfConvertidoEmTexto);
      }).catch(error => {
        console.error('Error en la solicitud fetch:', error)
        spinner.style.display = 'none';
      });
  }

  function enviardadosMelhoriasSoftSkill(pdfConvertidoEmTexto) {
    const spinner = document.getElementById('loading_soft_skill');
    const typedOutput = document.getElementById('typed-output');

    const texto = "Responda em Português (Brasil) de forma resumida: Quais habilidades interpessoais (soft skills) você recomendaria destacar ou incluir para tornar este currículo abaixo mais atraente para recrutadores:    "
    const consultaHabilidades = texto + ' ' +  pdfConvertidoEmTexto;
  
    const datosFormulario = new FormData()
    datosFormulario.append("consultaHabilidades", consultaHabilidades)
    console.log(consultaHabilidades);

    spinner.style.display = 'block';
    // typedOutput.innerHTML = '';

    fetch("response.php", {
      method: 'POST',
      body: datosFormulario
    }).then(respuesta => respuesta.json())
      .then(respuesta => {
        new Typed('#soft_skill', {
          strings: [respuesta.mensaje],
          typeSpeed: 15,
          backSpeed: 25,
          loop: false
        });
        spinner.style.display = 'none';
        enviardadosMelhoriasInformacoes(pdfConvertidoEmTexto);
      }).catch(error => {
        console.error('Error en la solicitud fetch:', error)
        spinner.style.display = 'none';
      });
  }

  function enviardadosMelhoriasInformacoes(pdfConvertidoEmTexto) {
    const spinner = document.getElementById('loading_informacoes_melhorada');
    const typedOutput = document.getElementById('typed-output');

    const texto = "Responda em Português (Brasil) de forma resumida: Como você pode reescrever o texto abaixo para torná-lo mais claro, objetivo e apropriado para um currículo?    "
    const consultaHabilidades = texto + ' ' +  pdfConvertidoEmTexto;
  
    const datosFormulario = new FormData()
    datosFormulario.append("consultaHabilidades", consultaHabilidades)
    console.log(consultaHabilidades);

    spinner.style.display = 'block';
    // typedOutput.innerHTML = '';

    fetch("response.php", {
      method: 'POST',
      body: datosFormulario
    }).then(respuesta => respuesta.json())
      .then(respuesta => {
        new Typed('#informacoes_melhorada', {
          strings: [respuesta.mensaje],
          typeSpeed: 15,
          backSpeed: 25,
          loop: false
        });
        spinner.style.display = 'none';
        enviardadosMelhoriasErrosGramaticas(pdfConvertidoEmTexto);
      }).catch(error => {
        console.error('Error en la solicitud fetch:', error)
        spinner.style.display = 'none';
      });
  }

  function enviardadosMelhoriasErrosGramaticas(pdfConvertidoEmTexto) {
    const spinner = document.getElementById('loading_erros_gramaticais');
    const typedOutput = document.getElementById('typed-output');

    const texto = "Responda em Português (Brasil) de forma resumida faça uma Verificação de Erros Gramaticais e Ortográficos no texto abaixo:    "
    const consultaHabilidades = texto + ' ' +  pdfConvertidoEmTexto;
  
    const datosFormulario = new FormData()
    datosFormulario.append("consultaHabilidades", consultaHabilidades)
    console.log(consultaHabilidades);

    spinner.style.display = 'block';
    // typedOutput.innerHTML = '';

    fetch("response.php", {
      method: 'POST',
      body: datosFormulario
    }).then(respuesta => respuesta.json())
      .then(respuesta => {
        new Typed('#erros_gramaticais', {
          strings: [respuesta.mensaje],
          typeSpeed: 15,
          backSpeed: 25,
          loop: false
        });
        spinner.style.display = 'none';
        enviardadosMelhoriasClareza(pdfConvertidoEmTexto);
      }).catch(error => {
        console.error('Error en la solicitud fetch:', error)
        spinner.style.display = 'none';
      });
  }

  function enviardadosMelhoriasClareza(pdfConvertidoEmTexto) {
    const spinner = document.getElementById('loading_melhorias_clareza');
    const typedOutput = document.getElementById('typed-output');

    const texto = "Responda em Português (Brasil) de forma resumida faça uma Avaliação de Clareza e Concisão do txto abaixo sugerindo reescritas mais eficiente:  "
    const consultaHabilidades = texto + ' ' +  pdfConvertidoEmTexto;
  
    const datosFormulario = new FormData()
    datosFormulario.append("consultaHabilidades", consultaHabilidades)
    console.log(consultaHabilidades);

    spinner.style.display = 'block';
    // typedOutput.innerHTML = '';

    fetch("response.php", {
      method: 'POST',
      body: datosFormulario
    }).then(respuesta => respuesta.json())
      .then(respuesta => {
        new Typed('#melhorias_clareza', {
          strings: [respuesta.mensaje],
          typeSpeed: 15,
          backSpeed: 25,
          loop: false
        });
        spinner.style.display = 'none';
      }).catch(error => {
        console.error('Error en la solicitud fetch:', error)
        spinner.style.display = 'none';
      });
  }