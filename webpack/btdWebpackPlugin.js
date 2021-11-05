const path = require('path');
const fs = require('fs');
module.exports = {
  apply: (compiler) => {
    let initialClean = false;
    let initialMove = false;
    // Remove dist folder before 1st compilation.
    compiler.hooks.afterEnvironment.tap('BTDPlugin', () => {
      if (initialClean) {
        return;
      }
      try {
        fs.rmSync(path.join(process.cwd(), '/dist/'), {recursive: true, force: true});
        initialClean = true;
      } catch (e) {
        console.error(e);
      }
    });
    // Move some files around after compilation is done.
    compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
      if (initialMove) {
        return;
      }
      fs.renameSync(
        path.join(process.cwd(), '/dist/build/manifest.json'),
        path.join(process.cwd(), '/dist/manifest.json')
      );
      fs.renameSync(
        path.join(process.cwd(), '/dist/build/_locales'),
        path.join(process.cwd(), '/dist/_locales')
      );
      initialMove = true;
    });
  },
};
