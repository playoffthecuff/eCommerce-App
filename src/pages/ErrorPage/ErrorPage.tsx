import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function ErrorPage() {
  return (
    <div className="wrapper">
      <Header />
      <div>
        <div id="error-page">ErrorPage</div>
        <Link to="/main">Back</Link>
      </div>
      <Footer />
    </div>
  );
}

export default ErrorPage;
