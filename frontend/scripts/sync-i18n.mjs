import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = path.resolve(__dirname, '..');
const propertiesDir = path.join(frontendRoot, 'public', 'i18n');
const generatedPath = path.join(frontendRoot, 'src', 'app', 'i18n', 'messages.generated.ts');
const languages = ['it', 'en'];

function parseProperties(content) {
  const result = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || line.startsWith('!')) {
      continue;
    }

    const separatorIndex = line.search(/[:=]/);
    if (separatorIndex < 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    result[key] = value;
  }

  return result;
}

function toGeneratedModule(messagesByLanguage) {
  const languageBlocks = languages.map((language) => {
    const entries = Object.entries(messagesByLanguage[language])
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, value]) => `    ${JSON.stringify(key)}: ${JSON.stringify(value)}`)
      .join(',\n');

    return `  ${language}: {\n${entries}\n  }`;
  }).join(',\n');

  return `/* AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. */\nexport const messages = {\n${languageBlocks}\n} as const;\n`;
}

const messagesByLanguage = {};

for (const language of languages) {
  const propertiesPath = path.join(propertiesDir, `messages_${language}.properties`);
  const propertiesContent = await fs.readFile(propertiesPath, 'utf8');
  messagesByLanguage[language] = parseProperties(propertiesContent);
}

await fs.writeFile(generatedPath, toGeneratedModule(messagesByLanguage), 'utf8');
console.log('i18n synchronized from properties.');