import { Card, Note } from 'client/components/Form/Card';
import Row, { Section } from 'client/components/Form/Row';
import { fromFinding } from 'client/components/misc/Icon';
import { getPath } from 'client/utils/result-processor';
import { checkContact, checkExpires, getField } from 'client/analysis/rules/security-txt';

const SecurityTxtCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const { isPresent, foundIn, isPgpSigned, fields = {}, content } = props.data;
  const contact = checkContact(fields);
  const expires = checkExpires(fields);
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row
        lbl="Obecny"
        val={!!isPresent}
        status={isPresent ? 'pass' : 'warning'}
        term="security-txt"
      />
      {isPresent && (
        <>
          <Row lbl="Lokalizacja pliku" val={foundIn} />
          <Row
            lbl="Podpis PGP"
            val={!!isPgpSigned}
            status={isPgpSigned ? 'pass' : 'info'}
            term="security-txt-signature"
          />
          {contact && (
            <Row
              lbl="Contact"
              val="Brak"
              term="security-txt-contact"
              {...fromFinding(contact)}
            />
          )}
          {!getField(fields, 'expires') && (
            <Row
              lbl="Expires"
              val="Brak"
              term="security-txt-expires"
              {...fromFinding(expires)}
            />
          )}
          {Object.entries(fields).map(([field, value]: [string, any]) => {
            const isLink = value.includes('http');
            return (
              <Row
                key={field}
                lbl={field}
                val={isLink ? getPath(value) : value}
                link={isLink ? value : undefined}
                term="security-txt-expires"
                {...fromFinding(field.toLowerCase() === 'expires' ? expires : null)}
              />
            );
          })}
          <Section title="Pokaż pełną treść pliku" collapsible>
            <Row plaintext={content} />
          </Section>
        </>
      )}
      {!isPresent && (
        <Note>
          Plik security.txt ułatwia badaczom bezpieczeństwa bezpieczne zgłaszanie wykrytych
          podatności.
        </Note>
      )}
    </Card>
  );
};

export default SecurityTxtCard;
