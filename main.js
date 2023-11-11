'use strict';

{
  // pcのローカルストレージに保存する
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const renderTodo = (todo) => {
    /* 
    - li
      -label
        -input
        -span
      -button
    */

    // input作成
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = todo.isCompleted;
    input.addEventListener('change', () => {
      todos.forEach((item) => {
        if (item.id === todo.id) {
          item.isCompleted = !item.isCompleted;
        }
      });
      saveTodos();
    });

    // span作成
    const span = document.createElement('span');
    span.textContent = todo.title;

    // label作成
    const label = document.createElement('label');
    // labelの子要素作成
    label.appendChild(input);
    label.appendChild(span);

    // button作成
    const button = document.createElement('button');
    button.textContent = '☓';
    button.addEventListener('click', () => {
      if (!confirm('消しますか?')) {
        return;
      }
      li.remove();
      todos = todos.filter((item) => {
        return item.id !== todo.id;
      });
      saveTodos();
    });

    // li作成
    const li = document.createElement('li');
    li.appendChild(label);
    li.appendChild(button);
    document.querySelector('#todos').appendChild(li);

  };

  const renderTodos = () => {
    todos.forEach((todo) => {
      renderTodo(todo);
    });
  };

  // 送信foamの設定
  document.querySelector('#add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#add-form input');
    const todo = {
      id: Date.now(),
      title: input.value,
      isCompleted: false,
    };
    renderTodo(todo);
    todos.push(todo);
    console.table(todos);
    saveTodos();
    input.value = '';
    input.focus();
  });

  // 一括削除操作
  document.querySelector('#purge').addEventListener('click', () => {
    if (!confirm('消しますか?')) {
      return;
    }
    todos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });
    saveTodos();
    document.querySelectorAll('#todos li').forEach((li) => {
      li.remove();
    });
    renderTodos();
  });

  renderTodos();
}