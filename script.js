const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

const downloadLinks = document.querySelectorAll('.download-card .button');
const downloadConfig = window.PEERDROP_DOWNLOADS ?? {};
downloadLinks.forEach((link, index) => {
  const platform = index === 0 ? 'windows' : 'android';
  const url = typeof downloadConfig[platform] === 'string' ? downloadConfig[platform].trim() : '';
  link.classList.add('download-link');
  link.dataset.download = platform;
  if (!url) {
    link.classList.add('is-disabled');
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('title', 'Download link coming soon');
    link.removeAttribute('href');
    link.addEventListener('click', (event) => event.preventDefault());
    return;
  }
  link.setAttribute('href', url);
  link.setAttribute('aria-disabled', 'false');
  link.classList.remove('is-disabled');
});
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const featureExplorer = document.querySelector('[data-feature-explorer]');
const featureDetail = featureExplorer?.querySelector('[data-feature-detail]');
const featureData = {
  discovery: { kicker: 'PEERDROP / NEARBY', title: 'Nearby discovery', copy: 'Find PeerDrop devices on your local network with explicit empty, searching, and error states. Connected devices and new discoveries stay distinct.', tags: ['Local network', 'Windows + Android'], screen: '<div class="app-screen-top"><b>PeerDrop</b><span>Ready to share</span></div><div class="radar"><i></i><i></i><strong>P</strong><span class="radar-device radar-device-one">Android</span><span class="radar-device radar-device-two">Windows</span></div><div class="screen-status"><span></span> Searching for nearby devices</div>' },
  send: { kicker: 'PEERDROP / SEND', title: 'Send files', copy: 'Select multiple files, choose one or more connected recipients, review the transfer request, and then monitor progress.', tags: ['Multiple files', 'Multiple recipients'], screen: '<div class="app-screen-top"><b>Send files</b><span>Step 2 of 4</span></div><div class="screen-list"><div><span class="screen-file-icon">+</span><b>photos.zip</b><small>12.4 MB</small></div><div><span class="screen-file-icon">+</span><b>notes.pdf</b><small>2.1 MB</small></div></div><div class="screen-action">Choose recipients <strong>2 connected</strong></div>' },
  receive: { kicker: 'PEERDROP / RECEIVE', title: 'Receive safely', copy: 'Review incoming requests, approve or decline them, and keep security context visible while files arrive.', tags: ['Approve or decline', 'Security context'], screen: '<div class="app-screen-top"><b>Incoming request</b><span>Needs approval</span></div><div class="request-card"><span class="request-avatar">PC</span><div><b>My Windows PC</b><small>wants to send 3 files</small></div></div><div class="screen-actions"><button>Decline</button><button>Approve</button></div>' },
  controls: { kicker: 'PEERDROP / TRANSFER', title: 'Transfer controls', copy: 'Pause, resume, or cancel an active transfer at the group or individual-file level.', tags: ['Pause / resume', 'Cancel'], screen: '<div class="app-screen-top"><b>Sending to Windows</b><span>68%</span></div><div class="transfer-row"><span class="screen-file-icon">↗</span><div><b>photos.zip</b><small>8.4 MB of 12.4 MB</small><i><em></em></i></div></div><div class="screen-actions"><button>Pause</button><button>Cancel</button></div>' },
  trust: { kicker: 'PEERDROP / DEVICES', title: 'Pairing & trust', copy: 'Manage saved devices, pair with a one-time verification code, set approval behavior, and revoke pairing when needed.', tags: ['One-time code', 'Permission policies'], screen: '<div class="app-screen-top"><b>Pair device</b><span>Verification</span></div><div class="pair-code">4 8 2 9</div><p class="screen-helper">Share this code with the device you trust.</p><div class="screen-status"><span></span> Waiting for confirmation</div>' },
  history: { kicker: 'PEERDROP / HISTORY', title: 'History & files', copy: 'Review sent and received activity, including completed, failed, cancelled, and active records. Choose where verified files are saved.', tags: ['Transfer activity', 'Storage location'], screen: '<div class="app-screen-top"><b>Recent activity</b><span>All activity</span></div><div class="history-row"><span>✓</span><div><b>photos.zip</b><small>Received · Completed</small></div><strong>12.4 MB</strong></div><div class="history-row"><span>✓</span><div><b>notes.pdf</b><small>Sent · Completed</small></div><strong>2.1 MB</strong></div>' },
  settings: { kicker: 'PEERDROP / SETTINGS', title: 'Settings for your workflow', copy: 'Configure permissions for your own devices, friends, and other devices. Windows also includes tray behavior and sign-in startup options.', tags: ['Permission controls', 'Windows integration'], screen: '<div class="app-screen-top"><b>Settings</b><span>PeerDrop</span></div><div class="settings-row"><b>Device management</b><span>›</span></div><div class="settings-row"><b>Sharing preferences</b><span>›</span></div><div class="settings-row"><b>Received files location</b><span>›</span></div>' }
};

featureExplorer?.querySelectorAll('.feature-tab').forEach((tab) => tab.addEventListener('click', () => {
  const item = featureData[tab.dataset.feature];
  if (!item || !featureDetail) return;
  featureExplorer.querySelectorAll('.feature-tab').forEach((button) => {
    const active = button === tab;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  featureDetail.innerHTML = `<div class="feature-detail-copy"><p class="feature-detail-kicker">${item.kicker}</p><h3>${item.title}</h3><p>${item.copy}</p><div class="feature-detail-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join('')}</div></div><div class="app-screen">${item.screen}</div>`;
}));
