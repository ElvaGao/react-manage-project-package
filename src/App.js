import Login from './containers/Login'; //引入的Login的容器组件
import AppStyle from "./App.module.scss"

function App() {
  return (
    <div className={AppStyle.content}>
        <Login/>
    </div>
  );
}

export default App;
