import Log from '../components/log/log.component';
import './../styles/home.scss';
const HomePage = () => {

    return (
      <div>
        <div className="title">
          <h1>Welcome to Monarch</h1>
          <p>Please log in with your Monarch Credentials</p>
          <br/>
          <Log/>
        </div>
      </div>
    );

}

export default HomePage;