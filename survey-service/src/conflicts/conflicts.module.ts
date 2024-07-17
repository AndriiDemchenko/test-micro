import { ChannelCredentials } from '@grpc/grpc-js';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
import { GRCP_CONFLICT_URL } from '../config/grcp';
import { ConflictService } from './conflicts.service';

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
        name: 'CONFLICT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: GRCP_CONFLICT_URL,
          package: 'conflict',
          protoPath: join(__dirname, 'conflicts.proto'),
          // credentials: getChannelCredentials(),
        },
      },
    ]),
  ],
  providers: [ConflictService],
  exports: [ConflictService],
})
export class ConflictModule {}
