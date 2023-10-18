import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import {useState, useEffect} from "react"
import client from './api/AxiosConfig'


function App() {


  const [userAdm, setUserAdm] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect( () => {

    Promise.all([
      client.get('/user-adm'),
      client.get('/skills'),
      client.get('/projects')
    ]).then((response) =>{
    setUserAdm(response[0].data)
    setSkills(response[1].data)
    setProjects(response[2].data)
    })
  }, [])
  return (
    <div className="App">
      <NavBar data={userAdm}/>
      <Banner  data={userAdm}/>
      <Skills data={skills}/>
      <Projects data={projects}/>
      <Contact />
      <Footer data={userAdm}/>
    </div>
  );
}

export default App;
