import validateClient from './validateClient';

const validClient = {
    name: 'John',
    address: 'Pushkina str. 9',
    email: 'admin@google.com',
    phone: '+7 (900) 000-0000'
};

const invalidClient = {
    name: 'J',
    address: 'meow',
    email: 'admin-google.com',
    phone: '+7 (900) 000-000'
};

it('check validation with valid data / проверяем валидацию с валидными данными', function() {
    const validation = validateClient(validClient);
    expect(validation.name).toBe(false);
    expect(validation.address).toBe(false);
    expect(validation.email).toBe(false);
    expect(validation.phone).toBe(false);
});

it('check validation with invalid data / проверяем валидацию с невалидными данными', function() {
    const validation = validateClient(invalidClient);
    expect(validation.name).toBe('Name shall be 3 symbols or more');
    expect(validation.address).toBe('Address shall be 10 symbols or more');
    expect(validation.email).toBe('Please, provide a valid email');
    expect(validation.phone).toBe('Please, provide a valid phone');
});
