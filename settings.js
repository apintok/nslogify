var checkDark = document.getElementById('dark');
var checkLight = document.getElementById('light');

checkDark.addEventListener('click', function () {
  console.log('This checkbox >>> ', this);
  changeTheme(checkDark.value);
});

checkLight.addEventListener('click', function () {
  console.log('This checkbox >>> ', this);
  changeTheme(checkLight.value);
});

function changeTheme(theme) {
  var themeSettings = { name: theme };
  browser.storage.local.set(themeSettings, function () {
    console.log('Data saved to extension storage');
  });

  browser.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.action == 'getValue') {
      browser.storage.local.get('name').then(function (data) {
        console.log('data >>> ', data);
        sendResponse({ value: data.name });
      });
      return true;
    }
  });
}
