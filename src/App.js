import styles from './App.module.sass';
import Header from './component/Header/Header.js'
import Navigator from './component/Navigator/Navigator'
// import 'antd'

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <div className={styles.main}>
        <nav className={styles.nav}>
          <Navigator></Navigator>
        </nav>
        <div className={styles.content}>aa</div></div>
    </div>
  );
}

export default App;
