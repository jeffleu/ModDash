var options = {
  type: "image",
  title: "my notifications",
  message: "my name is charlie and I am ballin",
  iconUrl: "dash.gif",
  imageUrl: "charlie.jpg"
}
chrome.notifications.create(options, callback);

function callback() {
  console.log('ayeee');
}
