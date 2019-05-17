export const loans = [
    {
        id: 1,
        email: 'user1@quickcredit.com',
        createdOn: Date.now(),
        status: 'pending',
        repaid: false,
        tenor: 4,
        amount: 20000,
        paymentInstallment: 2000,
        balance: 18000,
        interest: '5%',
    },

    {
        id: 2,
        email: 'user2@quickcredit.com',
        createdOn: Date.now(),
        status: 'Unverified',
        repaid: true,
        tenor: 3000,
        amount: 3,
        paymentInstallment: 2,
        balance: 0,
        interest: '5%',
    }
];

export const repayments = [
    {
        id: 2,
        createdOn: Date.now(),
        loanId: 1,
        amount: 20000,
    },
    {
        id: 2,
        createdOn: Date.now(),
        loanId: 3,
        amount: 20000,
    },
];

export default { loans, repayments };
