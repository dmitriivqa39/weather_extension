chrome.runtime.sendMessage('from content script', (response) => {
  console.log('response from background:', response)
})
