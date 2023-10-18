import { Container, Row, Col } from "react-bootstrap";

import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = ({data}) => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6} className="text-center text-sm-end">
          <h1></h1>
            <div className="social-icon">
              <br />
                <a href= {data.linkedinLink ? data.linkedinLink : "#"}  target="_blank" ><img src={navIcon1} alt="" /></a>
                <a href={data.facebookLink ? data.facebookLink : "#"}  target="_blank"><img src={navIcon2} alt="" /></a>
                <a href={data.instagramLink ? data.instagramLink : "#" }  target="_blank" ><img src={navIcon3} alt="" /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
