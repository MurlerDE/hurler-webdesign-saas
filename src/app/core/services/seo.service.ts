import { 
  Component, 
  Injectable, 
  inject, 
  RendererFactory2, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  signal, 
  computed } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { SeoData } from "@core/models/seo.model";
import { DOCUMENT } from "@angular/common";

@Injectable({providedIn: "root"})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);
  private rendererFactory = inject(RendererFactory2);
  private renderer = this.rendererFactory.createRenderer(null, null)

  private readonly BRAND = "Hurler Webdesign";

  updateMetadata(data: SeoData, canonicalPath: string = "") {
  const fullTitle = `${data.title} | ${this.BRAND}`;
  const url = `https://hurler-webdesign.de${canonicalPath}`;
  const fallbackImage = 'https://hurler-webdesign.de/assets/og-default.jpg'; // Falls mal kein Bild da ist

  this.titleService.setTitle(fullTitle);
  this.metaService.updateTag({ name: 'description', content: data.description });

  // Open Graph
  this.metaService.updateTag({ property: 'og:title', content: fullTitle }); // Mit Branding
  this.metaService.updateTag({ property: 'og:description', content: data.description });
  this.metaService.updateTag({ property: 'og:type', content: data.type || 'website' });
  this.metaService.updateTag({ property: 'og:image', content: data.image || fallbackImage });

  // Twitter
  this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' }); // Wichtig für große Bilder!
  this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
  this.metaService.updateTag({ name: 'twitter:description', content: data.description });
  this.metaService.updateTag({ name: 'twitter:url', content: url });
  this.metaService.updateTag({ name: 'twitter:image', content: data.image || fallbackImage });

  this.updateCanonicalUrl(url);
  this.setLocalBusinessSchema();
}

  private updateCanonicalUrl(url: string) {
    let link: HTMLLinkElement = this.document.querySelector("link[rel='canonical']") || this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'canonical');
    this.renderer.setAttribute(link, 'href', url);
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
      "description": "Spezialist für performante Webseiten ohne CMS für kleine und mittelständische Unternehmen.",
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