export default [
  {
    "_id" : "58ec70f3097808014511046e",
    "container" : "58ec76b30978080145110474",
    "name" : "default",
    "host" : "192.168.1.13",
    "port" : 27017,
    "database" : "cloudroom",
    "collections" : [
      {
        "name" : "calendar",
        "init" : [
          {key:"_id" ,
            value:"t:newid"}
],
        "simple" : [
          "_id",
          "name"
        ]
      },
      {
        "name" : "user",
        "init" : [
          {key:"_id" ,
            value:"t:newid"}
        ],
        "simple" : [
          "_id",
          "name",
          "age"
        ]
      },
      {
        "name" : "sidebar",
        "init" : [
          {key:"_id" ,
            value:"t:newid"}
        ],
        "simple" : [
          "_id",
          "name"
        ],
        "link" : {

        }
      },
      {
        "name" : "role",
        "init" : [
          {key:"_id" ,
            value:"t:newid"}
        ],
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