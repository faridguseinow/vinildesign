export type NavCopy = {
  projects: string;
  services: string;
  about: string;
  contact: string;
  menu: string;
  close: string;
};

export type ProjectItem = {
  number: string;
  make: string;
  model: string;
  category: string;
  title: string;
  image: string;
};

export type ProcessItem = {
  number: string;
  title: string;
  description: string;
};

export type HomeCopy = {
  nav: NavCopy;
  hero: {
    titleTop: string;
    titleBottom: string;
    subtitle: string;
    primary: string;
    secondary: string;
    location: string;
    scroll: string;
  };
  statement: {
    lineOne: string;
    lineTwo: string;
    body: string;
  };
  projects: {
    heading: string;
    intro: string;
    demo: string;
    view: string;
    items: ProjectItem[];
  };
  instagram: {
    heading: string;
    body: string;
    button: string;
    itemLabel: string;
  };
  services: {
    heading: string;
    note: string;
    items: ProcessItem[];
  };
  about: {
    heading: string;
    body: string;
    note: string;
    imageAlt: string;
  };
  process: {
    heading: string;
    items: ProcessItem[];
    note: string;
  };
  cta: {
    lineOne: string;
    lineTwo: string;
    button: string;
    whatsapp: string;
    instagram: string;
  };
  footer: {
    tagline: string;
    location: string;
    contactPending: string;
    privacy: string;
    rights: string;
  };
};
