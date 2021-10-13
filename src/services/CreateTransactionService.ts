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

    if (type != 'income' && type != 'outcome') {
      throw Error('This transaction type is invalid');
    }

    const appointment = this.transactionsRepository.create({ title, type, value });

    return appointment;
  }
}

export default CreateTransactionService;
