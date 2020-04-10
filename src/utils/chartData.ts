import faker from 'faker';
import { times } from 'underscore';
import { BarChartData, GroupedBarChartData, LineChartData } from '../types/charts';

export const generateAgesData = (amount: number): BarChartData => {
  const data = new Array(amount).fill(null).map(() => {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.random.number({ min: 3, max: 35 })
    };
  });

  return data;
};

export const generateCompaniesData = (amount: number): GroupedBarChartData => {
  const data = new Array(amount).fill(null).map(() => {
    return {
      company: faker.company.companyName(),
      income: faker.random.number({ min: 120, max: 180 }),
      expenses: faker.random.number({ min: 120, max: 180 })
    };
  });

  return data;
};

export const generateCompaniesIncomeByYearData = (amount: number): LineChartData => {
  const data = new Array(amount).fill(null).map(() => {
    return {
      company: faker.company.companyName(),
      data: times(5, i => {
        return {
          year: new Date().getFullYear() - i,
          income: faker.random.number({ max: 300, min: 100 })
        };
      })
    };
  });

  return data;
};
