import { getCustomRepository, getRepository, In } from 'typeorm';
import fs from 'fs';
import csvParse from 'csv-parse';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface TransactionCSV {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const readStream = fs.createReadStream(filePath);

    const parse = csvParse({ from_line: 2 });

    const parsedCSV = readStream.pipe(parse);

    const transactions: TransactionCSV[] = [];
    const categories: string[] = [];

    parsedCSV.on('data', async row => {
      const [title, type, value, category] = row.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parsedCSV.on('end', resolve));

    const categoriesExists = await categoryRepository.find({
      where: { title: In(categories) },
    });

    const categoriesExistsTitle = categoriesExists.map(
      (category: Category) => category.title,
    );

    const addCategoriesTitle = categories
      .filter(category => !categoriesExistsTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoryRepository.create(
      addCategoriesTitle.map(title => ({ title })),
    );

    await categoryRepository.save(newCategories);

    const endCategories = [...newCategories, ...categoriesExists];

    const addTransactions = transactionsRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        value: transaction.value,
        type: transaction.type,
        category: endCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    await transactionsRepository.save(addTransactions);

    await fs.promises.unlink(filePath);

    return addTransactions;
  }
}

export default ImportTransactionsService;
