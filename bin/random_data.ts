 let accountNames: string[] = [
    'Sherazi',
    'John',
    'Doe',
    'Jane',
    'Doe',
    'Sherlock',
    'Holmes',
    'Mycroft',
    'Holmes',
    'Dr.',
    'Watson',
    'Moriarty',
    'Irene',
    'Adler',
    'Mary',
    'Morstan',
    'Mrs.',
    'Hudson',
    'Inspector',
    'Lestrade'
];
 let accountNumbers: string[] = [
    '123456789',
    '987654321',
    '111111111',
    '222222222',
    '333333333',
    '444444444',
    '555555555',
    '666666666',
    '777777777',
    '888888888',
    '999999999',
    '000000000'
];

export function generateRandomData() {
    let randomName = accountNames[Math.floor(Math.random() * accountNames.length)];
    let randomNumber = accountNumbers[Math.floor(Math.random() * accountNumbers.length)];
    let randomAmount = Math.floor(Math.random() * 100000);
    return { randomName, randomNumber ,randomAmount};
}