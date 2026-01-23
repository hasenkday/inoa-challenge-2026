import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from '../src/app.module'

describe('ContactController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/api/contact (POST) should create contact', async () => {
    const payload = {
      name: 'Test User',
      channel: 'E-mail',
      contact: 'test@example.com',
      message: 'Hello!',
    }

    const res = await request(app.getHttpServer()).post('/api/contact').send(payload).expect(201)

    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Test User')
    expect(res.body.data.dateSent).toBeDefined()
  })

  it('/api/contact (POST) should fail with invalid payload', async () => {
    const invalidPayload = {
      name: '', // invalid
      channel: 'E-mail',
      contact: 'test@example.com',
      message: 'Hello!',
      extraField: 'not allowed', // not allowed field
    }

    await request(app.getHttpServer()).post('/api/contact').send(invalidPayload).expect(400)
  })
})
