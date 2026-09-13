<?xml version="1.0" encoding="UTF-8"?>
<!--
  Gebrandete Sitemap-Ansicht.

  Warum: Eine Sitemap ist für Crawler gedacht, wird aber regelmäßig von Menschen
  geöffnet: vom Kunden, von Mitbewerbern, von einem selbst beim Prüfen. Ohne
  Stylesheet steht dort nackte XML-Liste.

  Für Suchmaschinen ändert sich nichts: die xml-stylesheet-Verarbeitungsanweisung
  wird ignoriert, urlset und sitemapindex bleiben unverändert.

  Einbinden: in der Astro-Sitemap-Integration über xslURL: '/sitemap.xsl'.
  Beim statischen Hosting zusätzlich den Content-Type setzen, siehe _headers:
    /sitemap.xsl
      Content-Type: application/xslt+xml; charset=utf-8

  Farben und Schriften unten an die Marke anpassen.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="de">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap</title>
        <style>
          :root {
            --marke: #356a4f;
            --text: #151717;
            --leise: #5c6360;
            --flaeche: #ffffff;
            --flaeche-alt: #f5fbf8;
            --rahmen: #e3e8e5;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0; padding: 2rem 1.25rem;
            font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
            line-height: 1.6; color: var(--text); background: var(--flaeche);
          }
          .huelle { max-width: 1100px; margin-inline: auto; }
          h1 { font-size: 1.75rem; margin: 0 0 .25rem; letter-spacing: -.02em; }
          .hinweis { color: var(--leise); margin: 0 0 2rem; font-size: .95rem; }
          .tabelle-huelle { overflow-x: auto; border: 1px solid var(--rahmen); border-radius: 1rem; }
          table { width: 100%; border-collapse: collapse; font-size: .95rem; }
          th, td { text-align: left; padding: .75rem 1rem; border-bottom: 1px solid var(--rahmen); }
          th { background: var(--flaeche-alt); font-weight: 600; white-space: nowrap; }
          tr:last-child td { border-bottom: 0; }
          a { color: var(--marke); text-underline-offset: .15em; word-break: break-all; }
          .zahl { color: var(--leise); font-variant-numeric: tabular-nums; white-space: nowrap; }
          @media (prefers-color-scheme: dark) {
            :root { --text: #f6f7f6; --leise: #a9b0ad; --flaeche: #151717;
                    --flaeche-alt: #1e2120; --rahmen: #2c302e; --marke: #9adcba; }
          }
        </style>
      </head>
      <body>
        <div class="huelle">
          <h1>Sitemap</h1>
          <p class="hinweis">
            Diese Übersicht ist für Menschen gestaltet. Suchmaschinen lesen dieselbe
            Datei als XML.
          </p>

          <!-- Sitemap-Index -->
          <xsl:if test="s:sitemapindex">
            <p class="hinweis">
              <xsl:value-of select="count(s:sitemapindex/s:sitemap)"/> Teil-Sitemaps
            </p>
            <div class="tabelle-huelle">
              <table>
                <tr><th>Sitemap</th><th>Zuletzt geändert</th></tr>
                <xsl:for-each select="s:sitemapindex/s:sitemap">
                  <tr>
                    <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                    <td class="zahl"><xsl:value-of select="s:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </table>
            </div>
          </xsl:if>

          <!-- Einzelne Sitemap -->
          <xsl:if test="s:urlset">
            <p class="hinweis">
              <xsl:value-of select="count(s:urlset/s:url)"/> Adressen
            </p>
            <div class="tabelle-huelle">
              <table>
                <tr><th>Adresse</th><th>Zuletzt geändert</th><th>Priorität</th></tr>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                    <td class="zahl"><xsl:value-of select="s:lastmod"/></td>
                    <td class="zahl"><xsl:value-of select="s:priority"/></td>
                  </tr>
                </xsl:for-each>
              </table>
            </div>
          </xsl:if>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
