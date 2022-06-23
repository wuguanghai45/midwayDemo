// import { initAppDataSource } from '../../src/data-source';
import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';


describe('test/controller/user.test.ts', () => {
  let app: Application;
  beforeAll(async () => {
    try {
      app = await createApp<Framework>();
    } catch(err) {
        console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });

  it('should POST /api/user/login success', async () => {
    // create app
    // make request
    let isTimeOut = false;
    setTimeout(()=> {
      expect(isTimeOut).toBe(false);
    }, 1000);
    const result = await createHttpRequest(app).post('/api/user/login')
      .send({
      username: "jack",
      password: "redballoon",
    });
    isTimeOut = true;

    // use expect by jest
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.message).toBe('登录成功');
    expect(result.body.data.token).not.toBe(null);
  });

  it('should POST /api/user/login fail with error username or password', async () => {
    // create app
    // make request
    let isTimeOut = false;
    setTimeout(()=> {
      expect(isTimeOut).toBe(false);
    }, 1000);
    const result = await createHttpRequest(app).post('/api/user/login')
      .send({
      username: "jack11",
      password: "redballoon",
    });
    isTimeOut = true;

    expect(result.body.code).toBe(400);
    expect(result.body.result).toBe('error');
    expect(result.body.message).toBe('账号或密码不正确');
    expect(result.body.data).toBe(null);
  });

  it('should POST /api/user/login fail with empty username', async () => {
    // create app
    // make request
    const result = await createHttpRequest(app).post('/api/user/login')
      .send({
      username: "",
      password: "redballoon",
    });

    expect(result.status).toBe(422);
  });

  it('should POST /api/user/login fail with empty password', async () => {
    // create app
    // make request
    const result = await createHttpRequest(app).post('/api/user/login')
      .send({
      username: "jack",
      password: "",
    });

    expect(result.status).toBe(422);
  });
});
