chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('got message:', msg, 'from tab:', sender.tab?.id)
  sendResponse('From the background script!')
})
