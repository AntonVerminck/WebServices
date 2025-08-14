import supertest from 'supertest'; // 👈 1
import createServer from '../../src/createServer'; // 👈 1
import type { Server } from '../../src/createServer'; // 👈 3
import { prisma } from '../../src/data';
import withServer from '../helpers/withServer'; // 👈 2
import { login, loginAdmin} from '../helpers/login'; // 👈 3
const data = {
  films: [
    {
      id: 1,
      titel:'Superman',
      regiseur: 'James Gunn',
    },
    {
      id: 2,
      titel:'The Prestige',
      regiseur: 'C. Nolan',
    },
    {
      id: 3,
      titel:'The Gaurdians of the Galaxy',
      regiseur: 'James Gunn',
    },
  ],
  reviews: [
    {
      id: 1,
      review_titel: 'Een',
      review_content: 'Twee',
      film_id: 3,
      rating: 4,
      user_id: 1,

    },
    {
      id: 2,
      review_titel: 'Niets',
      review_content: 'Nadda',
      film_id: 1,
      rating: 1,
      user_id: 2,

    },
  ],
};

const dataToDelete = {
  films: [1, 2, 3],
  reviews: [1,2],
};

// 👇 2

describe('Review', () => {
  // 👇 3
  let server: Server;
  let request: supertest.Agent;
  let authHeader: string;
  let adminHeader: string;
  withServer((r) => (request = r));
  
  // 👇 4
  beforeAll(async () => {
    server = await createServer(); // 👈 5
    request = supertest(server.getApp().callback()); // 👈 6
    authHeader = await login(request);
    adminHeader = await loginAdmin(request);
  });
  
  // 👇 7
  afterAll(async () => {
    await server.stop();
  });
  
  const url = '/api/reviews'; // 👈 8
    
  describe('GET /api/reviews', () => {
    beforeAll(async () => {
      await prisma.film.createMany({ data: data.films });
      await prisma.review.createMany({ data: data.reviews });
    });
  
    afterAll(async () => {

      await prisma.review.deleteMany({
        where: { id: { in: dataToDelete.reviews } },
      });
      await prisma.film.deleteMany({
        where: { id: { in: dataToDelete.films } },
      });
     
    });
    it('should 200 and return all films', async () => {
      const response = await request.get(url).set('Authorization', adminHeader);
      console.log(response.body);
      expect(response.status).toBe(200); 
    });
    it('should 200 and return all films', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      console.log(response.body);
      expect(response.status).toBe(200); 
    });

  });
});
