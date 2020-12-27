import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';

const app = new Koa();
const router = new Router();


router.get('/', async (ctx) => {
    ctx.body = 'working';
})

app.use(cors()).use(router.routes()).use(router.allowedMethods());

export default app;