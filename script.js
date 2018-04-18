function updateCode() {
  const code = document.querySelector('.html');
  code.textContent = document.querySelector('layout').outerHTML.trimLeft();
  hljs.highlightBlock(code);
  hljs.highlightBlock(document.querySelector('.js'));
}

const controls = document.getElementById('controls');

function listener(evt) {
  const [id, _, prop] = evt.target.parentElement.textContent.split(' ');
  document.getElementById(id).style.setProperty(prop, `${evt.target.value}${evt.target.dataset['unit']}`);
  updateCode();
}
controls.addEventListener('click', listener);
controls.addEventListener('keyup', listener);

const button = document.querySelector('button');
if (button) {
  button.addEventListener('click', function(evt) {
    if (button.innerText == 'hide') {
      document.querySelector('.js').style.display = 'none';
      button.innerText = 'show';
    } else {
      document.querySelector('.js').style.display = '';
      button.innerText = 'hide';
    }
  });
}

for (const node of controls.children) {
  const [id, _, prop] = node.textContent.split(' ');
  document.getElementById(id).style.setProperty(prop, `${node.children[0].value}${node.children[0].dataset['unit']}`);
}

updateCode();

const code = document.querySelector('.js').innerText;
const url = URL.createObjectURL(new Blob([code], {type: 'text/javascript'}));
CSS.layoutWorklet.addModule(url);
