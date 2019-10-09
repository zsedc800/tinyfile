import fs from 'fs';
import { resolve } from 'path';
import { shell } from 'electron';
import tinify from 'tinify';

export function isDir(path: string): Promise<any> {
  path = resolve(path);
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) reject(err);
      else resolve(stat.isDirectory());
    });
  });
}

const apiKey = 'mjd7ZM9Xgpylngpjf6kPqzJ84ZyVRXp2';

export function compress(src: string, dist: string): Promise<any> {
  tinify.key = apiKey;
  return Promise.resolve(tinify.fromFile(src).toFile(dist)).then(() => {
    return fs.statSync(dist).size;
  });
}

export function showItemInFolder(path: string) {
  shell.showItemInFolder(path);
}
