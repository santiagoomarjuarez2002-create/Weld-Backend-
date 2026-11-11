import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/modules/App/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hola Programacion');
  });

  it.each([
    ['/productos', 'Esto muestra los productos'],
    ['/pedidos', 'Esto muestra los pedidos'],
    ['/usuarios', 'Esto muestra los usuarios'],
    ['/auth', 'Esto muestra las autenticaciones'],
  ])('mantiene disponible GET %s al agrupar los módulos', (path, body) => {
    return request(app.getHttpServer()).get(path).expect(200).expect(body);
  });

  it('elimina las rutas de imagenes-producto', async () => {
    await request(app.getHttpServer()).get('/imagenes-producto').expect(404);
    await request(app.getHttpServer())
      .post('/imagenes-producto')
      .send({})
      .expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
