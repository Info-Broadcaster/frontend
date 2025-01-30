chrome.action.onClicked.addListener((tab) => {
  if (!tab || !tab.url) return;

  // Encode l'URL pour éviter les caractères spéciaux
  const encodedUrl = encodeURIComponent(tab.url);

  // Construit la nouvelle URL
  const newUrl = `http://localhost:5173/edition/${encodedUrl}/fr`;

  // Ouvre un nouvel onglet avec la nouvelle URL
  chrome.tabs.create({ url: newUrl });
});
