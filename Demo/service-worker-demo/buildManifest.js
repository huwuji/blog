const fs = require("fs");
const { getManifest } = require("workbox-build");

const getManifestCache = async () => {
  const { count, manifestEntries, size, warnings } = await getManifest({
    globDirectory: "./static",
    globPatterns: ["*.png", "*.js"],
    // globPatterns: ['static/**.js', 'static/**.png'],
    maximumFileSizeToCacheInBytes: 1024 * 1024 * 10,
  });

  console.log("manifestEntries==", count, manifestEntries);

  const writeStream = fs.createWriteStream("./manifest.json");
  writeStream.on("finish", () => {
    console.log("write manifest finish");
  });

  writeStream.on("error", (e) => {
    console.log("write manifest error", e);
  });
  writeStream.write(`
  ${JSON.stringify(manifestEntries)}
  `);

  writeStream.end();
  await setPreManifest(JSON.stringify(manifestEntries));
};

/**
 * 往sw.js中填入预缓存数据
 */
const setPreManifest = (manifest) => {
  return new Promise(() => {
    const readSt = fs.createReadStream("./sw-temp.js");
    var stream = "";
    readSt.on("data", function (chunk) {
      // console.log(`Received ${chunk} bytes of data.`);
      stream += chunk;
    });
    readSt.on("end", function () {
      console.log(`end`);
      stream = `
      const __manifest__= ${manifest};
      ${stream}
      `;
      fs.writeFileSync("./sw.js", stream);
    });
  }).catch((e) => {
    console.log("error==", e);
  });
};

getManifestCache().then();
