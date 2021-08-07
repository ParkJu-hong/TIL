리액트에서의 리덕스가 아닌 순수 자바스크립트에서 리덕스를 공부하고 리액트에서
사용하고 싶어서 자바스크립트에서 리덕스로 CRUD를 구현해보았다. 아직 update와 
delete 후의 Read가 말썽이지만 내일 마저 구현해보도록 하겠다.

````js
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
        newState = Object.assign({}, state, { nowId: action.id });
      } else if (action.type === 'CHANGE_MODE') {
        newState = Object.assign({}, state, { mode: action.mode });
      } else if(action.type === 'CREATE_PUSH'){
        newState = Object.assign({}, state, {maxId: state.maxId + 1});
        newState.contentsMenu.push({
          id: state.maxId + 1,
          title: action.title,
          text: action.text,
        });
      } else if(action.type === 'DELETE'){
        let temp = state.contentsMenu.filter((el) => el.title !== action.delete);
        newState = Object.assign({}, state);
        newState.contentsMenu = temp;
      }

      return newState;
    }
    const store = Redux.createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    function makeh1() {
      let state = store.getState();
      document.querySelector('h1').textContent = state.contentsMenu[state.nowId].title;
    }

    function makeContentsMenu() {
      let state = store.getState();
      let i = 0;
      document.querySelector('#contents_menu').textContent = '';
      while (i < state.contentsMenu.length) {
        let makeH3 = document.createElement('h3');
        makeH3.textContent = state.contentsMenu[i].title;
        makeH3.value = state.contentsMenu[i].id
        makeH3.onclick = function () {
          store.dispatch({
            type: 'CHANGE_CONTENT',
            id: makeH3.value
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
      document.querySelector('#content').textContent = state.contentsMenu[state.nowId].text;
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

      buttonSend.onclick =  () => {
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

    function _delete(){
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

    function reLoading() {
      let state = store.getState();
      if (state.mode === 'CREATE') {
        create();
      } else if (state.mode === 'UPDATE') {

      } else if (state.mode === 'DELETE') {
        _delete();
      } else if (state.mode === 'READ') {
        read();
      }
    }
    store.subscribe(makeh1);
    store.subscribe(makeContentsMenu);
    store.subscribe(reLoading);
    makeh1();
    makeContentsMenu();
    makeCRUD();


  </script>
</body>

</html>
```
