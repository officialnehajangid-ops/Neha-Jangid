/** One brand in the marquee under "SaaS teams I have worked with". */
export type Client = {
  readonly name: string;
  /** Absolute URL to the product's own site; the marquee name links out to it. */
  readonly url: string;
};

export const CLIENTS: readonly Client[] = [
  { name: 'SoftwareSuggest', url: 'https://www.softwaresuggest.com/' },
  { name: 'SocialKit', url: 'https://www.socialkit.dev/' },
  { name: 'CaptureKit', url: 'https://www.capturekit.dev/' },
  { name: 'Templated', url: 'https://templated.io/' },
  { name: 'ChartDB', url: 'https://chartdb.io/' },
  { name: 'PostPeer', url: 'https://www.postpeer.dev/' },
  { name: 'Easyretro', url: 'https://easyretro.io/' },
  { name: 'Slideasy', url: 'https://slideasy.io/' },
  { name: 'Kaaj.ai', url: 'https://kaaj.ai/' },
  { name: 'Scrapingdog', url: 'https://www.scrapingdog.com/' },
  { name: 'FlightAPI', url: 'https://www.flightapi.io/' },
  { name: 'MakCorps', url: 'https://www.makcorps.com/' },
];
