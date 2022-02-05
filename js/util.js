function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// COMPONENTS FOR WORKING WITH TIME
function getCurrentDateFormat() {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();

	return mm + '/' + dd + '/' + yyyy;
}
function twod(v) {
    return ('0'+Number(v)).slice(-2);
}
function toMinutes(time) { // time is string example: "10:43"
    return Number(time.substring(0, 2)) * 60 + Number(time.substring(3));
}
function getCurrentTime() {
    let now = new Date();
    return twod(now.getHours()) + ':' + twod(now.getMinutes());
}

// COMPONENTS FOR WORKING WITH CHROME STORAGE
const getStorageData = keys =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(keys, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  )
// const { data } = await getStorageData(['data'])

const setStorageData = data =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  )
// await setStorageData({ data: [someData] })

function onReady(parent, element, callback) {
  if ($(element)[0]) {
    callback();
    return;
  }

  const readyObserver = new MutationObserver(function (mutations, me) {
    if ($(element)[0]) {

      callback();

      me.disconnect();
    }
  });
  readyObserver.observe($(parent)[0], {
    childList: true,
    subtree: true,
  });
}

String.prototype.format = function () {
  // store arguments in an array
  var args = arguments;
  // use replace to iterate over the string
  // select the match and check if related argument is present
  // if yes, replace the match with the argument
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    // check if the argument is present
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};


function arrToCSV(arr, fields){
  var csvStr = fields.join(",") + "\n";
  arr.forEach(element => csvStr += Object.values(element).join(',') + '\n');
  return csvStr;
}


function downloadFile(name, str) {
  let filename = `${name}-${getCurrentDateFormat()}.csv`;
  let e = $(fileHTML.format(encodeURI(str), filename));
  e[0].click();
  e.remove();
}