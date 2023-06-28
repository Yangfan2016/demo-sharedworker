const pool = [];

onconnect = (ev) => {
  const port = ev.ports[0];
  const uid = Date.now();

  pool.push(port);
  port.onmessage = (ev) => {
    console.log("我是共享线程", uid, "收到了来自主线程的消息", ev.data);

    setTimeout(() => {
      pool.forEach((p) => {
        p.postMessage(`我来发个广播消息`);
      });
    }, 3e3);
  };

  port.postMessage(`我是共享线程 ${uid} 我来发个消息`);
};
