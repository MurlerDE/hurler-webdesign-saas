import { Injectable, inject } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";
import { RendererFactory2 } from "@angular/core";
import { SeoData } from "@core/models/seo.model";

@Injectable({ providedIn: "root" })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);
  private rendererFactory = inject(RendererFactory2);
  private renderer =
    this.rendererFactory.createRenderer(null, null);

  private readonly BRAND = "Hurler Webdesign";
  private readonly FALLBACK_IMAGE =
    'https://hurler-webdesign.de/assets/og-default.jpg';
  private readonly DEFAULT_TYPE = "website";

  updateMetadata(data: SeoData, canonicalPath?: string) {
    const fullTitle = `${data.title} | ${this.BRAND}`;
    const url = `https://hurler-webdesign.de${canonicalPath || ""}`;

    this.titleService.setTitle(fullTitle);
    this.metaService.updateTag({ name: "description", content: data.description });

    // Open Graph
    this.metaService.updateTag({
      property: "og:title",
      content: fullTitle,
    });
    this.metaService.updateTag({
      property: "og:description",
      content: data.description,
    });
    this.metaService.updateTag({
      property: "og:type",
      content: data.type || this.DEFAULT_TYPE,
    });
    this.metaService.updateTag({
      property: "og:image",
      content: data.image || this.FALLBACK_IMAGE,
    });
    this.metaService.updateTag({ property: "og:url", content: url });

    // Twitter
    this.metaService.updateTag({
      name: "twitter:card",
      content: "summary_large_image",
    });
    this.metaService.updateTag({
      name: "twitter:title",
      content: fullTitle,
    });
    this.metaService.updateTag({
      name: "twitter:description",
      content: data.socialsDescription || data.description,
    });
    this.metaService.updateTag({ name: "twitter:url", content: url });
    this.metaService.updateTag({
      name: "twitter:image",
      content: data.image || this.FALLBACK_IMAGE,
    });

    if (canonicalPath) {
      this.updateCanonicalUrl(url);
    }

    this.setLocalBusinessSchema();
  }

  private updateCanonicalUrl(url: string) {
    let link: HTMLLinkElement =
      this.document.querySelector("link[rel='canonical']") ||
      this.renderer.createElement("link");
    this.renderer.setAttribute(link, "rel", "canonical");
    this.renderer.setAttribute(link, "href", url);
    if (!this.document.head.contains(link)) {
      this.renderer.appendChild(this.document.head, link);
    }
  }


  private setLocalBusinessSchema() {
    const oldScript = this.document.getElementById('schema-org-data');
    if (oldScript) this.renderer.removeChild(this.document.head, oldScript);

    const schema = {
      "@context": "https://schema.org",
      "@type": "WebDesignService",
      "name": this.BRAND,
      "url": "https://hurler-webdesign.de",
      "logo": "https://hurler-webdesign.de/assets/logo.png",
      "image": "https://hurler-webdesign.de/assets/office.jpg",
      "description": "Spezialist für schnelle Webseiten ohne WordPress für Handwerk & Vereine. Wir bieten maßgeschneidertes Webdesign für eine schnelle und sichere Online-Präsenz.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Untermagerbein 30",
        "addressLocality": "Mönchsdeggingen",
        "postalCode": "86751",
        "addressCountry": "DE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.7506,
        "longitude": 10.5773
      },
      "areaServed": ["Nördlingen", "Donauwörth", "Augsburg", "Bayern"],
      "telephone": "+49 171 8084830",
      "priceRange": "€€"
    };
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'schema-org-data';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(this.document.head, script);
  }
}