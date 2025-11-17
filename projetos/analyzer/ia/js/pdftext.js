const pdfFile = document.getElementById('pdfFile');
const downloadButton = document.getElementById('downloadButton');
const copyButton = document.getElementById('copyButton');
const output = document.getElementById('output');
const loadingBanner = document.getElementById('loadingBanner');
const copiedBanner = document.getElementById('copiedBanner');
const fileName = document.getElementById('fileName');
const wordCount = document.getElementById('wordCount');
const wordCountNum = document.getElementById('wordCountNum');
const charCount = document.getElementById('charCount');
const charCountNum = document.getElementById('charCountNum');
const pdfFileLabel = document.querySelector('label[for="pdfFile"]');
const customFileUpload = document.querySelector('.fileUpload');
const alertBanner = document.getElementById('alertBanner');

let sanitizedFileName = 'extracted-text';



// Alert banner function
let alertTimerId = null;

function sanitizeFileName(filename) {
  const nameWithoutExtension = filename.split('.').slice(0, -1).join('.');
  const sanitized = nameWithoutExtension
    .replace(/[\s-]+/g, '-')
    .replace(/_/g, '-')
    .replace(/\.+/g, '.')
    .replace(/(-)+/g, '$1')
    .toLowerCase();
  return sanitized + '.' + filename.split('.').pop();
}

pdfFile.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  
  if (file) {
    try {
      console.log(file);
      // Use FileReader to read the file content as base64
      const reader = new FileReader();
      reader.onload = function(event) {
        const base64File = event.target.result;
        sessionStorage.setItem('pdfFile', base64File);
        sessionStorage.setItem('fileName', file.name);
        // Redireciona para response.html após armazenar o arquivo
        Swal.fire({
          title: 'IA em análise',
          text: 'Por favor, aguarde...',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
          didClose: () => {
            location.href = 'response.html';
          }
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Erro');
      console.log(error);
    }
  } else {
    pdfFileLabel.textContent = 'Select PDF File';
    fileName.textContent = '';
    output.value = '';
    wordCountNum.textContent = 0;
    charCountNum.textContent = 0;
    downloadButton.disabled = true;
    copyButton.disabled = true;
  }
});


// downloadButton.addEventListener('click', () => {
//     const blob = new Blob([output.value], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = sanitizedFileName + '-extracted-text.txt';
//     link.click();
//     URL.revokeObjectURL(url);
//     displayFlashMessage('File downloaded successfully!', 'success');
//     downloadButton.disabled = true;
// });

// copyButton.addEventListener('click', async () => {
//     try {
//       output.focus();
//       output.select();
//       await navigator.clipboard.writeText(output.value);
//       displayFlashMessage('Text copied to clipboard!', 'info');
//     } catch (err) {
//       // Fallback for older browsers
//       output.select();
//       document.execCommand('copy');
//       displayFlashMessage('Text copied to clipboard!', 'info');
//     }
//   });

