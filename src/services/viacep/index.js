import Zipcode from "../../utils/zipcode";

const BASE_URL = (cep) => `https://viacep.com.br/ws/${cep}/json/`;

class ViaCep {
  static async getByCep(cep) {
    if (!Zipcode.isValid(cep)) {
      throw Error("CEP inválido!");
    }

    const url = BASE_URL(cep);

    return fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        throw new Error(
          "Não foi possível encontrar o endereço. Por favor, tente novamente utilizando outro CEP.",
        );
      });
  }
}

export default ViaCep;
