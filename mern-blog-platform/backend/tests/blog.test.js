const request = require('supertest');
const { app, connectDB } = require('../index');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  await connectDB();
});

afterAll(async () => {
  // Clean up
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Blog API', () => {
  it('GET /api/blogs should return an empty array initially', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/blogs should create a blog', async () => {
    const newBlog = { title: 'Test Blog', content: 'Test Content' };
    const res = await request(app).post('/api/blogs').send(newBlog);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newBlog.title);
    expect(res.body.content).toBe(newBlog.content);
  });
});