import xml2js from 'xml2js'
const init = async ()=> {

  let xml = "<xml><ToUserName><![CDATA[toUser]]></ToUserName>" +
    "<FromUserName><![CDATA[fromUser]]></FromUserName>" +
    "<CreateTime>1348831860</CreateTime>" +
    "<MsgType><![CDATA[text]]></MsgType>" +
    "<Content><![CDATA[this is a test]]></Content>" +
    "<MsgId>1234567890123456</MsgId>" +
    "</xml>";
  let parser = new xml2js.Parser({ explicitArray : false, ignoreAttrs : true });
  parser.parseString(xml,function (err,result) {
    console.log(result.xml.ToUserName);
  });
    // let builder = new xml2js.Builder({
    //   rootName: 'xml',
    //   cdata: true
    // });
    // let x = builder.buildObject({
    //   a:{
    //     d:'asdf<>'
    //   }
    // });
    // console.log(x);
  // xml2js.parseString(xml, { explicitArray : false, ignoreAttrs : true }, function (err,result) {
  //   console.log(result.xml.ToUserName);
  //
  //   var obj = {};
  //   obj.code = 'FAIL';

  //   var xml = builder.buildObject(result);
  //   console.log(xml);
  // });
  //
  // parser.parseString(xml,function(err,result){
  //
  //
  //   //Extract the value from the data element
  //   //extractedData = result['data'];
  // });

  //初始化数据库
  require('./dbconf').init();

  //初始化websocket
  require('./websocket/conf').init();

  //初始化socket
  require('./socket/conf').init();
};

let result = init();
