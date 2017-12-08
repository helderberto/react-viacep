class ViaCep {
  static getByCep(cep) {
    const urlViaCEP = ViaCep.createUrl(cep);

    return fetch(urlViaCEP, {
      method: 'GET'
    })
      .then(res => res.json())
      .catch(err => {
        console.error(err);
        throw new Error('Não foi possível encontrar o endereço. Por favor, tente novamente utilizando outro CEP.');
      });
  }

  static createUrl(cep) {
    if (cep) {
      return `https://viacep.com.br/ws/${cep}/json/`;
    }
    throw new Error('CEP deve ser informado!');
  }
}

export default ViaCep;