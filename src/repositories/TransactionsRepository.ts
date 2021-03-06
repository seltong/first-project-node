import Transaction from '../models/transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Array<Transaction>;

  constructor() {
    this.transactions = [];
  }

  public all(): Array<Transaction> {
    return this.transactions;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);
    return transaction;
  }

  public getBalance(): Balance {

    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value
            break;
          case 'outcome':
            accumulator.outcome += transaction.value
            break;
          default:
            break;
        }
        return accumulator;
      }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    const total = income - outcome;

    return {
      income,
      outcome,
      total
    };
  }
}

export default TransactionsRepository;
