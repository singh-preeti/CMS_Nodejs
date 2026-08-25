// #step 1
        // console.log("Forensic Investigation Started");

        // console.log("Reading evidence...");

        // console.log("Evidence processing completed");

        // console.log("Investigation Finished");

// step 2 blocking code

        // const fs = require("fs");

        // console.log("1. Investigation Started");

        // const data = fs.readFileSync("evidence.txt");

        // console.log("2. Evidence Reading is done");

        // console.log("3. Investigation Finished");

// step 3 non-blocking code

        // const fs = require("fs");
        // console.log("1. Investigation Started");
        // fs.readFile("evidence.txt", "utf8", (err, data) => {

        //     console.log("2. Evidence Read");

        // });
        // console.log("3. Investigation Finished");

// step 4 non-blocking code with error handling
            // const fs = require("fs");
            // console.log("1. Investigation Started");
            // fs.readFile("evidence.java", "utf8", (err, data) => {
            //     if (err) {
            //         console.error("Error reading evidence:", err);
            //     } else {
            //         console.log("2. Evidence Read");
            //         console.log(data);
            //     }
            // });
            
            // console.log("3. Investigation Finished");

// step 5 non-blocking code with promises
                // const fs = require("fs").promises;
                // console.log("1. Investigation Started");        
                //     fs.readFile("evidence.txt", "utf8")
                //         .then((data) => {
                //             console.log("2. Evidence Read");                
                //             console.log(data);
                //         })
                //         .catch((err) => {
                //             console.error("Error reading evidence:", err);
                //         });
                // console.log("3. Investigation Finished");   

// step 6 non-blocking code with async/await
                // const fs = require("fs").promises;
                // const investigate = async () => {
                //     try {// risky operation
                //         console.log("1. Investigation Started");        
                //         const data = await fs.readFile("evidence.txt", "utf8");
                //         console.log("2. Evidence Read");                
                //         console.log(data);
                //     }
                //     catch (err) {
                //         console.error("Error reading evidence:", err);
                //     } 
                //     console.log("3. Investigation Finished"); 
                // }
                // investigate();

// step 7 callback hell example
                // const fs = require("fs");
                // console.log("1. Investigation Started");
                   
                // // Define helper functions (callback-style) to avoid undefined errors
                //     function readEvidence(path, callback) {
                //         fs.readFile(path, "utf8", callback);
                //     }

                //     function analyzeEvidence(data, callback) {
                //         // Simulate async analysis
                //         setTimeout(() => {
                //             const result = { summary: (data || "").slice(0, 200) };
                //             callback(null, result);
                //         }, 150);
                //     }

                //     function generateReport(result, callback) {
                //         // Simulate report generation
                //         setTimeout(() => {
                //             const report = `Report: ${result && result.summary ? result.summary : "<no data>"}`;
                //             callback(null, report);
                //         }, 100);
                //     }

                //     readEvidence("evidence.txt", (err, data) => {
                //     if (err) {
                //         console.error("Error reading evidence:", err);  
                //     } else {
                //         console.log("2. Evidence Read");    
                //     }       
                //     analyzeEvidence(data, (err, result) => {
                //         if (err) {
                //             console.error("Error analyzing evidence:", err);
                //         } else {
                //             console.log("3. Evidence Analyzed");
                //         } 
                //         generateReport(result, (err, report) => {
                //             if (err) {
                //                 console.error("Error generating report:", err); 
                //             } else {
                //                 console.log("4. Report Generated");
                //                                 console.log(report);
                //             }   
                //             console.log("5. Investigation Finished");
                //         });
                //     });
                //     });

    // step 8: Promise-chaining example (avoids callback hell)
                    // const fsPromises = require("fs").promises;

                    // function analyzeEvidenceAsync(data) {
                    //     return new Promise((resolve) => {
                    //         setTimeout(() => resolve({ summary: (data || "").slice(0, 200) }), 150);
                    //     });
                    // }

                    // function generateReportAsync(result) {
                    //     return new Promise((resolve) => {
                    //         setTimeout(() => resolve(`Report: ${result && result.summary ? result.summary : "<no data>"}`), 100);
                    //     });
                    // }

                    // console.log('\n-- Step 8: Promise chaining --');

                    // fsPromises.readFile("evidence.txt", "utf8")
                    //     .then((data) => {
                    //         console.log("2. Evidence Read (promise)");
                    //         return analyzeEvidenceAsync(data);
                    //     })
                    //     .then((result) => {
                    //         console.log("3. Evidence Analyzed (promise)");
                    //         return generateReportAsync(result);
                    //     })
                    //     .then((report) => {
                    //         console.log("4. Report Generated (promise)");
                    //         console.log(report);
                    //     })
                    //     .catch((err) => {
                    //         console.error("Error in promise chain:", err);
                    //     })
                    //     .finally(() => {
                    //         console.log("5. Investigation Finished (promise)");
                    //     });
   // step 9: async/await example (cleaner syntax)
   
            // const fs = require('fs').promises;

            // async function analyzeEvidenceAsync(data) {
            //   return new Promise((resolve) =>
            //     setTimeout(() => resolve({ summary: (data || '').slice(0, 200) }), 150)
            //   );
            // }

            // async function generateReportAsync(result) {
            //   return new Promise((resolve) =>
            //     setTimeout(() => resolve(`Report: ${result && result.summary ? result.summary : '<no data>'}`), 100)
            //   );
            // }

            // async function investigate() {
            //   try {
                
            //     console.log('1. Investigation Started (async/await)');

            //     const data = await fs.readFile('evidence.txt', 'utf8');
            //     console.log('2. Evidence Read (async/await)');

            //     const analysis = await analyzeEvidenceAsync(data);
            //     console.log('3. Evidence Analyzed (async/await)');

            //     const report = await generateReportAsync(analysis);
            //     console.log('4. Report Generated (async/await)');
            //     console.log(report);
            //   } catch (err) {
            //     console.error('Error during investigation (async/await):', err);
            //   } finally {
            //     console.log('5. Investigation Finished (async/await)');
            //   }
            // }

            // investigate();

// step 10: event loop 

    // Standalone Event Loop Demo
    // Explains ordering of various async callbacks relative to the event loop.
                function eventLoopDemo() {
                    console.log('\n-- Standalone Event Loop Demo --');
                    console.log('sync start');

                    // nextTick runs before Promise microtasks
                    process.nextTick(() => console.log('process.nextTick callback'));

                    // Promise microtasks run after nextTick but before timers/macrotasks
                    Promise.resolve().then(() => console.log('Promise microtask '));

                    // Timers (setTimeout 0) run in the timers phase
                    setTimeout(() => console.log('setTimeout 0 (timers phase)'), 0);

                    // setImmediate runs in the check phase (after poll)
                    setImmediate(() => console.log('setImmediate (check phase)'));

                    console.log('sync end');
                }

                eventLoopDemo();