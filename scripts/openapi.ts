import yaml from "yaml";
import fs from "fs";
import { getAppAndDoc } from "../backend/main";

async function main() {
  const outputFile = process.argv[process.argv.length - 1];

  const [app, doc] = await getAppAndDoc();

  const yamlString: string = yaml.stringify(doc, {});
  fs.writeFileSync(outputFile, yamlString);

  await app.close();
  process.exit(0);
}

main();
