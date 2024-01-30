import { UserPassword } from '@/domain/user/userPassword';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

export default async (mongoConnection) => {
  const currentTime = new Date();
  const collection = mongoConnection.collection('users');

  try {
    await collection.insertOne({
      "domainId": "a9979bf9-e6d8-49b3-9335-3e5370ccfa8a",
      "firstName": "John",
      "lastName": "Moore",
      "email": "john.moore@gmail.com",
      "password": await getPass("JohnMoore12345!"),
      "role": "60f91d08-942a-4241-b00f-ded525b5b74a",
      "createdAt": currentTime,
      "updatedAt": currentTime,
      "__v": 0});

    await collection.insertOne({
      "domainId": "907b37ea-de4d-4769-a0b3-7ec4427c4ee7",
      "firstName": "Francis",
      "lastName": "Wilson",
      "email": "francis.wilson@gmail.com",
      "password": await getPass("FrancisWilson12345!"),
      "role": "9617e6a7-36f3-485e-812f-a263c0560085",
      "createdAt": currentTime,
      "updatedAt": currentTime,
      "__v": 0});

    await collection.insertOne({
      "domainId": "ab7d7925-f2fa-48b7-b81d-e5d1c145f291",
      "firstName": "Stacy",
      "lastName": "Brandon",
      "email": "stacy.brandon@gmail.com",
      "password": await getPass("StacyBrandon12345!"),
      "role": "8cbc3121-1459-4863-ad6c-bb4af53bd9f9",
      "createdAt": currentTime,
      "updatedAt": currentTime,
      "__v": 0});

    console.info('[+] Users successfully bootstrapped');
  } catch (error) {
    console.error('[-] Could not bootstrap users');
  }

}

async function getPass(passw: string) {
  const salt = randomBytes(32);
  const hashedPassword = await argon2.hash(passw, { salt });
  const password = await UserPassword.create({ value: hashedPassword, hashed: true})
    .getValue();

  return password.props.value;
}
