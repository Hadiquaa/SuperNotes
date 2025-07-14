import fs, { readFileSync, writeFileSync } from 'fs';
import path, { join } from 'path';

const filePath = join(process.cwd(), 'data', 'notes.json');

export const loadNotes = () => {
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

export const saveNotes = (notes) => {
    writeFileSync(filePath, JSON.stringify(notes, null, 2));
}