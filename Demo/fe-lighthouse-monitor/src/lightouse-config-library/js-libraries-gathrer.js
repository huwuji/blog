/**
 * Lighthouse JsLibraries的搜集器
 * 源码https://github.com/GoogleChrome/lighthouse/blob/ecd10efc8230f6f772e672cd4b05e8fbc8a3112d/lighthouse-core/lib/stack-collector.js
 * 部分改动
 */

const fs = require("fs");
const libDetectorSource = fs.readFileSync(
  require.resolve("./libraries.js"),
  "utf8"
);

/** @typedef {false | {version: string|null}} JSLibraryDetectorTestResult */
/**
 * @typedef JSLibraryDetectorTest
 * @property {string} icon Essentially an id, useful if no npm name is detected.
 * @property {string} url
 * @property {string|null} npm npm module name, if applicable to library.
 * @property {function(Window): JSLibraryDetectorTestResult | Promise<JSLibraryDetectorTestResult>} test Returns false if library is not present, otherwise returns an object that contains the library version (set to null if the version is not detected).
 */

/**
 * @typedef JSLibrary
 * @property {string} name
 * @property {string} icon
 * @property {string|null} version
 * @property {string|null} npm
 */

/**
 * Obtains a list of detected JS libraries and their versions.
 */
/* istanbul ignore next */
async function detectLibraries() {
  /** @type {JSLibrary[]} */
  const libraries = [];

  // d41d8cd98f00b204e9800998ecf8427e_ is a consistent prefix used by the detect libraries
  // see https://github.com/HTTPArchive/httparchive/issues/77#issuecomment-291320900
  /** @type {Record<string, JSLibraryDetectorTest>} */
  // @ts-ignore - injected libDetectorSource var
  const libraryDetectorTests =
    d41d8cd98f00b204e9800998ecf8427e_LibraryDetectorTests; // eslint-disable-line

  for (const [name, lib] of Object.entries(libraryDetectorTests)) {
    try {
      const result = await lib.test(window);
      if (result) {
        libraries.push({
          name: name,
          icon: lib.icon,
          version: result.version,
          npm: lib.npm,
        });
      }
    } catch (e) {}
  }

  return libraries;
}

/**
 * @param {LH.Gatherer.PassContext} passContext
 * @return {Promise<LH.Artifacts['Stacks']>}
 */
async function collectStacks(passContext) {
  const expression = `(function () {
    ${libDetectorSource};
    return (${detectLibraries.toString()}());
  })()`;

  /** @type {JSLibrary[]} */
  const jsLibraries = await passContext.driver.evaluateAsync(expression);

  return jsLibraries.map((lib) => ({
    detector: /** @type {'js'} */ ("js"),
    id: lib.npm || lib.icon,
    name: lib.name,
    version: lib.version || undefined,
    npm: lib.npm || undefined,
  }));
}

module.exports = collectStacks;
