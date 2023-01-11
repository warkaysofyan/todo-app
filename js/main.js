// ! global check and content classes
let check = document.getElementsByClassName('check');
let content = document.getElementsByClassName('content');
// ! the todo object list
let strTodos = window.localStorage.todo || '[]';
let parsedTodos = JSON.parse(strTodos);
let todos = parsedTodos;

//! togglin color theme
let localSreg = /^\//;

if (localSreg.test(window.localStorage.theme)) {
    window.localStorage.clear();
}

document.getElementById('theme').href =
    window.localStorage.theme || 'dist/css/main-dark.css';
document.getElementById('chnge-theme').addEventListener('click', e => {
    //console.log(e);
    let light = 'dist/css/main-light.css';
    let dark = 'dist/css/main-dark.css';

    let reglight = /dist\/css\/main-light.css/gi;
    let regdark = /dist\/css\/main-dark.css/gi;

    let hr = document.getElementById('theme').href;
    if (reglight.test(hr)) {
        document.getElementById('theme').href = dark;
        window.localStorage.theme = dark;
    } else if (regdark.test(hr)) {
        window.localStorage.theme = light;
        document.getElementById('theme').href = light;
    }
});
// ! toggling the checked class
let toggleCheck = (A, B, C) => {
    let i = 0;
    A.addEventListener('click', e => {
        let tar = e.target.getAttribute('order');
        if (!tar) {
            tar = e.target.parentElement.getAttribute('order');
        }
        if (A.innerHTML == '') {
            A.innerHTML = `<img src="images/icon-check.svg"/>`;
            A.classList.add('checked');
            B.classList.add('checked_content');
            if (tar) {
                todos[tar].compleated = true;
                window.localStorage.todo = JSON.stringify(todos);
            }
        } else {
            A.innerHTML = ``;
            A.classList.remove('checked');
            B.classList.remove('checked_content');
            if (tar) {
                todos[tar].compleated = false;
                window.localStorage.todo = JSON.stringify(todos);
            }
        }
        howMenyLeft();
    });
};
toggleCheck(check[0], content[0]);
// ! remove all children

let removeTodos = () => {
    let todoContentLength =
        document.getElementById('todos_container').children.length;
    for (let i = 0; i < todoContentLength; i++) {
        removeTodo(1);
    }
};
let number = 0;

// ! the function that adds one todo and added the toggleCheck();
let addTodo = (todo, compleat, id) => {
    let todoContent = document.createTextNode(todo);
    let todoContainer = document.getElementById('todos_container');
    let pDiv = document.createElement('div');
    let CDiv = document.createElement('div');
    CDiv.setAttribute('order', id);
    let Cp = document.createElement('p');
    let img = document.createElement('img');
    img.setAttribute('src', 'images/icon-check.svg');
    Cp.className = 'content';
    CDiv.className = 'check';
    if (compleat) {
        Cp.classList.add('checked_content');
        CDiv.classList.add('checked');
        CDiv.appendChild(img);
    }
    Cp.appendChild(todoContent);
    pDiv.appendChild(CDiv);
    pDiv.appendChild(Cp);
    todoContainer.appendChild(pDiv);
    toggleCheck(CDiv, Cp);
};
// ! refreshing how meny items left
let howMenyLeft = () => {
    let left = 0;
    todos.forEach(el => {
        if (!el.compleated) {
            left++;
        }
    });
    document.querySelector('#left').innerHTML = left + ' Items left';
    left = 0;
};
howMenyLeft();
// ! adding the todos
let filter = stat => {
    if (strTodos != '[]') {
        removeTodos();
        if (stat == 'all') {
            for (let i = 0; i < todos.length; i++) {
                addTodo(todos[i].todo, todos[i].compleated, i);
            }
        }
        if (stat == 'compleated') {
            todos.forEach((el, i) => {
                if (el.compleated) {
                    addTodo(el.todo, el.compleated, i);
                }
            });
        }
        if (stat == 'activ') {
            todos.forEach((el, i) => {
                if (!el.compleated) {
                    addTodo(el.todo, el.compleated, i);
                }
            });
        }
    }
};
filter('all');
// ! appending the todo list
let appendAllTodos = () => {
    todos.forEach(el => {
        addTodo(el.todo, el.compleated);
    });
};
// ! remove childe number n

let removeTodo = n => {
    let todoContent = document.getElementById('todos_container');
    todoContent.removeChild(todoContent.children[parseInt(n) - 1]);
};

// ! adding a todo to  the local storag

let addTodoToLocal = (content, compleated) => {
    let Existed = window.localStorage.todo;
    if (Existed) {
        console.log(Existed);
    } else {
        console.log('not Existed');
    }
};

// ! adding a todo to  the DOM
window.inp.addEventListener('focus', e => {
    console.log('focused');
    document.querySelector('.active').classList.remove('active');
    document.querySelector('#all').classList.add('active');
    filter('all');
});

window.inp.addEventListener('keydown', e => {
    let inpValue = document.getElementById('inp').value;
    if (e.key == 'Enter') {
        let reg = /[a-z]{2}/gi;
        if (reg.test(inpValue)) {
            let compleated = document
                .getElementById('checkBox')
                .classList.contains('checked');

            let todoObg = {};

            todoObg.todo = inpValue;
            todoObg.compleated = compleated;
            number++;
            todoObg.order = number;
            console.log(typeof todos);
            todos.push(todoObg);
            addTodo(inpValue, compleated);
            window.localStorage.todo = JSON.stringify(todos);
            howMenyLeft();
        } else {
            console.log('unput faild empty');
        }
    }
});

document.getElementById('clear').addEventListener('click', () => {
    console.log(todos.length);
    todos.forEach((el, i) => {
        if (el.compleated) {
            todos.splice(i, 1);
        }
    });

    for (let i = 0; i < todos.length; i++) {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].compleated) {
                todos.splice(i, 1);
            }
        }
        if (todos[i].compleated) {
            todos.splice(i, 1);
        }
    }
    window.localStorage.todo = JSON.stringify(todos);
    document.querySelector('.active').classList.remove('active');
    document.querySelector('#all').classList.add('active');
    filter('all');
});
document.getElementById('compleated').addEventListener('click', e => {
    filter('compleated');
    document.querySelector('.active').classList.remove('active');

    e.target.classList.add('active');
});
document.getElementById('all').addEventListener('click', e => {
    filter('all');
    document.querySelector('.active').classList.remove('active');

    e.target.classList.add('active');
});
document.getElementById('activ').addEventListener('click', e => {
    filter('activ');
    document.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
});
