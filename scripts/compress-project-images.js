import fs from "fs";
import path from "path";
import sharp from "sharp";

const folder = path.join(__dirname, "../public/projects");

async function compress() {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const filePath = path.join(folder, file);
    const ext = path.extname(file).toLowerCase();

    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const original = fs.statSync(filePath).size;

    await sharp(filePath)
      .resize({ width: 1400 }) // reduce huge images
      .jpeg({ quality: 80 }) // safe compression
      .toBuffer()
      .then((data) => fs.writeFileSync(filePath, data));

    const compressed = fs.statSync(filePath).size;

    console.log(
      `${file}: ${(original / 1024).toFixed(2)}KB → ${(compressed / 1024).toFixed(2)}KB`,
    );
  }

  console.log("✅ Compression complete");
}

compress();
