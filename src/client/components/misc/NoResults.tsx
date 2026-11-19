import styled from '@emotion/styled';
import colors from 'client/styles/colors';
import { StyledCard } from 'client/components/Form/Card';
import Heading from 'client/components/Form/Heading';

const Wrapper = styled(StyledCard)`
  margin: 0 auto;
  width: var(--page-width);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  h2 {
    margin: 0;
  }
  p {
    margin: 0;
  }
  .target {
    font-family: var(--font-mono);
    background: ${colors.background};
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    word-break: break-all;
    align-self: flex-start;
    max-width: 100%;
    color: ${colors.textColor};
  }
  .reasons {
    margin: 0;
    padding-left: 1.25rem;
    color: ${colors.textColorSecondary};
    li {
      padding: 0.15rem 0;
    }
  }
  .detail {
    color: ${colors.textColorSecondary};
    font-size: 0.85rem;
    word-break: break-word;
  }
`;

type Kind = 'unreachable' | 'invalid' | 'api-down' | 'disabled' | 'blocked';

const VARIANT: Record<Kind, { title: string; description: string; reasons: string[] }> = {
  unreachable: {
    title: 'Nie można połączyć się z tą stroną',
    description: 'Nie udało się ustalić adresu IP dla tego hosta, więc skanowanie nie może zostać uruchomione',
    reasons: [
      'Nazwa domeny może zawierać literówkę lub nie jest już zarejestrowana',
      'Witryna może być wyłączona lub tymczasowo niedostępna',
      'Wystąpił problem z rozwiązywaniem nazwy w DNS',
      'Zapora sieciowa lub blokada regionalna uniemożliwia połączenie',
    ],
  },
  invalid: {
    title: 'Nieprawidłowy adres wejściowy',
    description: 'Wprowadzony ciąg nie wygląda na poprawny adres URL ani adres IP',
    reasons: [
      'Wpisz nazwę domeny (np. kmucha.pl) lub adres IPv4 / IPv6',
      'Sprawdź, czy w adresie nie ma literówek lub zbędnych znaków',
      'Unikaj spacji i nieobsługiwanych symboli w adresie',
    ],
  },
  'api-down': {
    title: 'Usługa tymczasowo niedostępna',
    description: 'Większość testów nie powiodła się, ponieważ nie udało się połączyć z API SCAN_KMucha',
    reasons: [
      'Interfejs API jest tymczasowo niedostępny, uruchamia się ponownie lub osiągnął limit zapytań',
      'Własna instancja serwera może być błędnie skonfigurowana lub zatrzymana',
      'Połączenie z API jest blokowane przez sieć lub zaporę',
    ],
  },
  blocked: {
    title: 'Skanowanie niedozwolone',
    description: 'Wszystkie testy zostały pominięte, ponieważ ta instancja nie zezwala na skanowanie wskazanego hosta',
    reasons: [
      'Administrator zablokował tę domenę lub zakres adresów IP',
      'Konfiguracja instancji wyłącza skanowanie tego typu celów',
      'Możesz zeskanować ten adres na własnej instancji SCAN_KMucha',
    ],
  },
  disabled: {
    title: 'Narzędzie SCAN_KMucha jest wstrzymane',
    description: 'Ta instancja została tymczasowo wyłączona, więc testy nie mogą zostać uruchomione',
    reasons: [
      'Publiczna instancja mogła zostać tymczasowo wstrzymana',
      'Serwer znajduje się w trybie konserwacji',
      'Możesz uruchomić własną instancję aplikacji na swoim serwerze',
    ],
  },
};

interface Props {
  address: string;
  error?: string;
  kind?: Kind;
}

const NoResults = ({ address, error, kind = 'unreachable' }: Props): JSX.Element => {
  const { title, description, reasons } = VARIANT[kind];
  return (
    <Wrapper role="alert">
      <Heading as="h2" align="left" color={colors.danger}>
        {title}
      </Heading>
      <p>{description}</p>
      <code className="target">{address}</code>
      <p>Możliwe przyczyny:</p>
      <ul className="reasons">
        {reasons.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      {error && (
        <span className="detail">
          {kind === 'blocked' ? 'Powód' : 'Błąd zapytania'}: {error}
        </span>
      )}
    </Wrapper>
  );
};

export default NoResults;
