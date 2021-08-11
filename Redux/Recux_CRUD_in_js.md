JavaScript Dom과 Redux로 CRUD를 구현해봤다.

```js
<!doctype html>
<html>

<head>
  <meta charset=“UTF-8”>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.1/redux.js"></script>
</head>

<body>
  <h1></h1>
  <br>
  <div id="contents_menu"></div>
  <br><br>
  <div id="crud_menu"></div>
  <br><br><br>
  <div id="content"></div>


  <script>
    function reducer(state, action) {
      let newState = {};
      if (state === undefined) {
        newState = {
          maxId: 1,
          nowId: 0,
          mode: 'READ',
          contentsMenu: [
            {
              id: 0,
              title: 'Title',
              text: 'text1'
            },
            {
              id: 1,
              title: 'Title2',
              text: 'text2'
            }
          ]
        }
      }

      if (action.type === 'CHANGE_CONTENT') {
        newState = Object.assign({}, state, { nowId: action.id, mode: action.mode });
      } else if (action.type === 'CHANGE_MODE') {
        newState = Object.assign({}, state, { mode: action.mode });
      } else if (action.type === 'CREATE_PUSH') {
        newState = Object.assign({}, state, { maxId: state.maxId + 1 });
        newState.contentsMenu.push({
          id: state.maxId + 1,
          title: action.title,
          text: action.text,
        });
      } else if (action.type === 'DELETE') {
        let temp;
        let temp_nowId;
        let _newStateArr = [];
        temp = state.contentsMenu.filter((el) => {
          if (el.title === action.delete) {
            temp_nowId = el.id
          }
          else if (el.title !== action.delete) return true;
        });
        temp.reduce((acc, cur, idx) => {
          cur.id = idx;
          _newStateArr.push(cur);
          return;
        })
        if (temp_nowId === state.nowId) {
          newState = Object.assign({}, state, { nowId: temp[0].id });
          newState.contentsMenu = _newStateArr;
        } else {
          newState = Object.assign({}, state);
          newState.contentsMenu = _newStateArr;
        }
        newState.contentsMenu = temp;
      }else if(action.type === 'UPDATE'){
        let temp = state.contentsMenu.forEach((el) => {
          if(el.id === action.id){
            el.title = action.title;
            el.text = action.text;
          }
        });
        newState = Object.assign({}, state);
      }

      return newState;
    }
    const store = Redux.createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    function makeh1() {
      let state = store.getState();
      let temp = state.contentsMenu.filter((el) => state.nowId === el.id);
      document.querySelector('h1').textContent = temp[0].title;
    }

    function makeContentsMenu() {
      let state = store.getState();
      let i = 0;
      document.querySelector('#contents_menu').textContent = '';
      while (i < state.contentsMenu.length) {
        let makeH3 = document.createElement('h3');
        makeH3.textContent = state.contentsMenu[i].title;
        makeH3.value = state.contentsMenu[i].id
        makeH3.onclick = () => {
          store.dispatch({
            type: 'CHANGE_CONTENT',
            id: makeH3.value,
            mode: 'READ'
          });
          read();
        }
        document.querySelector('#contents_menu').append(makeH3);
        i++;
      }
    }

    function makeCRUD() {
      document.querySelector('#crud_menu').innerHTML = `
        <button onclick="
          store.dispatch({
            type: 'CHANGE_MODE',
            mode: 'CREATE'
          })
          reLoading();
        " value="CREATE">CREATE</button>
        <button onclick="
          store.dispatch({
            type: 'CHANGE_MODE',
            mode: 'READ'
          })
          reLoading();
        " value="READ">READ</button>
        <button onclick="
          store.dispatch({
            type: 'CHANGE_MODE',
            mode: 'UPDATE'
          })
          reLoading();
        " value="UPDATE">UPDATE</button>
        <button onclick="
          store.dispatch({
            type: 'CHANGE_MODE',
            mode: 'DELETE'
          })
          reLoading();
        " value="DELETE">DELETE</button>
      `
    }

    function read() {
      let state = store.getState();
      let temp = state.contentsMenu.filter((el) => state.nowId === el.id);
      // console.log('temp : ', temp);
      document.querySelector('#content').textContent = temp[0].text;
    }

    function create() {
      let temp = {};
      let inputTitle = document.createElement('input');
      let inputText = document.createElement('input');
      let buttonSend = document.createElement('button');

      inputTitle.onchange = (e) => {
        temp.title = e.target.value
      };

      inputText.onchange = (e) => {
        temp.text = e.target.value
      };

      buttonSend.onclick = () => {
        store.dispatch({
          type: 'CREATE_PUSH',
          title: temp.title,
          text: temp.text
        });
      };

      buttonSend.textContent = 'Create!!';

      let content = document.querySelector('#content');
      content.textContent = '';
      content.append(inputTitle);
      content.append(inputText);
      content.append(buttonSend);
    }

    function _delete() {
      let content = document.querySelector('#content');
      content.textContent = '';
      let input = document.createElement('input');
      let buttonSend = document.createElement('button');
      let temp = '';
      input.onchange = (e) => {
        temp = e.target.value;
      }
      buttonSend.onclick = () => {
        store.dispatch({
          type: 'DELETE',
          delete: temp
        })
      }
      buttonSend.textContent = 'DELETE !!';
      content.append(input);
      content.append(buttonSend);
    }

    function _update() {
      let state = store.getState();
      let inputTitle = document.createElement('input');
      let inputText = document.createElement('input');
      let buttonSend = document.createElement('button');

      let _title;
      let _text;

      inputTitle.onchange = (e) => {
        _title = e.target.value;
      }

      inputText.onchange = (e) => {
        _text = e.target.value;
      }

      // 만약 inputTitle에 넣은 값이 title에 있다면 update실행 아니면 실행하지 않을것
      buttonSend.textContent = 'UPDATE!';
      buttonSend.onclick = () => {
        for (let item of state.contentsMenu) {
          if (item.title === _title) {
            store.dispatch({
              type: 'UPDATE',
              id: item.id,
              title: _title,
              text: _text
            })
          }
        }
      }


      let content = document.querySelector('#content');
      content.textContent = '';
      content.append(inputTitle);
      content.append(inputText);
      content.append(buttonSend);

      return;
    }

    function reLoading() {
      let state = store.getState();
      if (state.mode === 'CREATE') {
        create();
      } else if (state.mode === 'UPDATE') {
        _update();
      } else if (state.mode === 'DELETE') {
        _delete();
      } else if (state.mode === 'READ') {
        read();
      }
    }
    function _console() {
      let state = store.getState();
      console.log('state : ', state);
    }
    store.subscribe(makeh1);
    store.subscribe(makeContentsMenu);
    store.subscribe(reLoading);
    store.subscribe(_console);
    makeh1();
    makeContentsMenu();
    makeCRUD();
    _console();

  </script>
</body>

</html>```
