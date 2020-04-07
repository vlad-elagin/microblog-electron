import faker from 'faker';
import { BarChartData } from '../types/charts';

export const generateAgesData = (amount: number): BarChartData => {
  const data = new Array(amount).fill(null).map(() => {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.random.number(35)
    };
  });

  return data;
};
