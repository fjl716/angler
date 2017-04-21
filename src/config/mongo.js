export default [
  {
    "_id" : "58ec70f3097808014511046e",
    "container" : "58ec76b30978080145110474",
    "name" : "default",
    "host" : "localhost",
    "port" : 27017,
    "database" : "cloudroom",
    "collections" : [
      {
        "name" : "calendar",
        "init" : {
          "_id" : "t:newid"
        },
        "simple" : [
          "_id",
          "name"
        ]
      },
      {
        "name" : "user",
        "init" : {
          "_id" : "t:newid"
        },
        "simple" : [
          "_id",
          "name",
          "age"
        ]
      },
      {
        "name" : "sidebar",
        "init" : {
          "_id" : "t:newid"
        },
        "simple" : [
          "_id",
          "name"
        ],
        "link" : {

        }
      },
      {
        "name" : "role",
        "init" : {
          "_id" : "t:newid"
        },
        "simple" : [
          "_id",
          "name"
        ],
        "link" : {

        }
      }
    ]
  }
]