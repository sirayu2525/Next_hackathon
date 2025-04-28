// xhr.js
function sendxhr(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', "/todo");
    xhr.onload = () => {
        console.log("Receive response");
        console.log(xhr.responseText);
    };
    xhr.send();
    console.log("Send request");
}

// コールバック関数の簡単な例

function add(a, b, callback) {
    const result = a + b;
    console.log("計算結果: " + result);
    callback();
  }
  
function afterAdd() {
console.log("計算が終わりました！");
}
  
add(3, 5, afterAdd);
  
// ヒント：　データが来たらどう処理するかを先に渡しておく（＝コールバック）
function getData(callback) {
    setTimeout(() => {
      const data = "データ取得完了";
      callback(data); // データをコールバックで返す
    }, 1000);
  }
  
getData((result) => {
console.log(result); // ← 「データ取得完了」が表示される
});

// コールバック関数
// → 複雑になると「コールバック地獄」に…
// → 解決のために Promise が登場！
// → Promiseでもまだ読みづらいので、async/await が登場！

// 超簡易Promise
//function example(callback) {
//   callback(); // ← こうやってあとで実行する
// }  これに基づいてます
function myPromise(fn) { 
  let onSuccess;
  let onFail;

  const obj = { //オブジェクトリテラル
    then(callback) { // then: function(callback) {　の省略形
      onSuccess = callback;
      return obj;
    },
    catch(callback) {
      onFail = callback;
      return obj;
    }
  };

  fn(
    (result) => onSuccess && onSuccess(result),
    (error) => onFail && onFail(error)
  );

  return obj;
}

// 使用例
myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功したよ！"); // const resolve = (result) => onSuccess && onSuccess(result);
    // reject("失敗した…");
  }, 1000);
}).then(result => {
  console.log("then:", result);
}).catch(err => {
  console.log("catch:", err);
});

// 詳しいSPAにおける画面遷移方式の発展の歴史⇒https://blog.jxck.io/entries/2022-04-22/navigation-api.html
