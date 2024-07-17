import { ChannelCredentials } from '@grpc/grpc-js';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
import { GRCP_AUTH_URL } from '../config/grcp';
import { AuthService } from './auth.service';

function getChannelCredentials(): ChannelCredentials {
  const rootCert = fs.readFileSync(
    path.resolve(__dirname, '../../certs/ca-cert.pem'),
  );
  // If you use CA root certificate
  // const channelCredentials = ChannelCredentials.createSsl();

  // If you use Self-Signed root certificate you need to provide it
  const channelCredentials = ChannelCredentials.createSsl(rootCert);

  return channelCredentials;
}

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: GRCP_AUTH_URL,
          package: 'auth',
          protoPath: join(__dirname, 'auth.proto'),
          // credentials: getChannelCredentials(),
        },
      },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
