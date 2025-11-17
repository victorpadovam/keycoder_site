

function verificaPermissao() {
const referrerURL = document.referrer;

function getDomain(url) {
    try {
        // Cria um objeto URL
        const urlObj = new URL(url);
        // Retorna o hostname sem o "www."
        return urlObj.hostname.replace('www.', '');
    } catch (error) {
        console.error('Invalid URL:', url);
        return '';
    }
}

const referrerDomain = getDomain(referrerURL);

function getDomainName(domain) {
    // Tratar casos de localhost
    if (domain === 'localhost' || domain === '127.0.0.1') {
        return 'localhost';
    }
    const parts = domain.split('.');
    return parts.length > 1 ? parts[parts.length - 2] : parts[0];
}

const domainName = getDomainName(referrerDomain);

console.log('Domain Name:', domainName);

  // Verifica se a URL de referência é de keycoder, localhost ou está vazio
  // ele retorna qdo é  a localhost
  if (domainName === 'keycoder' ||  domainName === '') {
      console.log('Usuario nao autorizado autenticado para acesso')
      Swal.fire({
        text: 'Produto exclusivo disponível apenas na plataforma para assinantes.',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
  }  else {
        console.log('Usuario autenticado para acesso')
        window.location.href = 'https://coodesh.com/auth/signup/users';
    } 
}

