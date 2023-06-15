import { Link } from "react-router-dom";
import "../styles/Footer.scss";

const Footer = () => {
  const teamItinerai = [
    {name: 'Adam McPhee', github: 'https://github.com/adkmcphee'},
    {name: 'Hooman Asadian', github: 'https://github.com/hoomili'},
    {name: 'Kamila Lemaire', github: 'https://github.com/klemaire23'}
  ];

  const mappedTeamItinerai = teamItinerai.map((member, index) => {
    return (
      <li key={index}>
        <Link to={member.github} target="_blank" rel="noopener noreferrer">
          {member.name}
        </Link>
      </li>
    );
  });

  return (
    <footer>
      <div className="footer-container">
        <ul className="footer-team--members">{mappedTeamItinerai}</ul>
        <p>&copy; 2023 ItinerAI. All rights reserved.</p>
      </div>
    </footer>
  );
};


export default Footer;