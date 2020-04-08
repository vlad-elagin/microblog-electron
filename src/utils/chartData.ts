import faker from 'faker';
import { BarChartData, GroupedBarChartData } from '../types/charts';

export const generateAgesData = (amount: number): BarChartData => {
  const data = new Array(amount).fill(null).map(() => {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.random.number({ min: 3, max: 35 })
    };
  });

  return data;
};

export const generateAgeHeightData = (amount: number): GroupedBarChartData => {
  const data = new Array(amount).fill(null).map(() => {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.random.number({ min: 15, max: 100 }),
      height: faker.random.number({ min: 120, max: 180 })
    };
  });

  return data;
};
