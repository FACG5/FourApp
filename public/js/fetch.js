// The incoming result should be a json with two proparities; the first should be the error
// in case an error happened on the server getting the data, the second is the actual result
// in the form of an object or Array

const request = (method, url, data, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        if (result.err) {
          cb(result.err);
        } else {
          cb(null, result.result);
        }
      } else {
        cb(new TypeError('Something went worng! '));
      }
    }
  };
  xhr.open(method, url, true);
  xhr.send(JSON.stringify(data));
};
