import fs from 'fs';
import path from 'path';
const oldFileName = 'dist/main.css'
const newFileName = 'dist/styles.css'
export const renamePlugin = () => ({
    name: 'rename-plugin',
    setup(build) {

        build.onEnd((result) => {
            if (fs.existsSync(oldFileName)) {
                fs.renameSync(oldFileName, newFileName);
                console.log(`Renamed ${oldFileName} to ${newFileName}`);
            } else {
                console.warn(`File ${oldFileName} does not exist.`);
            }
        });
    },
});