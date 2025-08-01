// Stati del mondo con codici per Alloggiati Web
export interface StatoData {
  nome: string;
  codice: string;
  continente: string;
}

export const STATI_MONDO: StatoData[] = [
  // EUROPA
  { nome: "ITALIA", codice: "100000100", continente: "Europa" },
  { nome: "FRANCIA", codice: "100000110", continente: "Europa" },
  { nome: "GERMANIA", codice: "100000112", continente: "Europa" },
  { nome: "SPAGNA", codice: "100000134", continente: "Europa" },
  { nome: "REGNO UNITO", codice: "100000135", continente: "Europa" },
  { nome: "AUSTRIA", codice: "100000103", continente: "Europa" },
  { nome: "BELGIO", codice: "100000104", continente: "Europa" },
  { nome: "SVIZZERA", codice: "100000136", continente: "Europa" },
  { nome: "PAESI BASSI", codice: "100000123", continente: "Europa" },
  { nome: "PORTOGALLO", codice: "100000127", continente: "Europa" },
  { nome: "GRECIA", codice: "100000114", continente: "Europa" },
  { nome: "CROAZIA", codice: "100000191", continente: "Europa" },
  { nome: "SLOVENIA", codice: "100000192", continente: "Europa" },
  { nome: "POLONIA", codice: "100000126", continente: "Europa" },
  { nome: "REPUBBLICA CECA", codice: "100000203", continente: "Europa" },
  { nome: "UNGHERIA", codice: "100000139", continente: "Europa" },
  { nome: "ROMANIA", codice: "100000128", continente: "Europa" },
  { nome: "BULGARIA", codice: "100000106", continente: "Europa" },
  { nome: "SERBIA", codice: "100000188", continente: "Europa" },
  { nome: "MONTENEGRO", codice: "100000273", continente: "Europa" },
  { nome: "BOSNIA ERZEGOVINA", codice: "100000070", continente: "Europa" },
  { nome: "ALBANIA", codice: "100000101", continente: "Europa" },
  { nome: "MACEDONIA DEL NORD", codice: "100000294", continente: "Europa" },
  { nome: "NORVEGIA", codice: "100000122", continente: "Europa" },
  { nome: "SVEZIA", codice: "100000137", continente: "Europa" },
  { nome: "DANIMARCA", codice: "100000108", continente: "Europa" },
  { nome: "FINLANDIA", codice: "100000111", continente: "Europa" },
  { nome: "IRLANDA", codice: "100000117", continente: "Europa" },
  { nome: "ISLANDA", codice: "100000116", continente: "Europa" },
  { nome: "LUSSEMBURGO", codice: "100000119", continente: "Europa" },
  { nome: "MALTA", codice: "100000121", continente: "Europa" },
  { nome: "CIPRO", codice: "100000196", continente: "Europa" },
  { nome: "ESTONIA", codice: "100000233", continente: "Europa" },
  { nome: "LETTONIA", codice: "100000234", continente: "Europa" },
  { nome: "LITUANIA", codice: "100000235", continente: "Europa" },
  { nome: "SLOVACCHIA", codice: "100000245", continente: "Europa" },
  { nome: "UCRAINA", codice: "100000804", continente: "Europa" },
  { nome: "BIELORUSSIA", codice: "100000112", continente: "Europa" },
  { nome: "MOLDAVIA", codice: "100000498", continente: "Europa" },
  { nome: "RUSSIA", codice: "100000643", continente: "Europa" },
  { nome: "KOSOVO", codice: "100000383", continente: "Europa" },
  { nome: "ANDORRA", codice: "100000020", continente: "Europa" },
  { nome: "MONACO", codice: "100000492", continente: "Europa" },
  { nome: "LIECHTENSTEIN", codice: "100000438", continente: "Europa" },
  { nome: "SAN MARINO", codice: "100000674", continente: "Europa" },
  { nome: "VATICANO", codice: "100000336", continente: "Europa" },

  // AMERICA DEL NORD
  { nome: "STATI UNITI", codice: "100000138", continente: "America del Nord" },
  { nome: "CANADA", codice: "100000107", continente: "America del Nord" },
  { nome: "MESSICO", codice: "100000484", continente: "America del Nord" },
  { nome: "GUATEMALA", codice: "100000320", continente: "America del Nord" },
  { nome: "BELIZE", codice: "100000084", continente: "America del Nord" },
  { nome: "EL SALVADOR", codice: "100000222", continente: "America del Nord" },
  { nome: "HONDURAS", codice: "100000340", continente: "America del Nord" },
  { nome: "NICARAGUA", codice: "100000558", continente: "America del Nord" },
  { nome: "COSTA RICA", codice: "100000188", continente: "America del Nord" },
  { nome: "PANAMA", codice: "100000591", continente: "America del Nord" },
  { nome: "CUBA", codice: "100000192", continente: "America del Nord" },
  { nome: "GIAMAICA", codice: "100000388", continente: "America del Nord" },
  { nome: "HAITI", codice: "100000332", continente: "America del Nord" },
  { nome: "REPUBBLICA DOMINICANA", codice: "100000214", continente: "America del Nord" },
  { nome: "PORTO RICO", codice: "100000630", continente: "America del Nord" },
  { nome: "TRINIDAD E TOBAGO", codice: "100000780", continente: "America del Nord" },
  { nome: "BARBADOS", codice: "100000052", continente: "America del Nord" },
  { nome: "BAHAMAS", codice: "100000044", continente: "America del Nord" },

  // AMERICA DEL SUD
  { nome: "BRASILE", codice: "100000105", continente: "America del Sud" },
  { nome: "ARGENTINA", codice: "100000102", continente: "America del Sud" },
  { nome: "CILE", codice: "100000152", continente: "America del Sud" },
  { nome: "COLOMBIA", codice: "100000170", continente: "America del Sud" },
  { nome: "VENEZUELA", codice: "100000862", continente: "America del Sud" },
  { nome: "PERU", codice: "100000604", continente: "America del Sud" },
  { nome: "ECUADOR", codice: "100000218", continente: "America del Sud" },
  { nome: "BOLIVIA", codice: "100000068", continente: "America del Sud" },
  { nome: "PARAGUAY", codice: "100000600", continente: "America del Sud" },
  { nome: "URUGUAY", codice: "100000858", continente: "America del Sud" },
  { nome: "GUYANA", codice: "100000328", continente: "America del Sud" },
  { nome: "SURINAME", codice: "100000740", continente: "America del Sud" },
  { nome: "GUYANA FRANCESE", codice: "100000254", continente: "America del Sud" },

  // ASIA
  { nome: "CINA", codice: "100000156", continente: "Asia" },
  { nome: "GIAPPONE", codice: "100000392", continente: "Asia" },
  { nome: "INDIA", codice: "100000356", continente: "Asia" },
  { nome: "COREA DEL SUD", codice: "100000410", continente: "Asia" },
  { nome: "COREA DEL NORD", codice: "100000408", continente: "Asia" },
  { nome: "THAILANDIA", codice: "100000764", continente: "Asia" },
  { nome: "VIETNAM", codice: "100000704", continente: "Asia" },
  { nome: "SINGAPORE", codice: "100000702", continente: "Asia" },
  { nome: "MALESIA", codice: "100000458", continente: "Asia" },
  { nome: "INDONESIA", codice: "100000360", continente: "Asia" },
  { nome: "FILIPPINE", codice: "100000608", continente: "Asia" },
  { nome: "TAIWAN", codice: "100000158", continente: "Asia" },
  { nome: "HONG KONG", codice: "100000344", continente: "Asia" },
  { nome: "MACAO", codice: "100000446", continente: "Asia" },
  { nome: "MONGOLIA", codice: "100000496", continente: "Asia" },
  { nome: "NEPAL", codice: "100000524", continente: "Asia" },
  { nome: "BANGLADESH", codice: "100000050", continente: "Asia" },
  { nome: "SRI LANKA", codice: "100000144", continente: "Asia" },
  { nome: "PAKISTAN", codice: "100000586", continente: "Asia" },
  { nome: "AFGHANISTAN", codice: "100000004", continente: "Asia" },
  { nome: "IRAN", codice: "100000364", continente: "Asia" },
  { nome: "IRAQ", codice: "100000368", continente: "Asia" },
  { nome: "TURCHIA", codice: "100000792", continente: "Asia" },
  { nome: "SIRIA", codice: "100000760", continente: "Asia" },
  { nome: "LIBANO", codice: "100000422", continente: "Asia" },
  { nome: "ISRAELE", codice: "100000376", continente: "Asia" },
  { nome: "GIORDANIA", codice: "100000400", continente: "Asia" },
  { nome: "ARABIA SAUDITA", codice: "100000682", continente: "Asia" },
  { nome: "EMIRATI ARABI UNITI", codice: "100000784", continente: "Asia" },
  { nome: "KUWAIT", codice: "100000414", continente: "Asia" },
  { nome: "QATAR", codice: "100000634", continente: "Asia" },
  { nome: "BAHRAIN", codice: "100000048", continente: "Asia" },
  { nome: "OMAN", codice: "100000512", continente: "Asia" },
  { nome: "YEMEN", codice: "100000887", continente: "Asia" },
  { nome: "KAZAKISTAN", codice: "100000398", continente: "Asia" },
  { nome: "UZBEKISTAN", codice: "100000860", continente: "Asia" },
  { nome: "KIRGHIZISTAN", codice: "100000417", continente: "Asia" },
  { nome: "TAGIKISTAN", codice: "100000762", continente: "Asia" },
  { nome: "TURKMENISTAN", codice: "100000795", continente: "Asia" },
  { nome: "GEORGIA", codice: "100000268", continente: "Asia" },
  { nome: "ARMENIA", codice: "100000051", continente: "Asia" },
  { nome: "AZERBAIGIAN", codice: "100000031", continente: "Asia" },
  { nome: "BHUTAN", codice: "100000064", continente: "Asia" },
  { nome: "MALDIVE", codice: "100000462", continente: "Asia" },
  { nome: "CAMBOGIA", codice: "100000116", continente: "Asia" },
  { nome: "LAOS", codice: "100000418", continente: "Asia" },
  { nome: "MYANMAR", codice: "100000104", continente: "Asia" },
  { nome: "BRUNEI", codice: "100000096", continente: "Asia" },

  // AFRICA
  { nome: "SUDAFRICA", codice: "100000710", continente: "Africa" },
  { nome: "EGITTO", codice: "100000818", continente: "Africa" },
  { nome: "MAROCCO", codice: "100000504", continente: "Africa" },
  { nome: "TUNISIA", codice: "100000788", continente: "Africa" },
  { nome: "ALGERIA", codice: "100000012", continente: "Africa" },
  { nome: "LIBIA", codice: "100000434", continente: "Africa" },
  { nome: "NIGERIA", codice: "100000566", continente: "Africa" },
  { nome: "KENYA", codice: "100000404", continente: "Africa" },
  { nome: "ETIOPIA", codice: "100000231", continente: "Africa" },
  { nome: "GHANA", codice: "100000288", continente: "Africa" },
  { nome: "SENEGAL", codice: "100000686", continente: "Africa" },
  { nome: "COSTA D'AVORIO", codice: "100000384", continente: "Africa" },
  { nome: "CAMERUN", codice: "100000120", continente: "Africa" },
  { nome: "UGANDA", codice: "100000800", continente: "Africa" },
  { nome: "TANZANIA", codice: "100000834", continente: "Africa" },
  { nome: "MOZAMBICO", codice: "100000508", continente: "Africa" },
  { nome: "MADAGASCAR", codice: "100000450", continente: "Africa" },
  { nome: "ANGOLA", codice: "100000024", continente: "Africa" },
  { nome: "ZAMBIA", codice: "100000894", continente: "Africa" },
  { nome: "ZIMBABWE", codice: "100000716", continente: "Africa" },
  { nome: "BOTSWANA", codice: "100000072", continente: "Africa" },
  { nome: "NAMIBIA", codice: "100000516", continente: "Africa" },
  { nome: "SUDAN", codice: "100000729", continente: "Africa" },
  { nome: "SUDAN DEL SUD", codice: "100000728", continente: "Africa" },
  { nome: "CONGO", codice: "100000178", continente: "Africa" },
  { nome: "REPUBBLICA DEM. CONGO", codice: "100000180", continente: "Africa" },
  { nome: "GABON", codice: "100000266", continente: "Africa" },
  { nome: "GUINEA EQUATORIALE", codice: "100000226", continente: "Africa" },
  { nome: "CIAD", codice: "100000148", continente: "Africa" },
  { nome: "REPUBBLICA CENTRAFRICANA", codice: "100000140", continente: "Africa" },
  { nome: "MALI", codice: "100000466", continente: "Africa" },
  { nome: "BURKINA FASO", codice: "100000854", continente: "Africa" },
  { nome: "NIGER", codice: "100000562", continente: "Africa" },
  { nome: "MAURITANIA", codice: "100000478", continente: "Africa" },
  { nome: "TOGO", codice: "100000768", continente: "Africa" },
  { nome: "BENIN", codice: "100000204", continente: "Africa" },
  { nome: "GUINEA", codice: "100000324", continente: "Africa" },
  { nome: "GUINEA-BISSAU", codice: "100000624", continente: "Africa" },
  { nome: "SIERRA LEONE", codice: "100000694", continente: "Africa" },
  { nome: "LIBERIA", codice: "100000430", continente: "Africa" },
  { nome: "GAMBIA", codice: "100000270", continente: "Africa" },
  { nome: "CAPO VERDE", codice: "100000132", continente: "Africa" },
  { nome: "SAO TOME E PRINCIPE", codice: "100000678", continente: "Africa" },
  { nome: "RUANDA", codice: "100000646", continente: "Africa" },
  { nome: "BURUNDI", codice: "100000108", continente: "Africa" },
  { nome: "GIBUTI", codice: "100000262", continente: "Africa" },
  { nome: "SOMALIA", codice: "100000706", continente: "Africa" },
  { nome: "ERITREA", codice: "100000232", continente: "Africa" },
  { nome: "LESOTHO", codice: "100000426", continente: "Africa" },
  { nome: "SWAZILAND", codice: "100000748", continente: "Africa" },
  { nome: "MALAWI", codice: "100000454", continente: "Africa" },
  { nome: "MAURITIUS", codice: "100000480", continente: "Africa" },
  { nome: "SEYCHELLES", codice: "100000690", continente: "Africa" },
  { nome: "COMORE", codice: "100000174", continente: "Africa" },

  // OCEANIA
  { nome: "AUSTRALIA", codice: "100000036", continente: "Oceania" },
  { nome: "NUOVA ZELANDA", codice: "100000554", continente: "Oceania" },
  { nome: "FIJI", codice: "100000242", continente: "Oceania" },
  { nome: "PAPUA NUOVA GUINEA", codice: "100000598", continente: "Oceania" },
  { nome: "VANUATU", codice: "100000548", continente: "Oceania" },
  { nome: "SAMOA", codice: "100000882", continente: "Oceania" },
  { nome: "TONGA", codice: "100000776", continente: "Oceania" },
  { nome: "KIRIBATI", codice: "100000296", continente: "Oceania" },
  { nome: "TUVALU", codice: "100000798", continente: "Oceania" },
  { nome: "NAURU", codice: "100000520", continente: "Oceania" },
  { nome: "PALAU", codice: "100000585", continente: "Oceania" },
  { nome: "ISOLE MARSHALL", codice: "100000584", continente: "Oceania" },
  { nome: "STATI FEDERATI MICRONESIA", codice: "100000583", continente: "Oceania" },
  { nome: "ISOLE SALOMONE", codice: "100000090", continente: "Oceania" },
];

// Funzione per cercare stati
export const searchStati = (query: string): StatoData[] => {
  if (!query || query.length < 2) return STATI_MONDO.slice(0, 15);
  
  const normalizedQuery = query.toUpperCase().trim();
  
  return STATI_MONDO.filter(stato =>
    stato.nome.includes(normalizedQuery) ||
    stato.continente.toUpperCase().includes(normalizedQuery)
  ).slice(0, 15);
};

// Funzione per ottenere uno stato per nome esatto
export const getStatoByNome = (nome: string): StatoData | undefined => {
  return STATI_MONDO.find(stato => 
    stato.nome.toUpperCase() === nome.toUpperCase()
  );
};

// Funzione per ottenere stati per continente
export const getStatiByContinent = (continente: string): StatoData[] => {
  return STATI_MONDO.filter(stato => 
    stato.continente.toUpperCase() === continente.toUpperCase()
  );
};

// Lista dei continenti disponibili
export const CONTINENTI = [
  "Europa",
  "America del Nord", 
  "America del Sud",
  "Asia",
  "Africa",
  "Oceania"
];

// Funzione per ottenere tutti gli stati europei (per facilità d'uso)
export const getStatiEuropei = (): StatoData[] => {
  return getStatiByContinent("Europa");
};

// Funzione per ottenere stati più frequenti per turismo italiano
export const getStatiFrequenti = (): StatoData[] => {
  const statiFrequenti = [
    "ITALIA", "FRANCIA", "GERMANIA", "SPAGNA", "REGNO UNITO", 
    "AUSTRIA", "SVIZZERA", "STATI UNITI", "CANADA", "AUSTRALIA",
    "BRASILE", "ARGENTINA", "GIAPPONE", "CINA", "RUSSIA"
  ];
  
  return statiFrequenti.map(nome => getStatoByNome(nome)!).filter(Boolean);
};