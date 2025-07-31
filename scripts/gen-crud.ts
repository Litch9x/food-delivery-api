import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';

const entities = [
  'users',
  'foods',
  'restaurants',
  'orders',
  'order-items',
  'addresses',
  'payments',
  'reviews',
];

const log = (msg: string) => console.log(`✅ ${msg}`);

for (const name of entities) {
  const folder = `src/${name}`;
  if (!existsSync(folder)) {
    mkdirSync(folder);
    log(`Tạo folder: ${folder}`);
  }

  // Tạo module
  execSync(`nest g module ${name}`, { stdio: 'inherit' });

  // Tạo service
  execSync(`nest g service ${name}`, { stdio: 'inherit' });

  // Tạo controller
  execSync(`nest g controller ${name} --no-spec`, { stdio: 'inherit' });

  log(`Đã tạo CRUD files cho: ${name}`);
}
