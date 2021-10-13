import Transaction from '../models/transaction';

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

  public balance() {
    let { income, outcome } = this.findIncomeOutcome();

    let incomeValue = 0;

    if (income.length > 0) {
      incomeValue = income.reduce((p, c) => {
        p.value += c.value;
        return p;
      }).value;
    }

    let outcomeValue = 0;

    if (outcome.length > 0) {
      outcomeValue = outcome.reduce((p, c) => {
        p.value += c.value;
        return p;
      }).value;
    }

    let total = incomeValue - outcomeValue;

    const balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total
    };

    return balance;
  }

  private findIncomeOutcome() {
    let income: Array<Transaction> = []
    let outcome: Array<Transaction> = []

    this.transactions.forEach((t) => t.type == 'income' ? income = [...income, t] : outcome = [...outcome, t]);

    return {
      income,
      outcome
    };
  }

}

export default TransactionsRepository;
