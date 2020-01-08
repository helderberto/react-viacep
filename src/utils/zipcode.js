const ZIPCODE_SIZE = 8;

export default class Zipcode {
  static size = ZIPCODE_SIZE;

  static isValid = value => (/^[0-9]{8}$/.test(value));

  static crop = (value, start, end) => {
    return value.substring(start, end);
  }

  static hasHyphen = (value, hyphen = '-') => {
    return (value.indexOf(hyphen) === -1 ? false : true);
  }

  static mask = (value, hyphen = '-') => {
    const zipcodeStart = Zipcode.crop(value, 0, value.length-3);
    const zipcodeEnd = Zipcode.crop(value, value.length-3, value.length);

    let maskedZipcode = value;

    if (!Zipcode.hasHyphen(value)) {
      maskedZipcode = `${zipcodeStart}${hyphen}${zipcodeEnd}`;
    }
    return maskedZipcode;
  }
}
