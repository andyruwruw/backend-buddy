// Packages
import express, { Application } from 'express';

// Local Imports
import { Monitor } from './helpers/monitor';
import BlockchainRoutes from './endpoints/blockchain';
import ContractRoutes from './endpoints/contract';
import CreatorRoutes from './endpoints/creator';
import EarningsRoutes from './endpoints/earnings';
import GameRoutes from './endpoints/game';
import GameplayScreenshotRoutes from './endpoints/gameplay-screenshot';
import GenreRoutes from './endpoints/genre';
import NFTRoutes from './endpoints/nft';
import PlatformRoutes from './endpoints/platform';
import TokenRoutes from './endpoints/token';
import VideoRoutes from './endpoints/video';

/**
 * Wrapper class for Express server.
 */
export class Server {
  /**
   * Express Application instance.
   */
  _app: Application;

  /**
   * Desired server port.
   */
  _port: number;

  constructor(port: number) {
    this._app = express();
    this._port = port;

    this.setup();
  }

  setup(): void {
    this._app.use('/api/blockchain', BlockchainRoutes);
    this._app.use('/api/contract', ContractRoutes);
    this._app.use('/api/creator', CreatorRoutes);
    this._app.use('/api/earnings', EarningsRoutes);
    this._app.use('/api/game', GameRoutes);
    this._app.use('/api/gameplay-screenshot', GameplayScreenshotRoutes);
    this._app.use('/api/genre', GenreRoutes);
    this._app.use('/api/nft', NFTRoutes);
    this._app.use('/api/platform', PlatformRoutes);
    this._app.use('/api/token', TokenRoutes);
    this._app.use('/api/video', VideoRoutes);
  }

  /**
   * Starts the server.
   */
  start(): void {
    this._app.listen(this._port, () => {
      Monitor.log(
        Server,
        `Server started on port ${this._port}.`,
        Monitor.Layer.UPDATE,
      );
    });
  }
}