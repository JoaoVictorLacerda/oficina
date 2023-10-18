import { Col } from "react-bootstrap";
export const ProjectCard = ({ title, caption, imgLink, projectLink }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgLink}/>
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{caption}</span> <br></br>
          <a href={projectLink} className="link-project" target="_blank"> <span>Go to the project</span> </a>
        </div>
      </div>
    </Col>
  )
}
