import sharp from "sharp";

const input = "public/images/raampjes/2l.png";
const output = "public/images/raampjes/2l-klein.png";

const result = await sharp(input)
  .trim({
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    threshold: 0,
  })
  .png()
  .toBuffer({ resolveWithObject: true });

await sharp(result.data).toFile(output);

console.log(
  "Origineel:",
  (await sharp(input).metadata()).width,
  "x",
  (await sharp(input).metadata()).height,
);
console.log("Nieuw:", result.info.width, "x", result.info.height);
console.log(
  "Linkerbovenhoek:",
  result.info.trimOffsetLeft,
  result.info.trimOffsetTop,
);
console.log("Klaar:", output);
