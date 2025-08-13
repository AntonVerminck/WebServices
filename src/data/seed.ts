// src/data/seed.ts
import { PrismaClient } from '@prisma/client'; 
import Role from '../core/roles';
const prisma = new PrismaClient(); 
import { hashPassword } from '../core/password';

// 👇 2
async function main() {
  // Seed users
  // ==========
  const passwordHash = await hashPassword('12345678');
  await prisma.user.createMany({
    data: [
       {
        id: 1,
        voornaam: 'Anton',
        achternaam: 'Verminck',
        email: 'anton@email.be',
        password_hash: passwordHash,
        roles: JSON.stringify([Role.ADMIN, Role.USER]),
      },
      {
        id: 2,
        voornaam: 'Tom',
        achternaam: 'Aat',
        email: 'tom@email.be',
        password_hash: passwordHash,
        roles: JSON.stringify([Role.USER]),

      },
    
     
    ],
  });

  // Seed films
  // ===========
  await prisma.film.createMany({
    data: [
      {
        id: 1,
        titel: 'Superman',
        regiseur: 'J. Gunn'
      },
      {
        id: 2,
        titel: 'Gauradians of the Galaxy',
        regiseur: 'j. Gunn'

      },
    ],
  });

  // Seed userfilm
  // =================
  await prisma.review.createMany({
    data: [
      // User Thomas
      // ===========
      {
        id: 1,
        user_id: 1,
        film_id: 1,
        rating: 5,
        review_titel: "Kan beter",
        review_content: "Deze fim was een tegenslag"
      },
    ],
    });
  await prisma.screening.createMany({
    data: [
      {
        id: 1,
        film_id: 1,
        naam: "Kinepolis Gent",
        huisnummer: 8,
        straat: "Ter Platen",
        postcode: 9000,
        datum: new Date("2025-01-01")
      },
 
    ],
  });
}

// 👇 3
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });