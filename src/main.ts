import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as serveStatic from 'serve-static';
import { renderFile } from 'ejs';
import * as path from "path";
import * as fs from "fs";
import helmet from 'helmet';
import { TransformInterceptor } from '@/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { SpecialExceptionFilter } from '@/filters/special-exception.filter';
import { UnknownExceptionFilter } from './filters/unknown.filter';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AppModule } from './app.module';
import * as packageJson from '../package.json';
import cfg from '../config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  // 开启跨域支持
  app.enableCors({
    origin: [/.com/],
    credentials: true,
  });

  // 【中间件】- 全局注册
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.text({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  // 服务端ejs模板渲染
  app.use('/public', serveStatic(path.join(__dirname, 'public'), {}));
  app.setBaseViewsDir(path.join(__dirname, 'views'));
  app.engine('html', renderFile);
  app.setViewEngine('ejs');

  // 【拦截器】- 全局注册
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ErrorInterceptor(new Reflector()),
  );

  // 【管道】- 全局注册
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  // 【异常过滤器】- 全局注册
  app.useGlobalFilters(
    new UnknownExceptionFilter(),
    new HttpExceptionFilter(),
    new SpecialExceptionFilter(),
  )

  // swagger
  const options = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync(path.join(__dirname, 'public/doc/swagger.json'), JSON.stringify(document));
  SwaggerModule.setup('swagger', app, document);

  // 7009
  await app.listen(cfg.app.port);
}
bootstrap();
