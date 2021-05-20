import React from 'react'
import { auth, storeUserInfo, updateUser } from "./lib/firebase";

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';
import Login from "./components/Login";
import Upload from "./components/Upload";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setLoading(false);
      let newUser = null;
      if (user) {
        newUser = await storeUserInfo(user);
      }
      setUser(newUser);
    });
  }, []);

  const logout = () => {
    auth.signOut();
  };

  const handleImageChanged = async (downlodUrl) => {
    await updateUser(user, downlodUrl);
  };

  const HeaderContent = () => {
    if (user) {
      return (
        // <div class="navbar-end">
        //   <div class="navbar-item">
        <div className="navbar-end">
          <div className="navbar-item">
            <Upload userImage={user.image} onSletctedImage={handleImageChanged} />

            {user.name}
          </div>
          <div className="navbar-item">
            <button className="button is-danger is-light is-small" onClick={logout}>
              {" "}
              Logout
            </button>
          </div>
        </div>
      );
    } else {
      return <Login />;
    }
  };
  return (
    <div className="container is-fluid">
      <header class="navbar">
      {loading ? (
        <p>
          LOADING.....
        </p>
      ) : (
        <HeaderContent />
      )}
    </header >
    <div>
      {user && <Todo />}
    </div>
  </div >
  );
}

export default App;
