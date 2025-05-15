console.log('dev js laoded')
const originalLog = console.log;
console.log = function (...args) {
  originalLog.apply(console, args);
  window.postMessage({type: 'log', message: args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ')})
};
const originalWarn = console.warn;
console.warn = function (...args) {
  originalWarn.apply(console, args);
  window.postMessage({type: 'warn', message: args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ')})
};
const originalError = console.error;
console.error = function (...args) {
  originalError.apply(console, args);
  window.postMessage({type: 'error', message: args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ')})
};