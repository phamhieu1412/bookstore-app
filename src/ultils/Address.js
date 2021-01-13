export const addressToText = (address, name, phone) => {
  const addressName = address.name || name;
  const addressPhone = address.phoneNumber || phone;
  const addressNP = [];
  if (addressName) addressNP.push(addressName);
  if (addressPhone) addressNP.push(addressPhone);

  return `${addressNP.join(' | ')}
  ${address.text}
  ${address.ward.name}, ${address.district.name}, ${address.city.name}`;
};
