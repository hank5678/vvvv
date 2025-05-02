/**
 * @type {import('semantic-release').GlobalConfig}
 */

const branch = process.env.GITHUB_REF_NAME;

const mainPlugins = [
  "@semantic-release/changelog",
  [
    "@semantic-release/git",
    {
      assets: ["package.json", "CHANGELOG.md"],
      message: "chore(release): ${nextRelease.version}",
    },
  ],
];

const devPlugins = [
  [
    "@semantic-release/git",
    {
      assets: ["package.json"],
      message: "chore(release): ${nextRelease.version}",
    },
  ],
];

const config = {
  branches: ["main", { pattern: "dev/*", prerelease: "dev" }],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    ...(branch === "main" ? mainPlugins : []),
    ...(branch.startsWith("dev/") ? devPlugins : []),
  ],
  repositoryUrl: "https://github.com/hank5678/vvvv",
};

export default config;
