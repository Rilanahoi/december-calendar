import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const inputFolder = "public/images/raampjes";
const outputFolder = "public/images/raampjes-klein";

await fs.mkdir(outputFolder, { recursive: true });

const files = (await fs.readdir(inputFolder)).filter((file) =>
  /^\d+(l|r)?\.png$/i.test(file),
);

const metadata = {};

for (const file of files) {
  const input = path.join(inputFolder, file);
  const output = path.join(outputFolder, file);

  const result = await sharp(input)
    .trim({
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      threshold: 0,
    })
    .png()
    .toBuffer({ resolveWithObject: true });

  await fs.writeFile(output, result.data);

  metadata[file] = {
    left: -result.info.trimOffsetLeft,
    top: -result.info.trimOffsetTop,
    width: result.info.width,
    height: result.info.height,
    originalWidth: 1800,
    originalHeight: 3600,
  };

  console.log(file, "→", result.info.width, "x", result.info.height);
}

await fs.writeFile(
  path.join(outputFolder, "metadata.json"),
  JSON.stringify(metadata, null, 2),
);

console.log("Klaar! Alle raampjes zijn verwerkt.");
