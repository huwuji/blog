/**
 * Lighthouse JsLibrariesAudit
 * 源码 https://github.com/GoogleChrome/lighthouse/blob/ecd10efc8230f6f772e672cd4b05e8fbc8a3112d/lighthouse-core/audits/dobetterweb/js-libraries.js
 */
const Audit = require("lighthouse").Audit; // 引入 lighthouse 的标准审查器

class JsLibrariesAudit extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "js-libraries",
      title: "Detected JavaScript libraries",
      description: "All front-end JavaScript libraries detected on the page.",
      requiredArtifacts: ["Stacks"],
    };
  }

  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit(artifacts) {
    const libDetails = artifacts.Stacks.filter(
      (stack) => stack.detector === "js"
    ).map((stack) => ({
      name: stack.name,
      version: stack.version,
      npm: stack.npm,
    }));

    /** @type {LH.Audit.Details.Table['headings']} */
    const headings = [
      { key: "name", itemType: "text", text: "Name" },
      { key: "version", itemType: "text", text: "Version" },
    ];
    const details = Audit.makeTableDetails(headings, libDetails, {});

    return {
      score: 1, // Always pass for now.
      details,
    };
  }
}

module.exports = JsLibrariesAudit;
