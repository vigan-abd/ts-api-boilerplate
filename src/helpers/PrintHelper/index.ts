// THESE LIBS ARE USED ONLY FOR COLOR PRINTING

export const debug = function (msg: any) {
  console.log("\x1b[35m%s\x1b[0m", `DEBUG >>> ${typeof (msg) == "object" ? JSON.stringify(msg) : msg}`);
};

export const success = function (msg: any) {
  console.log("\x1b[32m%s\x1b[0m", `SUCCESS >>> ${typeof (msg) == "object" ? JSON.stringify(msg) : msg}`);
};

export const error = function (msg: any) {
  console.log("\x1b[31m%s\x1b[0m", `ERROR >>> ${typeof (msg) == "object" ? JSON.stringify(msg) : msg}`);
};