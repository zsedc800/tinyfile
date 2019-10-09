// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
window.addEventListener('load', () => {
  alert('load')
})

window.addEventListener('dragenter', e => {
  e.preventDefault();
})

window.addEventListener('dragover', e => {
  e.preventDefault();
})

window.addEventListener('drop', (e) => {
  e.stopPropagation();
  e.preventDefault();
  const { files: [file] } = e.dataTransfer;
  alert(file.path);
})
