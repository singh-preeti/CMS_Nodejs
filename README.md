# Node.js async patterns demo (app.js)

This repository contains a small learning/demo script, `app.js`, that illustrates common Node.js synchronous and asynchronous patterns and how they affect program flow and the event loop.

How to run

```bash
node app.js
```

What `app.js` shows

- Step 1: simple synchronous console logs (immediate, blocking the main thread).
- Step 2: commented example of blocking I/O using `fs.readFileSync`.
- Steps 3–4: callback-style non-blocking I/O with and without basic error handling.
- Steps 5–6: Promise-based and `async`/`await` examples for cleaner asynchronous code.
- Steps 7–9: a callback-hell example, then improved versions using promise-chaining and `async`/`await`.
- Step 10: a short event-loop demo showing ordering of `process.nextTick`, Promise microtasks, timers, and `setImmediate`.

Files used

- `app.js` — the teaching script with multiple commented examples. The currently-active code prints a short synchronous demonstration to the console.
- `evidence.txt` — example input referenced by the commented examples (used by the file-read demos).

Expected output

Running `node app.js` prints the short synchronous messages shown at the top of the file. To experiment with other examples, uncomment the relevant block(s) inside `app.js` and re-run the script.

Notes

- The file is intended for learning and experimenting with Node.js control flow — there is no web server in this repository unless you add one.
- If you want, I can expand this README with step-by-step exercise instructions or add npm scripts to run specific examples.
