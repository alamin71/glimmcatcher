import { Server, createServer } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
// import initializeSocketIO from './socketIo';
let server: Server;
// export const io = initializeSocketIO(createServer(app));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // server = app.listen(Number(config.port), config.ip as string, () => {
    //   console.log(`app is listening on port ${config.port}`);
    // });

    // for both local and Render
    const port = Number(config.port) || 5000;

    if (config.NODE_ENV === 'production') {
      server = app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
      });
    } else {
      server = app.listen(port, config.ip as string, () => {
        console.log(`App is listening on ${config.ip}:${port}`);
      });
    }

    // io.listen(Number(config.socket_port));
    console.log(`Socket is listening on port ${config.socket_port}`);
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
