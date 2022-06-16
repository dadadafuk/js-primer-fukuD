const program = require("commander");
const fs = require("fs");
const md2html = require("./md2html");

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
program.parse(process.argv);
const filePath = program.args[0];

const cliOptions = {
  gfm: false,
  ...program.opts(),
};

// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
  if (err) {
    console.log(err);
    // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
    process.exit(1);
    return;
  }
  // md2htmlモジュールを使ってHTMLに変換する
  const html = md2html(file, cliOptions);
  console.log(html);
});
