const test = new Angler();
test.event(require('./events/meter'));
const slang = new Slang({
  port: 8888,
  host: 'localhost',
  protocol: {
    types: {
      address: 'c:6'                      //定义地址类型为6个字节,类型名为address
    },
    parse: [
      '68',                               //开头为常量0x68
      {len: 'b'},                         //名称为len的变量，为一个字节
      {c: 'b'},                           //名称为c的变量，为一个字节
      {address: 'address'},               //名称为address变量为address类型（在type中自定义）
      '68',                               //常量0x68
      {count: 'b'},                       //名称为count的变量，为一个字节
      {
        '$count': 'count',                 //循环内容块，循环次数为变量count的数值
        router: [
          {'address': 'address'}
        ]
      },                                  //循环内容块内容为，address类型为address
      {
        '$case': {c: 1},                   //分支条件为，满足变量c==1
        data: [{'address': 'address'}]
      }, //满足条件后的结构为address
      '68',                               //常量0x16
    ]
  }
});
const bytes = [
  0x68,
  0x2,
  0x1,
  0x11, 0x22, 0x33, 0x44, 0x55, 0x66,
  0x68,
  0x2,
  0x11, 0x22, 0x33, 0x44, 0x55, 0x66,
  0x66, 0x55, 0x44, 0x33, 0x22, 0x11,
];
slang.protocol.parse(
  bytes
);