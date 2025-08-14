import supertest from 'supertest'; // 👈 1
import createServer from '../../src/createServer'; // 👈 1
import type { Server } from '../../src/createServer'; // 👈 3
import { prisma } from '../../src/data';
import withServer from '../helpers/withServer'; // 👈 2
import { login, loginAdmin } from '../helpers/login'; // 👈 3
import testAuthHeader from '../helpers/testAuthHeader';
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
  ],
};

const dataToDelete = {
  films: [1, 2, 3],
  reviews: [1],
};

// 👇 2
describe('Films', () => {
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

  const url = '/api/films'; // 👈 8
  
  describe('GET /api/films', () => {
    beforeAll(async () => {
      await prisma.film.createMany({ data: data.films });
    });

    afterAll(async () => {
      await prisma.film.deleteMany({
        where: { id: { in: dataToDelete.films } },
      });
   
    });
    it('should 200 and return all films', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200); // 👈 4
    });
    
    testAuthHeader(() => request.get(url));
  });

  describe('GET /api/films/:id', () => {
      
    beforeAll(async () => {
      await prisma.film.createMany({ data: data.films });
    });

    afterAll(async () => {
      await prisma.film.deleteMany({
        where: { id: { in: dataToDelete.films }},
      });
    });

    it('should 200 and return the first movie', async () => {
      const response = await request.get(`${url}/1`).set('Authorization', authHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        titel:'Superman',
        regiseur: 'James Gunn',
      });
    });

    it('should 200 and return the 2nd movie', async () => {
      const response = await request.get(`${url}/2`).set('Authorization', authHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        titel:'The Prestige',
        regiseur: 'C. Nolan',
      });
    });
  });

  describe('POST /api/films', () => {

    afterAll(async () => {
      await prisma.film.deleteMany({
        where: {
          titel: 'Shrek 1',
        },
      });
    });

    it('should 200 and return the registered user', async () => {
      const response = await request.post(url)
        .send({
          titel: 'Shrek 1', 
          regiseur: 'iemand',
        })
        .set('Authorization', adminHeader);
      console.log('Response body:', response.body);  
      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.titel).toBe('Shrek 1');
      expect(response.body.regiseur).toBe('iemand');
    });

    testAuthHeader(() => request.post(url));
  });

  describe('DELETE /api/films/:id', () => {

    beforeAll(async () => {
      await prisma.film.createMany({ data: data.films });
    });

    afterAll(async () => {
    // Clean up any remaining films
      await prisma.film.deleteMany({
        where: { id: { in: dataToDelete.films } },
      });
    });

    it('should 204 to delete the film', async () => {
      const response = await request
        .delete(`${url}/1`)
        .set('Authorization', adminHeader);

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 400 if user has no rights to delete movie', async () => {
      const response = await request
        .delete(`${url}/2`)
        .set('Authorization', authHeader); 
      expect(response.statusCode).toBe(403);
    });

  });

  describe('PUT /api/films/:id', () => {
    beforeAll(async () => {
      await prisma.film.createMany({ data: data.films });
    });

    afterAll(async () => {
    // Clean up any remaining films
      await prisma.film.deleteMany({
        where: { id: { in: dataToDelete.films } },
      });
    });

    it('should 200 and return the updated user', async () => {
      const response = await request.put(`${url}/2`)
        .send({
          titel: 'The Prestige',
          regiseur: 'Christoffer Nolan',
        })
        .set('Authorization', adminHeader);
      console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: 2,
        titel: 'The Prestige',
        regiseur: 'Christoffer Nolan',
      });
    });

    it('should 403 when not an admin', async () => {
      const response = await request.put(`${url}/2`)
        .send({
          titel: 'test titel',
          regiseur: 'regiseur',
 
        })
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(403);
    });
  });

  describe('GET /api/films/:id/reviews', () => {
    beforeAll(async () => {
      await prisma.film.createMany({ data: data.films });
      await prisma.review.createMany({ data: data.reviews});
    });

    afterAll(async () => {
      await prisma.review.deleteMany({
        where: { id: { in: dataToDelete.reviews } },
      });
      await prisma.film.deleteMany({
        where: { id: { in: dataToDelete.films } },
      });
    });

    it('should 200 and return the review', async () => {
      const response = await request.get(`${url}/3/reviews`)
        .set('Authorization', adminHeader);
      console.log(response.body);
      expect(response.statusCode).toBe(200);
    });

  });
});
