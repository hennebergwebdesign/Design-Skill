/**
 * Mailtemplates im Branding des Kunden. Kopieren nach src/lib/mail-template.ts.
 * MARKE, LOGO und ABSENDER pro Projekt anpassen.
 *
 * Tabellenlayout und Inlinestile sind Absicht, Mailprogramme koennen kein modernes CSS.
 */

const MARKE = {
  name: 'Kundenname',
  farbe: '#000000',
  textAufFarbe: '#ffffff',
  logo: 'https://www.kundendomain.de/images/logo-mail.png',
  seite: 'https://www.kundendomain.de',
  telefon: '',
  antwortzeit: 'innerhalb eines Werktages',
};

const maskieren = (wert = '') =>
  wert.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function rahmen(inhalt: string) {
  return `<!doctype html><html lang="de"><body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#111827;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:${MARKE.farbe};padding:20px 24px;">
          <img src="${MARKE.logo}" alt="${maskieren(MARKE.name)}" height="32" style="height:32px;display:block;border:0;" />
        </td></tr>
        <tr><td style="padding:24px;font-size:15px;line-height:1.6;">${inhalt}</td></tr>
        <tr><td style="padding:16px 24px;background:#f9fafb;font-size:12px;color:#6b7280;">
          ${maskieren(MARKE.name)} &middot; <a href="${MARKE.seite}" style="color:#6b7280;">${MARKE.seite.replace('https://', '')}</a>
          ${MARKE.telefon ? ` &middot; ${maskieren(MARKE.telefon)}` : ''}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function interneMail(d: { name: string; email: string; telefon?: string; nachricht?: string; herkunft?: string; zeit: string }) {
  const zeile = (titel: string, wert?: string) =>
    wert ? `<tr><td style="padding:6px 0;color:#6b7280;width:120px;vertical-align:top;">${titel}</td><td style="padding:6px 0;">${maskieren(wert)}</td></tr>` : '';
  return rahmen(`
    <h1 style="font-size:18px;margin:0 0 16px;">Neue Anfrage über die Website</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;">
      ${zeile('Name', d.name)}
      ${zeile('E-Mail', d.email)}
      ${zeile('Telefon', d.telefon)}
      ${zeile('Eingegangen', d.zeit)}
      ${zeile('Seite', d.herkunft)}
    </table>
    ${d.nachricht ? `<p style="margin:16px 0 4px;color:#6b7280;font-size:13px;">Nachricht</p>
    <div style="white-space:pre-wrap;border-left:3px solid ${MARKE.farbe};padding-left:12px;">${maskieren(d.nachricht)}</div>` : ''}
    <p style="margin:20px 0 0;font-size:13px;color:#6b7280;">Antworten geht direkt an den Absender.</p>
  `);
}

export function bestaetigungsMail(d: { name: string }) {
  return rahmen(`
    <h1 style="font-size:18px;margin:0 0 16px;">Vielen Dank für deine Anfrage</h1>
    <p style="margin:0 0 12px;">Hallo ${maskieren(d.name)},</p>
    <p style="margin:0 0 12px;">deine Nachricht ist bei uns angekommen. Wir melden uns ${maskieren(MARKE.antwortzeit)} bei dir.</p>
    ${MARKE.telefon ? `<p style="margin:0 0 12px;">Wenn es eilig ist, erreichst du uns unter ${maskieren(MARKE.telefon)}.</p>` : ''}
    <p style="margin:20px 0 0;">Herzliche Grüße<br />dein Team von ${maskieren(MARKE.name)}</p>
  `);
}
