export const CONTACT_EMAIL = "info@t4-capital.ch";
export const CONTACT_LINK = `mailto:${CONTACT_EMAIL}`;
export const SECTION_IDS = {
  HERO: "",
  STRATEGY: "strategy",
  ABOUT: "about",
};

export const CORE_TEAM: {
  name: string;
  linkedIn: string;
}[] = [
  {
    name: "Florian Niggl",
    linkedIn: "https://www.linkedin.com/in/florian-niggl-82ba6a13b/",
  },
  {
    name: "Lukas Stiefel",
    linkedIn: "https://www.linkedin.com/in/lukas-stiefel-303b04291/",
  },
  {
    name: "Fabio Cavelti",
    linkedIn: "https://www.linkedin.com/in/fabio-d-cavelti/",
  },
  {
    name: "Tim Stingelin",
    linkedIn: "https://www.linkedin.com/in/tim-r-stingelin-318279148/",
  },
];

export type KProduct = keyof typeof PRODUCTS;

export const PRODUCTS = {
  ALT: {
    launchDate: "2023/02/01",
    isin: "xxx",
    gradient: "/gradients/blue.webp",
    docs: {
      presentation:
        "https://drive.google.com/file/d/1rXH5N9ACM9THnzW5qDdAaQw8uIMpGiOB/view",
    },
  },
  ENT: {
    launchDate: "2024/04/01",
    isin: "xxx",
    gradient: "/gradients/pink.webp",
    video: "/media/teaser.mp4",
    docs: {
      presentation:
        "https://drive.google.com/file/d/1yHXdbF8yxyExu_sFcpcoPJ-U2A2eGhyN/view?usp=sharing",
    },
  },
  // EQ: {
  //   gradient: "/gradients/yellow.webp",
  //   docs: {
  //     presentation: undefined,
  //   },
  // },
} satisfies Record<
  string,
  {
    launchDate: string;
    isin: string;
    gradient: string;
    video?: string;
    docs: Record<"presentation", string | undefined>;
  }
>;
