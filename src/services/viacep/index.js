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

  static isValidZipcode = (zipcode) => {
    return (/^[0-9]{5}-[0-9]{3}$/.test(zipcode));
  }

  static maskZipcode = (zipcode, hyphen = '-') => {
    const zipcodeStart = ViaCep.cropZipcode(zipcode, 0, zipcode.length-3);
    const zipcodeEnd = ViaCep.cropZipcode(zipcode, zipcode.length-3, zipcode.length);
    let maskedZipcode = zipcode;

    if (!ViaCep.hasHyphen(zipcode)) {
      maskedZipcode = `${zipcodeStart}${hyphen}${zipcodeEnd}`;
    }
    return maskedZipcode;
  }

  static hasHyphen = (zipcode, hyphen = '-') => {
    return (zipcode.indexOf(hyphen) === -1 ? false : true);
  }

  static cropZipcode = (zipcode, start, end) => {
    return zipcode.substring(start, end);
  }
}

export default ViaCep;