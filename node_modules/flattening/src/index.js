module.exports = function run(obj, k = '', rr = {}) {
  const prefix = k ? `${k}.` : '';
  if(Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      run(obj[i], `${prefix}${i}`, rr);
    }
  } else if(typeof obj === 'object' && obj !== null) {
    for (let key in obj) {
      const k = key.includes('.')? `"${key}"` : key;
      run(obj[key], `${prefix}${k}`, rr);
    }
  } else {
    rr[k] = obj;
  }
  return rr;
};
