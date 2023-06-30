// Packages
import {
  Request,
  Response,
  Router,
} from 'express';

// Local Imports
import CreateBlockchain from '../handlers/blockchain/create-blockchain';
import DeleteBlockchain from '../handlers/blockchain/delete-blockchain';
import EditBlockchain from '../handlers/blockchain/edit-blockchain';
import GetBlockchain from '../handlers/blockchain/get-blockchain';
import GetBlockchainGames from '../handlers/blockchain/get-blockchain-games';

const router = Router();

router.post('/create', async (req: Request, res: Response) => {
  await CreateBlockchain.execute(req, res);
});

router.delete('/delete', async (req: Request, res: Response) => {
  await DeleteBlockchain.execute(req, res);
});

router.put('/edit', async (req: Request, res: Response) => {
  await EditBlockchain.execute(req, res);
});

router.get('/get', async (req: Request, res: Response) => {
  await GetBlockchain.execute(req, res);
});

router.get('/get-games', async (req: Request, res: Response) => {
  await GetBlockchainGames.execute(req, res);
});

export default router;