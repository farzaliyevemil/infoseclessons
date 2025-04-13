/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🔴 Red Teaming',
      items: ['red-teaming/initial-access', 'red-teaming/privilege-escalation'],
    },
    {
      type: 'category',
      label: '🔵 Blue Teaming',
      items: ['blue-teaming/siem-setup', 'blue-teaming/log-analysis'],
    },
    {
      type: 'category',
      label: '🛡️ GRC',
      items: ['grc/risk-management', 'grc/policies'],
    },
    {
      type: 'category',
      label: '🌐 General Security',
      items: ['general-security/password-best-practices', 'general-security/malware-types'],
    },
    {
      type: 'category',
      label: '📚 Technical Foundations',
      items: [
        {
          type: 'category',
          label: 'Operating Systems',
          items: [
            {
              type: 'category',
              label: 'Windows',
              items: [
                'foundations/operating-systems/windows/wsl',
              ],
            },
            {
              type: 'category',
              label: 'Linux',
              items: [
                'foundations/operating-systems/linux/basic-commands',
              ],
            },
          ],
        },
        'foundations/networking',
        'foundations/virtualization',
        'foundations/helpdesk-basics',
      ],
    },
  ],
};

module.exports = sidebars;
