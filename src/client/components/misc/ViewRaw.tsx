import { useState } from 'react';
import styled from '@emotion/styled';
import colors from 'client/styles/colors';
import { Card } from 'client/components/Form/Card';
import Button from 'client/components/Form/Button';

const CardStyles = `
margin: 0 auto;
width: var(--page-width);
position: relative;
transition: all 0.2s ease-in-out;
display: flex;
flex-direction: column;
max-height: 100%;
a {
  color: ${colors.primaryIncreasedContrast};
}
.controls {
  display: flex;
  flex-wrap: wrap;
  button {
    max-width: 300px;
  }
}
small {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${colors.textColorTertiary};
}
`;

const StyledIframe = styled.iframe`
  width: calc(100% - 2rem);
  outline: none;
  border: none;
  border-radius: 4px;
  min-height: 50vh;
  height: 100%;
  margin: 1rem;
  background: ${colors.background};
`;

const ViewRaw = (props: { everything: { id: string; result: any }[] }) => {
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const makeResults = () => {
    const result: { [key: string]: any } = {};
    props.everything.forEach((item: { id: string; result: any }) => {
      result[item.id] = item.result;
    });
    return result;
  };

  const fetchResultsUrl = async () => {
    const resultContent = makeResults();
    const response = await fetch('https://jsonhero.io/api/create.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Wyniki skanowania SCAN_KMucha',
        content: resultContent,
        readOnly: true,
        ttl: 3600,
      }),
    });
    if (!response.ok) {
      setError(`Błąd HTTP! Status: ${response.status}`);
    } else {
      setError(null);
    }
    await response.json().then((data) => setResultUrl(data.location));
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(makeResults(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scan-kmucha-wyniki.json';
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Card heading="Podgląd / pobieranie surowych danych" styles={CardStyles}>
      <div className="controls">
        <Button onClick={handleDownload}>Pobierz wyniki (JSON)</Button>
        <Button onClick={fetchResultsUrl}>{resultUrl ? 'Odśwież podgląd' : 'Podgląd online'}</Button>
        {resultUrl && <Button onClick={() => setResultUrl('')}>Ukryj podgląd</Button>}
      </div>
      {resultUrl && !error && (
        <>
          <StyledIframe title="Podgląd wyników przez JSON Hero" src={resultUrl} />
          <small>
            Twoje wyniki są dostępne do podglądu <a href={resultUrl}>tutaj</a>.
          </small>
        </>
      )}
      {error && <p className="error">{error}</p>}
      <small>
        Powyżej znajdują się surowe wyniki wygenerowane dla badanego adresu URL w formacie JSON.
        Możesz je zaimportować do własnych skryptów w celu dalszej analizy.
      </small>
    </Card>
  );
};

export default ViewRaw;
