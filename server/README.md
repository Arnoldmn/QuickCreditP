[![Build Status](https://travis-ci.com/Mumbere7/quickCredit.svg?branch=master)](https://travis-ci.com/Mumbere7/quickCredit)
[![Coverage Status](https://coveralls.io/repos/github/Mumbere7/quickCredit/badge.svg?branch=develop)](https://coveralls.io/github/Mumbere7/quickCredit?branch=develop)

# QuikCredit

Loan lending web application for andela bootcamp test 
This application should allow user to borrow money from our services at an affordable fee that is competitive Users of the said applocation should be able to repay their loans a given period of time.

## Getting started 
Get QuickCredit  project running on your PC you just need to clone this repository, and make sure you have Latest Version of NodeJS Installed. by doing as follows

1. git clone repoURL

After installing you have to run the following npm(node package manager) commands to get the system up and running.
// initialize required node modules
 - npm run init
 // run the server in developer mode
 - npm run dev-start
// run the server in production mode
- npm run start

## Testing the poject

// running test
npm run test

## API Documentation

### POST /auth/signup
this endpoint is used to signup the user
{
    "email" : "admink@quicredit.com",
    "firstName" : "Admin"
    "lastName" : "Doe",
    "passwprd" : "johnDoe",
    "address" : "Kampala",
    "status" : "Approved",
    "isAdmin" : false",
}
### POST /auth/signin
this endpoint is used to signin the user
{
    "email" : "admink@quickcredit.com",
    "password" : "doeJohn"
}

### POST /users:token=token
this endpoint is used to create a new user, example token: 45erkjherht45495783

## GET /loans
This endpoint is used to get all loans in the database
{
        id: 1,
        "email": "user1@quickcredit.com",
        "createdOn": "12-05-2018",
        "status": "pending",
        "repaid": false,
        "tenor": 30,
        "amount": 20000,
        "paymentInstallment": 2000,
        "balance": 18000,
        "interest": 5%,
}
## POST /loans
this endpoint is used to apply for any given loan by any user
{
        id: 1,
        "email": "user1@quickcredit.com",
        "createdOn": "12-05-2018",
        "status": "pending",
        "repaid": false,
        "tenor": 30,
        "amount": 20000,
        "paymentInstallment": 2000,
        "balance": 18000,
        "interest": 5%,
}
## PATCH /loans/:ID
this endpoint is used to manipulate a loan request

## GET /loans/unpaid/:id
this endpoint is used to get all unpaid loans from the user
## GET /loans/repayment
This endpoint is used to retrieve all loans that have either been fully [aid or not]
