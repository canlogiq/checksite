## TODO

- [ ] Favicon
- [ ] JSON-LD
- [ ] LLM.txt
- [ ] ROBOT.txt


## Script Explanations

- `dev` 
    - Runs the website
    
- `build`
    - Deletes .next folder
    - Build the website (using "standalone" output)
      This will create a folder in `./.next/standalone` for ready-to-deploy production code

    - Copy static files from .next/static to the standalone folder.
      This is done because standalone folder doesn't include static files.

    - Copy the standalone folder back to ./bin
      This is done because (afaik) npx/pnpx only read the bin files.

- `test`
    - Build the project (npm run build)
    - Transpile the index.ts into index.js
    - Run the index.js file

- Before publishing (prepublishOnly), it will:
    - Build the project
    - Transpile the index.ts

## Difference in Development modes

1.  `npm run dev` - to only try the website
2.  `npm run test` - to try the finished build + script
3.  `npx check-site-meta` - to try the published build

## How to Make the NPX Runnable

1.  In package.json, add `"bin": { "<command-name>": "<location>" }`
    
    In this case, `"check-site-meta": "./bin/check-site-meta.js"`

2.  Add the shebang `#!/usr/bin/env node` 

