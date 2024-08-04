export const maskCNPJ = (cnpj: string): string => {

  cnpj = cnpj.replace(/\D/g, '').substring(0, 14);

  cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/(\d{3})(\d)/, '$1/$2');
  cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');

  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export const maskCEP = (cep: string): string => {

  cep = cep.replace(/\D/g, '').substring(0, 8);

  cep = cep.replace(/(\d{5})(\d)/, '$1-$2');

  return cep;
}

export const maskPhone = (phone: string): string => {

  phone = phone.replace(/\D/g, '').substring(0, 11);

  if (phone.length > 10) {
    return phone.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return phone.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');

}