export const validatePhone = (phone: string) => {
    const regex = /^\((?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/;
    return regex.test(phone);
};

export const validateCPF = (cpf: string) => {
    const regex = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/;
    return regex.test(cpf);
};
