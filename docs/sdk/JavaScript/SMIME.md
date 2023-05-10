---
title: S/MIME
tags:
  - s/mime
  - email
---

本篇文章介绍使用 `js-sdk` 与 wekey 桌面客户端进行交互，进行 S/MIME 签名验签，加解密过程。请提前安装好 WeKey 桌面客户端。

### 初始化客户端

1、创建客户端

```javascript
// wekey客户端监听地址
const socketAddr = "localhost:8878";
// 配对数字回调
function onShowDigit(digit) {
  alert(digit);
}
// 创建client
const cli = new WeKeySMIME(socketAddr, onShowDigit);
```

2、初始化

```javascript
// 设置配对操作回调
cli.onHideDigit = (paired) => {
  if (paird) {
    console.log("配对成功");
  } else {
    console.log("配对失败");
  }
};
// 设置在离线回调
cli.onAliveStatus = (online) => {
  if (online) {
    console.log("连接成功");
  } else {
    console.log("连接失败");
  }
};
// 进行初始化
cli
  .init()
  .then(() => {
    // 一些逻辑处理
  })
  .catch((err) => {
    console.log(err);
  });
```

3、测试连通性

```javascript
// 尝试最简单的API：Echo
const echo = await cli.echoEvent({ msg: "Hello world!" });
// 判断是否出错
if (echo.error) {
  alert(echo.error);
  return;
}
console.log(echo);
```

### 签名邮件

签名邮件支持：文本内容+附件形式

1、获取可签名证书列表

```javascript
// 通过过滤字段获取证书列表，toSign为发送者邮件地址，不填则获取所有可签名证书
const sender = "test@example.com"；
const certList = await cli.certListEvent({ toSign: sender });
// 是否出错
if (certList.error) {
    alert(certList.error);
    return;
}
console.log("certList=", certList);
```

2、选择一张证书签名邮件

```javascript
// 从证书列表选择一张证书进行签名
const certHash: "72f9b46d8c362b832af7b86befa98fff4e702218";
// 正文内容，需要转位字节数组
const body = new TextEncoder().encode("这是正文内容");
// 可选附件
const attachments = [];

const result = awat cli.disposeEmailEvent({
    from: sender,
    certHash: certHash, // 仅签名使用
    body: body,
    attachments: attachments,
    tos: [],
})
if (result.error) {
    alert(result.error);
    return;
}
// 将邮件内容转为string进行显示
const decoder = new TextDecoder();
const body = decoder.decode(result.body);
console.log(body)
```

### 加密邮件

加密邮件支持：文本+附件形式

1、获取可加密证书列表

```javascript
// 通过过滤字段获取证书列表
const certList = await cli.certListEvent({ toEncrypt: true });
// 是否出错
if (certList.error) {
  alert(certList.error);
  return;
}
console.log("certList=", certList);
```

2、加密邮件

```javascript
// 这里客户端可提前判断收件人证书是否存在，当然服务器也会判断

// 收件人
const tos = ["test1@example.com", "test2@example.com"]
// 正文内容，需要转位字节数组
const body = new TextEncoder().encode("这是正文加密内容");
// 可选附件
const attachments = [];

const result = awat cli.disposeEmailEvent({
    from: sender,
    certHash: '',
    body: body,
    attachments: attachments,
    tos: tos, // 仅加密使用
})
if (result.error) {
    alert(result.error);
    return;
}
// 将邮件内容转为string进行显示
const decoder = new TextDecoder();
const body = decoder.decode(result.body);
console.log(body)
```

### 验证/解密邮件

验证/解密邮件需要使用原始邮件内容，复制是不行的，一般为 `eml` 格式。

```javascript
// 假设从文件读取文件
// html: <input type="file" id="file-input" />;

// 文件读取
const fileInput = document.getElementById("file-input");
let uint8Array;
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", (event) => {
    const fileContents = event.target.result;
    // 这里是文件内容，可以进行处理
    uint8Array = new Uint8Array(fileContents);
  });

  reader.readAsArrayBuffer(file);
});

// 验证/解密邮件内容
const recipient = "test1@example.com";
const info = await cli.emailInfoEvent({
  body: uint8Array,
  recipient: "", // 邮件接收者，即当前收到邮件的邮箱地址
});
// 错误信息，尽管邮件被签名或加密，邮件仍有被篡改或证书问题等错误
if (info.error) {
  console.log(info.error, info.reason);
}
// 是否签名
if (info.signed) {
  console.log("已签名");
}
// 是否加密
if (info.encrypted) {
  console.log("已加密");
}
// 签名或加密证书信息
console.log(info.cert);

// 查看原始或解密邮件
const decoder = new TextDecoder();
console.log(decoder.decode(info.body));
```
