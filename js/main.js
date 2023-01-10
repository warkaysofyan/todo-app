//! togglin color theme
document.getElementById('theme').href =
    window.localStorage.theme || '/dist/css/main-dark.css';
document.getElementById('chnge-theme').addEventListener('click', e => {
    //console.log(e);
    let light = '/dist/css/main-light.css';
    let dark = '/dist/css/main-dark.css';

    let reglight = /\/dist\/css\/main-light.css/gi;
    let regdark = /\/dist\/css\/main-dark.css/gi;

    let hr = document.getElementById('theme').href;
    console.log(hr);
    if (reglight.test(hr)) {
        document.getElementById('theme').href = dark;
        window.localStorage.theme = dark;
    } else if (regdark.test(hr)) {
        window.localStorage.theme = light;
        document.getElementById('theme').href = light;
    }
});

// ! the todo object list
let todos = {};
// ! adding a todo

window.inp.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        console.log('the forme submetted');
        let A = false;
        console.log(window.checkBox.innerHTML);
    }
});
