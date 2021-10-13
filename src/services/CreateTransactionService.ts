import TransactionsRepository from "../repositories/TransactionsRepository"

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionRepository: TransactionsRepository) {
    this.transactionsRepository = transactionRepository;
  }

  public execute({ title, type, value }: Request) {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Transaction type is invalid');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type == 'outcome' && total < value) {
      throw Error('You do not have enough balance');
    }

    const transaction = this.transactionsRepository.create({ title, type, value });

    return transaction;
  }
}

export default CreateTransactionService;
