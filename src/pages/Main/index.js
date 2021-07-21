import api from '@services/api';
import TeamSwitcher from '@components/TeamSwitcher';
import Projects from '@components/Projects';
import { Container } from './styles';

const Main = () => (
  <Container>
    <TeamSwitcher />
    <Projects />
  </Container>
);

export default Main;
