import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';

export const Banner = ({data}) => {

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h1>{`Hi guys :-). I'm a backend engineer`}</h1>
                  {data.description}
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
