import {test} from 'tape';

import trelloActions from './fixtures/trello-actions';

import {
  sumNumberOfCards,
  consolidateContent,
  consolidateActions,
  parseActions
} from '../app/models/trello';

test( 'sumNumberOfCards', ( assert ) => {
  const result = sumNumberOfCards( [
    { numberOfCards: 1 },
    { list: 'Backlog', numberOfCards: 3 },
    { numberOfCards: 4 },
    { total: 4 },
    { numberOfCards: 0 },
    { numberOfCards: 1 }
  ] );

  assert.equals( result, 9, 'should sum all numberOfCards from collection' );
  assert.end();
} );

test( 'consolidateContent', ( assert ) => {
  const expected = [
    { list: 'Icebox Énergie', numberOfCards: 3 },
    { list: 'Backlog', numberOfCards: 8 }
  ];
  const result = consolidateContent( [
    { list: 'Icebox Énergie', numberOfCards: 1 },
    { list: 'Backlog', numberOfCards: 3 },
    { list: 'Backlog', numberOfCards: 4 },
    { list: 'Icebox Énergie', numberOfCards: 2 },
    { list: 'Backlog', numberOfCards: 1 }
  ] );

  assert.looseEquals( result, expected, 'should regroup contents by list, summing numberOfCards' );
  assert.end();
} );

test( 'consolidateActions', ( assert ) => {
  const expected = [
    {
      date: "2016-01-20",
      content: [
        { list: "Backlog", numberOfCards: 7 },
        { list: "Icebox Énergie", numberOfCards: 2 },
        { list: "Card Preparation [2]", numberOfCards: 4 }
      ]
    },
    {
      date: "2016-02-04",
      content: [
        { list: "Backlog", numberOfCards: 7 },
        { list: "Icebox Énergie", numberOfCards: 2 },
        { list: "Card Preparation [2]", numberOfCards: 3 }
      ]
    },
    {
      date: "2016-02-08",
      content: [
        { list: "Backlog", numberOfCards: 9 },
        { list: "Icebox Énergie", numberOfCards: 1 },
        { list: "Card Preparation [2]", numberOfCards: 1 }
      ]
    },
    {
      date: "2016-03-02",
      content: [
        { list: "Backlog", numberOfCards: 8 },
        { list: "Icebox Énergie", numberOfCards: 1 },
        { list: "Card Preparation [2]", numberOfCards: 1 }
      ]
    },
    {
      date: "2016-03-03",
      content: [
        { list: "Backlog", numberOfCards: 10 },
        { list: "Icebox Énergie", numberOfCards: 1 },
        { list: "Card Preparation [2]", numberOfCards: 0 }
      ]
    }
  ];
  const result = consolidateActions(
    [
      { list: "Backlog", numberOfCards: 10 },
      { list: "Icebox Énergie", numberOfCards: 1 },
      { list: "Card Preparation [2]", numberOfCards: 0 }
    ],
    [
      {
        date: "2016-02-08",
        content: [ { list: "Backlog", numberOfCards: 1 } ]
      },
      {
        date: "2016-03-03",
        content: [
          { list: "Backlog", numberOfCards: 1 },
          { list: "Icebox Énergie", numberOfCards: 1 }
        ]
      },
      {
        date: "2016-03-03",
        content: [
          { list: "Backlog", numberOfCards: -2 }
        ]
      },
      {
        date: "2016-03-02",
        content: [
          { list: "Backlog", numberOfCards: -2 },
          { list: "Card Preparation [2]", numberOfCards: -1 }
        ]
      },
      {
        date: "2016-03-02",
        content: [
          { list: "Card Preparation [2]", numberOfCards: 2 }
        ]
      },
      {
        date: "2016-01-20",
        content: [
          { list: "Card Preparation [2]", numberOfCards: 1 }
        ]
      },
      {
        date: "2016-02-04",
        content: [
          { list: "Icebox Énergie", numberOfCards: 1 },
          { list: "Card Preparation [2]", numberOfCards: 2 }
        ]
      },
      {
        date: "2016-02-04",
        content: [ { list: "Backlog", numberOfCards: -2 } ]
      }
    ] );

  assert.looseEquals( result, expected, 'should correctly consolidate the number of created cards' );
  assert.end();
} );

test( 'parseActions', ( assert ) => {
  const expected = [
    {
      date: "2016-02-22",
      content: [
        { list: "Icebox", numberOfCards: 34 },
        { list: "Icebox Énergie", numberOfCards: 5 },
        { list: "Backlog", numberOfCards: 8 },
        { list: "Card Preparation [2]", numberOfCards: 1 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-02-25",
      content: [
        { list: "Icebox", numberOfCards: 35 },
        { list: "Icebox Énergie", numberOfCards: 5 },
        { list: "Backlog", numberOfCards: 8 },
        { list: "Card Preparation [2]", numberOfCards: 2 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-03-02",
      content: [
        { list: "Icebox", numberOfCards: 35 },
        { list: "Icebox Énergie", numberOfCards: 5 },
        { list: "Backlog", numberOfCards: 9 },
        { list: "Card Preparation [2]", numberOfCards: 2 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-03-06",
      content: [
        { list: "Icebox", numberOfCards: 36 },
        { list: "Icebox Énergie", numberOfCards: 5 },
        { list: "Backlog", numberOfCards: 10 },
        { list: "Card Preparation [2]", numberOfCards: 2 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-03-07",
      content: [
        { list: "Icebox", numberOfCards: 36 },
        { list: "Icebox Énergie", numberOfCards: 5 },
        { list: "Backlog", numberOfCards: 11 },
        { list: "Card Preparation [2]", numberOfCards: 2 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-03-12",
      content: [
        { list: "Icebox", numberOfCards: 35 },
        { list: "Icebox Énergie", numberOfCards: 5 },
        { list: "Backlog", numberOfCards: 11 },
        { list: "Card Preparation [2]", numberOfCards: 3 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-03-13",
      content: [
        { list: "Icebox", numberOfCards: 35 },
        { list: "Icebox Énergie", numberOfCards: 5 },
        { list: "Backlog", numberOfCards: 11 },
        { list: "Card Preparation [2]", numberOfCards: 4 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-03-23",
      content: [
        { list: "Icebox", numberOfCards: 35 },
        { list: "Icebox Énergie", numberOfCards: 5 },
        { list: "Backlog", numberOfCards: 11 },
        { list: "Card Preparation [2]", numberOfCards: 2 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-03-24",
      content: [
        { list: "Icebox", numberOfCards: 35 },
        { list: "Icebox Énergie", numberOfCards: 6 },
        { list: "Backlog", numberOfCards: 11 },
        { list: "Card Preparation [2]", numberOfCards: 2 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-03-27",
      content: [
        { list: "Icebox", numberOfCards: 35 },
        { list: "Icebox Énergie", numberOfCards: 6 },
        { list: "Backlog", numberOfCards: 10 },
        { list: "Card Preparation [2]", numberOfCards: 2 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-04-06",
      content: [
        { list: "Icebox", numberOfCards: 35 },
        { list: "Icebox Énergie", numberOfCards: 6 },
        { list: "Backlog", numberOfCards: 9 },
        { list: "Card Preparation [2]", numberOfCards: 2 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    },
    {
      date: "2016-04-10",
      content: [
        { list: "Icebox", numberOfCards: 35 },
        { list: "Icebox Énergie", numberOfCards: 6 },
        { list: "Backlog", numberOfCards: 10 },
        { list: "Card Preparation [2]", numberOfCards: 2 },
        { list: "Production [3]", numberOfCards: 0 }
      ]
    }
  ];
  const currentStatus = [
    { list: "Icebox", numberOfCards: 35 },
    { list: "Icebox Énergie", numberOfCards: 6 },
    { list: "Backlog", numberOfCards: 10 },
    { list: "Card Preparation [2]", numberOfCards: 2 },
    { list: "Production [3]", numberOfCards: 0 }
  ];

  assert.looseEquals( parseActions( currentStatus, trelloActions ), expected, 'should correctly parse Trello actions' );
  assert.looseEquals( parseActions( currentStatus )( trelloActions ), expected, 'should be curried' );
  assert.end();
} );
