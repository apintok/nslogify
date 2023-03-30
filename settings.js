var checkDark = document.getElementById('dark');
var checkLight = document.getElementById('light');

if (checkDark.checked) {
  localStorage.setItem('theme', checkDark.value);
}

checkDark.addEventListener('click', function () {
  console.log('current theme >>> ', localStorage.getItem('theme'));
  localStorage.setItem('theme', 'dark');
});

checkLight.addEventListener('click', function () {
  localStorage.setItem('theme', 'light');
});
