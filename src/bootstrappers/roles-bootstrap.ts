export default async (mongoConnection) => {

  try {
    const collection = mongoConnection.collection('roles');

    await collection.insertOne({
      domainId: "60f91d08-942a-4241-b00f-ded525b5b74a",
      name: "ADMIN",
      __v: 0
    });

    await collection.insertOne({
      domainId: "9617e6a7-36f3-485e-812f-a263c0560085",
      name: "USER",
      __v: 0
    });

    await collection.insertOne({
      domainId: "8cbc3121-1459-4863-ad6c-bb4af53bd9f9",
      name: "MANAGER",
      __v: 0
    });


    console.info('[+] Roles successfully bootstrapped');
  } catch (err) {
    console.error('[-] Could not bootstrap roles');
  }

}
