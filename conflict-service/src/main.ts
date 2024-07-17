import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';
import * as fs from 'fs';
import * as path from 'path';
import { ServerCredentials } from '@grpc/grpc-js';
import { PORT } from './config/server';
import { GRCP_URL } from './config/grcp';

function getServerCredentials(): ServerCredentials {
  const serverCert = fs.readFileSync(
    path.resolve(__dirname, '../certs/server-cert.pem'),
  );
  const serverKey = fs.readFileSync(
    path.resolve(__dirname, '../certs/server-key.pem'),
  );

  const serverCredentials = ServerCredentials.createSsl(
    null,
    [
      {
        cert_chain: serverCert,
        private_key: serverKey,
      },
    ],
    false,
  );

  return serverCredentials;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      // TODO: use url from ENV
      url: GRCP_URL,
      package: ['conflict'],
      protoPath: [join(__dirname, 'conflicts/conflicts.proto')],
      // credentials: getServerCredentials(),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(PORT);
}
bootstrap();
