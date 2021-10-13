import { Router } from 'express';

import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

const transactionsRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionsRouter.get('/', (request, response) => {
  const transactions = transactionsRepository.all();
  const balance = transactionsRepository.getBalance();

  return response.json({
    transactions,
    balance
  });
});

transactionsRouter.post('/', (request, response) => {
  try {
    const { title, type, value } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transactions = createTransaction.execute({ title, type, value });

    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export default transactionsRouter;
