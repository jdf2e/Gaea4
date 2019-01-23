const fs = require("fs");
const { resolve } = require("path");
const htmlMinifier = require("html-minifier");
const chalk = require("chalk");

const createBundleRenderer = require("vue-server-renderer").createBundleRenderer;

const renderer = createBundleRenderer(resolve(__dirname, "./skeleton.json"), {
    template: fs.readFileSync(resolve(__dirname, "./index.html"), "utf-8")
});

renderer.renderToString({}, (err, html) => {
    html = htmlMinifier.minify(html, {
        collapseInlineTagWhitespace: true,
        minifyCSS: true
    });
    fs.writeFileSync(resolve(__dirname, "../../src/index.html"), html, "utf-8");
    console.log(chalk.green("骨架屏注入html成功!"));
    if (err) {
        console.log(chalk.red("骨架屏注入html失败：" + err));
    }
});
