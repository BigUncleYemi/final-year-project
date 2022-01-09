import config from '../config/AppConfig';
import '../asset/scss/Home.scss';


export default function Footer() {
  return (
    <footer>
      <div>
        <h1>{config.AppName}</h1>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}