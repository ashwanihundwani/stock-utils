export const budgetingData = [
  {id: 'bud2', name: 'Budgeting 2'},
  {id: 'bud3', name: 'Budgeting 3'},
  {id: 'bud4', name: 'Budgeting 4'},
  {id: 'bud5', name: 'Budgeting 5'},
];

export const transactionDetailsData = {
  transactionDetails: {
    transactionType: 'POS transaction',
    account: 'OnePack Account ···3462',
    currency: 'SAR',
    exchangeRate: '1.00',
    exchangeRateCurrency: '1.00 SAR',
    referenceNumber: '2270 0001 000 0080',
    remainingBalance: '2,150,520.20 SAR',
    budgeting: 'Shopping',
  },
  accountFrom: {
    account: 'OnePack Account ···3462',
    currency: 'SAR',
    exchangeRate: '1.00',
  },
  beneficiaryDetails: {
    beneficiaryBank: 'Al Rajhi Bank',
    accountNumber: '···9940',
  },
  transactionSummary: {
    transactionType: 'Outgoing Instant Payment',
    fees: '0.00 SAR',
    vat: '0.00 SAR',
    referenceNumber: '2270 0001 000 0080',
    channel: 'Online Banking',
    purpose: 'Online Banking',
    remainingBalance: '2,150,520.20 SAR',
  },
  billPaymentDetails: {
    billCategory: 'Telecom',
    billingAccountNumber: '05226541480',
    billerID: '001',
  },
};

export const breakWord = (inputWord: string) => {
  if (!inputWord) return '';
  const words = inputWord.split(/(?=[A-Z])/);
  const capitalizeWords = words.map((word, index) =>
    index === 0
      ? word.charAt(0).toUpperCase() + word.slice(1)
      : word.charAt(0).toLowerCase() + word.slice(1),
  );
  return capitalizeWords.join(' ');
};
