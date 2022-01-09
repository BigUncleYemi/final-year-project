import { Row, Col, Checkbox } from 'antd';
import '../../asset/scss/Home.scss';
import requireOwnerAuth from '../../Hoc/requireOwnerAuth';

function Home(props) {
  return (
    <div className="Home">
      {/* <Nav /> */}
      <div className="Home-Container">
        <Row align="middle"> 
          <Col sm={24} md={12}>
            <div className="n">
              <h1>
                <span className="rc">Digital Grill AR</span><br/>
                <small>Grill your Digital renders into AR demo projects.</small>
              </h1>
              <br />
              <button onClick={() => props.history.push('/register')}>
                Get Started
              </button>
            </div>
          </Col>
          <Col sm={24} md={12} className="lp__item stripe">
            <div className="overlay" />
            <div className="stripe__item"></div>
            <div className="stripe__item"></div>
            <div className="stripe__item"></div>
            <div className="stripe__item"></div>
          </Col>
        </Row>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
