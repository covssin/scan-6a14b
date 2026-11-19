import styled from '@emotion/styled';
import colors from 'client/styles/colors';
import { StyledCard } from 'client/components/Form/Card';

const StyledSelfScanMsg = styled(StyledCard)`
  margin: 0px auto 1rem;
  width: 95vw;
  a {
    color: ${colors.primaryIncreasedContrast};
  }
  b {
    font-weight: extra-bold;
  }
  span,
  i {
    opacity: 0.85;
  }
  img {
    width: 5rem;
    float: right;
    border-radius: 4px;
  }
`;

const messages = [
  'Niezła próba! Skanowanie samego siebie jest jak próba połaskotania samego siebie — to po prostu nie działa!',
  'Wykryto rekurencyjne skanowanie. Wszechświat mógłby implodować... lepiej nie ryzykować.',
  'Hej, przestań nas podglądać! Rumienimy się... 😉',
  'Hmm, skanujesz nas? Czujemy się wyróżnieni!',
  'Alarm! Wykryto skanowanie lustrzane. Zaufaj nam, wyglądamy świetnie 😉',
  'O, badamy inspektora? Trochę jak Incepcja!',
  'Chwileczkę... skanujesz nas?! Cóż, to ciekawy zwrot akcji!',
  'Skanowanie nas jest jak proszenie lustra, by odbiło samo siebie.',
];

const SelfScanMsg = () => {
  return (
    <StyledSelfScanMsg>
      <img src="https://i.ibb.co/0tQbCPJ/test2.png" alt="Autoskanowanie" />
      <b>{messages[Math.floor(Math.random() * messages.length)]}</b>
      <br />
      <span>
        Więcej projektów oraz narzędzi znajdziesz na stronie{' '}
        <a target="_blank" rel="noreferrer" href="https://kmucha.pl">
          kmucha.pl
        </a>
        .
      </span>
    </StyledSelfScanMsg>
  );
};

export default SelfScanMsg;
