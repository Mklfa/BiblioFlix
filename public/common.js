const WHATSAPP_PHONE = "221755576094";
const CATEGORIES = [
  { label: "Romans", subject: "fiction", group: "Littérature et fiction", description: "Romans classiques, contemporains, littérature générale, œuvres africaines et récits illustrés." },
  { label: "Policier et thriller", subject: "mystery", group: "Littérature et fiction", description: "Enquêtes, suspense et espionnage, dont les romans SAS de Gérard de Villiers." },
  { label: "Romance", subject: "romance", group: "Littérature et fiction", description: "Histoires d’amour, romances sombres et œuvres à dominante érotique." },
  { label: "Science-fiction", subject: "science fiction", group: "Littérature et fiction", description: "Futurs possibles, technologies et voyages spatiaux." },
  { label: "Littérature jeunesse", subject: "juvenile fiction", group: "Littérature et fiction", description: "Lectures pour enfants, adolescents et jeunes lecteurs." },
  { label: "Poésie", subject: "poetry", group: "Littérature et fiction", description: "Recueils, poèmes et formes poétiques." },
  { label: "Philosophie", subject: "philosophy", group: "Histoire et société", description: "Courants de pensée, éthique et grandes questions." },
];
const CURATED_BOOKS = [
  { key: "/works/OL17719508W", title: "After", author_name: ["Anna Todd"], cover_i: 14418944, isbn: ["9781476792545", "9781501100192"], first_publish_year: 2014, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL17576378W", title: "The Kissing Booth", author_name: ["Beth Reekles"], cover_i: 7853724, isbn: ["9780552568814", "0552568813"], first_publish_year: 2012, subject: ["romance", "young adult fiction"], primaryCategorySubject: "romance" },
  { key: "/works/OL19989443W", title: "My Life with the Walter Boys", author_name: ["Ali Novak"], cover_i: 10346801, isbn: ["9781402297861", "9781464218446"], first_publish_year: 2014, subject: ["romance", "young adult fiction"], primaryCategorySubject: "romance" },
  { key: "/works/OL17635842W", title: "The Cellar", author_name: ["Natasha Preston"], cover_i: 7909387, isbn: ["9781492600992", "1492600997"], first_publish_year: 2014, subject: ["thriller", "young adult fiction"], primaryCategorySubject: "mystery" },
  { key: "/works/OL19716870W", title: "Chasing Red", author_name: ["Isabelle Ronin"], cover_i: 9315173, isbn: ["9781492658450", "1492658456"], first_publish_year: 2017, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL20893778W", title: "Corrupt", author_name: ["Penelope Douglas"], cover_i: 10226443, first_publish_year: 2015, subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL24314065W", title: "The Sweetest Oblivion", author_name: ["Danielle Lori"], cover_i: 10831263, first_publish_year: 2018, subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL24390422W", title: "Twisted Love", author_name: ["Ana Huang"], cover_i: 12940491, first_publish_year: 2021, subject: ["dark romance", "romance"], primaryCategorySubject: "romance", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Ana_Huang_Twisted_Love_Tome_01_Version_fran%C3%A7aise?id=RijPEAAAQBAJ" },
  { key: "/works/OL28181491W", title: "God of Malice", author_name: ["Rina Kent"], cover_i: 13291765, first_publish_year: 2022, subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL27310398W", title: "Haunting Adeline", author_name: ["H. D. Carlton"], cover_i: 12992962, first_publish_year: 2021, subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL24847149W", title: "The Maddest Obsession", author_name: ["Danielle Lori"], cover_i: 11699161, first_publish_year: 2019, subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL32153935W", title: "Captive - tome 1", author_name: ["Sarah Rivens"], cover_i: 13179291, first_publish_year: 2022, subject: ["dark romance", "romance"], primaryCategorySubject: "romance", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Sarah_Rivens_Captive_tome_1?id=IGpmEAAAQBAJ" },
  { key: "/works/OL34311111W", title: "Captive - tome 2", author_name: ["Sarah Rivens"], cover_i: 13189657, first_publish_year: 2023, subject: ["dark romance", "romance"], primaryCategorySubject: "romance", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Sarah_Rivens_Captive_tome_2?id=eb2GEAAAQBAJ" },
  { key: "/works/OL45954321W", title: "Lakestone", author_name: ["Sarah Rivens"], cover_i: 15251534, first_publish_year: 2024, subject: ["dark romance", "romance"], primaryCategorySubject: "romance", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Sarah_Rivens_Lakestone_tome_1?id=LfHSEAAAQBAJ" },
  { key: "/works/OL23535656W", title: "Culpa mía", author_name: ["Mercedes Ron"], cover_i: 10512957, first_publish_year: 2014, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL20875338W", title: "Culpa tuya", author_name: ["Mercedes Ron"], cover_i: 10197168, first_publish_year: 2016, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL24341413W", title: "Culpa nuestra", author_name: ["Mercedes Ron"], cover_i: 10864780, first_publish_year: 2014, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL37811572W", title: "Un automne pour te pardonner", author_name: ["Morgane Moncomble"], cover_i: 14579290, first_publish_year: 2023, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL37811574W", title: "Un hiver pour te résister", author_name: ["Morgane Moncomble"], cover_i: 14579292, first_publish_year: 2024, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL37811575W", title: "Un printemps pour te succomber", author_name: ["Morgane Moncomble"], cover_i: 14579293, first_publish_year: 2024, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL37021435W", title: "L'as de cœur", author_name: ["Morgane Moncomble"], cover_i: 14579284, first_publish_year: 2021, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL37811571W", title: "L'as de pique", author_name: ["Morgane Moncomble"], cover_i: 14579287, first_publish_year: 2022, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL28603363W", title: "Falling Again", author_name: ["Morgane Moncomble"], cover_i: 14579295, first_publish_year: 2020, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL24395080W", title: "Viens, on s'aime", author_name: ["Morgane Moncomble"], cover_i: 10932607, first_publish_year: 2017, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL24356973W", title: "Bad At Love", author_name: ["Morgane Moncomble"], cover_i: 10883299, first_publish_year: 2020, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL20512441W", title: "Le voleur de baisers", author_name: ["L. J. Shen"], cover_i: 9164012, first_publish_year: 2019, subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL24205409W", title: "The Air He Breathes", author_name: ["Brittainy C. Cherry"], cover_i: 10648879, first_publish_year: 2015, subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "local:morgane-moncomble-seasons-ete", title: "Un été pour te retrouver", author_name: ["Morgane Moncomble"], isbn: ["9782755670417"], cover_url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1718087832i/205008769.jpg", subject: ["romance"], primaryCategorySubject: "romance" },
  { key: "local:azra-reed-valentina-1", title: "Valentina - tome 1", author_name: ["Azra Reed"], isbn: ["9782755677416"], cover_url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1721013272i/216484520.jpg", subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "local:azra-reed-valentina-2", title: "Valentina - tome 2", author_name: ["Azra Reed"], isbn: ["9782755677423"], cover_url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1734019578i/220065405.jpg", subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "local:azra-reed-valentina-3", title: "Valentina - tome 3", author_name: ["Azra Reed"], isbn: ["9782755677690"], cover_url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1742185003i/223361833.jpg", subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "local:azra-reed-valentina-4", title: "Valentina - tome 4", author_name: ["Azra Reed"], isbn: ["9782755677706"], cover_url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1750396641i/236885165.jpg", subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "local:azra-reed-mariposa-1", title: "Mariposa - tome 1", author_name: ["Azra Reed"], isbn: ["9782755677713"], cover_url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1766129059i/244723978.jpg", subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "local:sarah-rivens-perfectly-wrong", title: "Captive 1.5 - Perfectly Wrong", author_name: ["Sarah Rivens"], isbn: ["9782017206941"], cover_url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1677891871i/72112232.jpg", subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "local:acacia-black-my-missing", title: "My Missing Piece - tome 1", author_name: ["Acacia Black"], isbn: ["9782380157482"], cover_url: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1682571274i/142400503.jpg", subject: ["dark romance", "romance"], primaryCategorySubject: "romance" },
  { key: "/works/OL37534151W", title: "La Prof", author_name: ["Freida McFadden"], cover_i: 14570911, first_publish_year: 2024, subject: ["thriller", "mystery"], primaryCategorySubject: "mystery" },
  { key: "/works/OL37812830W", title: "La Gouvernante", author_name: ["Joy Fielding"], cover_i: 15226914, first_publish_year: 2022, subject: ["thriller", "mystery"], primaryCategorySubject: "mystery" },
  { key: "/works/OL11592991W", title: "Les Valkyries", author_name: ["Paulo Coelho"], cover_i: 11737196, first_publish_year: 1995, subject: ["fiction"], primaryCategorySubject: "fiction" },
  { key: "/works/OL12091280W", title: "Aya de Yopougon", author_name: ["Marguerite Abouet"], cover_i: 8621263, first_publish_year: 2005, subject: ["graphic novels", "comics"], primaryCategorySubject: "fiction" },
  { key: "/works/OL2291647W", title: "Ce que le jour doit à la nuit", author_name: ["Yasmina Khadra"], cover_i: 10352655, first_publish_year: 2008, subject: ["african literature", "fiction"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Yasmina_Khadra_Ce_que_le_jour_doit_%C3%A0_la_nuit?id=JeikJKI7QoEC" },
  { key: "/works/OL4672081W", title: "Une si longue lettre", author_name: ["Mariama Bâ"], cover_i: 14338907, first_publish_year: 1980, subject: ["african literature", "fiction"], primaryCategorySubject: "fiction", language: ["fre"] },
  { key: "/works/OL260368W", title: "L'enfant noir", author_name: ["Camara Laye"], cover_i: 2146203, first_publish_year: 1953, subject: ["african literature", "fiction"], primaryCategorySubject: "fiction", language: ["fre"] },
  { key: "/works/OL661945W", title: "Les soleils des indépendances", author_name: ["Ahmadou Kourouma"], cover_i: 13272075, first_publish_year: 1968, subject: ["african literature", "fiction"], primaryCategorySubject: "fiction", language: ["fre"] },
  { key: "/works/OL1407863W", title: "Les bouts de bois de Dieu", author_name: ["Ousmane Sembène"], cover_i: 5428280, first_publish_year: 1960, subject: ["african literature", "fiction"], primaryCategorySubject: "fiction", language: ["fre"] },
  { key: "/works/OL17841200W", title: "Petit pays", author_name: ["Gaël Faye"], cover_i: 8807223, first_publish_year: 2016, subject: ["african literature", "fiction"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Ga%C3%ABl_Faye_Petit_pays?id=ddxQDAAAQBAJ" },
  { key: "/works/OL8552268W", title: "Kiffe Kiffe demain", author_name: ["Faïza Guène"], cover_i: 13339233, first_publish_year: 2005, subject: ["african literature", "fiction"], primaryCategorySubject: "fiction", language: ["fre"] },
  { key: "/works/OL1230613W", title: "L'Étranger", author_name: ["Albert Camus"], cover_i: 13151269, first_publish_year: 1942, subject: ["fiction", "philosophy"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Albert_Camus_L_%C3%A9tranger?id=8ilBLY4QEGoC" },
  { key: "/works/OL1230715W", title: "La Peste", author_name: ["Albert Camus"], cover_i: 13151272, first_publish_year: 1942, subject: ["fiction"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Albert_Camus_La_Peste?id=AUTxQ3Elx1YC" },
  { key: "/works/OL1063588W", title: "Les Misérables", author_name: ["Victor Hugo"], cover_i: 12721865, first_publish_year: 1862, subject: ["fiction", "history"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Victor_Hugo_Les_mis%C3%A9rables?id=QEiWkZHpHhYC" },
  { key: "/works/OL36287W", title: "Le Comte de Monte-Cristo", author_name: ["Alexandre Dumas"], cover_i: 14566393, first_publish_year: 1830, subject: ["fiction", "adventure"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Alexandre_Dumas_Le_comte_de_Monte_Cristo?id=AzwXAAAAYAAJ" },
  { key: "/works/OL24140275W", title: "L'Élégance du hérisson", author_name: ["Muriel Barbery"], cover_i: 10537618, first_publish_year: 2006, subject: ["fiction"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Muriel_Barbery_L_%C3%A9l%C3%A9gance_du_h%C3%A9risson?id=8L67UUwjSWUC" },
  { key: "/works/OL118986W", title: "Germinal", author_name: ["Émile Zola"], cover_i: 8236935, first_publish_year: 1885, subject: ["fiction"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Emile_Zola_Germinal?id=XGp7EAAAQBAJ" },
  { key: "/works/OL733640W", title: "Le Rouge et le Noir", author_name: ["Stendhal"], cover_i: 8231413, first_publish_year: 1830, subject: ["fiction"], primaryCategorySubject: "fiction", language: ["fre"] },
  { key: "/works/OL1226127W", title: "La Promesse de l'aube", author_name: ["Romain Gary"], cover_i: 598061, first_publish_year: 1961, subject: ["fiction", "autobiography"], primaryCategorySubject: "fiction", language: ["fre"] },
  { key: "/works/OL796465W", title: "L'Alchimiste", author_name: ["Paulo Coelho"], cover_i: 7414780, first_publish_year: 1988, subject: ["fiction"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Paulo_Coelho_L_Alchimiste?id=wLs6DwAAQBAJ" },
  { key: "/works/OL100672W", title: "Candide", author_name: ["Voltaire"], cover_i: 12736044, first_publish_year: 1746, subject: ["fiction", "satire"], primaryCategorySubject: "fiction", language: ["fre"] },
  { key: "/works/OL15724689W", title: "L'Avare", author_name: ["Molière"], cover_i: 7199852, first_publish_year: 1674, subject: ["fiction", "comedy"], primaryCategorySubject: "fiction", language: ["fre"] },
  { key: "/works/OL10263W", title: "Le Petit Prince", author_name: ["Antoine de Saint-Exupéry"], cover_i: 10708272, first_publish_year: 1943, subject: ["juvenile fiction", "fantasy"], primaryCategorySubject: "juvenile fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Antoine_de_Saint_Exup%C3%A9ry_Le_Petit_Prince?id=OYNOgPTtXF4C" },
  { key: "/works/OL2383558W", title: "Le Petit Nicolas", author_name: ["Jean-Jacques Sempé", "René Goscinny"], cover_i: 12856967, first_publish_year: 1960, subject: ["juvenile fiction", "humor"], primaryCategorySubject: "juvenile fiction", language: ["fre"] },
  { key: "/works/OL8551775W", title: "La Nuit des temps", author_name: ["René Barjavel"], cover_i: 9245348, first_publish_year: 1968, subject: ["science fiction"], primaryCategorySubject: "science fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Ren%C3%A9_Barjavel_La_nuit_des_temps_Nouvelle_%C3%A9dition?id=8tRvDwAAQBAJ" },
  { key: "/works/OL16246207W", title: "Le Horla", author_name: ["Guy de Maupassant"], cover_i: 4859675, first_publish_year: 1887, subject: ["fantasy", "horror"], primaryCategorySubject: "fiction", language: ["fre"] },
  { key: "/works/OL1158921W", title: "Les Fleurs du mal", author_name: ["Charles Baudelaire"], cover_i: 8236412, first_publish_year: 1855, subject: ["poetry"], primaryCategorySubject: "poetry", language: ["fre"] },
  { key: "/works/OL14989544W", title: "La Délicatesse", author_name: ["David Foenkinos"], cover_i: 7275798, first_publish_year: 2009, subject: ["romance", "fiction"], primaryCategorySubject: "romance", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/David_Foenkinos_La_d%C3%A9licatesse?id=FYB6m8EnqSoC" },
  { key: "/works/OL19067300W", title: "La Fille de papier", author_name: ["Guillaume Musso"], cover_i: 8381280, first_publish_year: 2010, subject: ["romance", "fiction"], primaryCategorySubject: "romance", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Guillaume_Musso_La_Fille_de_papier?id=IghFDwAAQBAJ" },
  { key: "/works/OL20051787W", title: "Chanson douce", author_name: ["Leïla Slimani"], cover_i: 13099687, first_publish_year: 2016, subject: ["mystery", "thriller"], primaryCategorySubject: "mystery", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Le%C3%AFla_Slimani_Chanson_douce?id=tk1aDwAAQBAJ" },
  { key: "/works/OL22325497W", title: "Nymphéas noirs", author_name: ["Michel Bussi"], cover_i: 10453520, first_publish_year: 2015, subject: ["mystery", "thriller"], primaryCategorySubject: "mystery", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Michel_Bussi_Nymph%C3%A9as_noirs?id=TAmADwAAQBAJ" },
  { key: "/works/OL16805041W", title: "La Vérité sur l'affaire Harry Quebert", author_name: ["Joël Dicker"], cover_i: 7258840, first_publish_year: 2012, subject: ["mystery", "thriller"], primaryCategorySubject: "mystery", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Jo%C3%ABl_Dicker_La_V%C3%A9rit%C3%A9_sur_l_Affaire_Harry_Quebert?id=169VEAAAQBAJ" },
  { key: "/works/OL151071W", title: "Tintin au Tibet", author_name: ["Hergé"], cover_i: 491669, first_publish_year: 1960, subject: ["graphic novels", "comics"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Herg%C3%A9_Tintin_au_Tibet?id=a64_DwAAQBAJ" },
  { key: "/works/OL267622W", title: "Astérix le Gaulois", author_name: ["René Goscinny", "Albert Uderzo"], cover_i: 962725, first_publish_year: 1961, subject: ["graphic novels", "comics"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Ren%C3%A9_Goscinny_Ast%C3%A9rix_Ast%C3%A9rix_le_Gaulois_n_1?id=uhNoEBoae8oC" },
  { key: "/works/OL1230601W", title: "Le Mythe de Sisyphe", author_name: ["Albert Camus"], cover_i: 1014395, first_publish_year: 1941, subject: ["philosophy"], primaryCategorySubject: "philosophy", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Albert_Camus_Le_mythe_de_Sisyphe_Essai_sur_l_absur?id=wFF_DQAAQBAJ" },
  { key: "/works/OL19742677W", title: "La Tresse", author_name: ["Laetitia Colombani"], cover_i: 15163605, first_publish_year: 2017, subject: ["fiction", "women"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Laetitia_Colombani_La_tresse?id=Fd6fDgAAQBAJ" },
  { key: "/works/OL19849088W", title: "Changer l'eau des fleurs", author_name: ["Valérie Perrin"], cover_i: 8647724, first_publish_year: 2018, subject: ["fiction", "romance"], primaryCategorySubject: "fiction", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Val%C3%A9rie_Perrin_Changer_l_eau_des_fleurs?id=hfFIDwAAQBAJ" },
  { key: "/works/OL23017236W", title: "La vie est facile, ne t'inquiète pas", author_name: ["Agnès Martin-Lugand"], cover_i: 10505953, first_publish_year: 2015, subject: ["romance", "fiction"], primaryCategorySubject: "romance", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Agn%C3%A8s_Martin_Lugand_La_vie_est_facile_ne_t_inqui%C3%A8t?id=Vlt4BwAAQBAJ" },
  { key: "/works/OL28601791W", title: "Les gens heureux lisent et boivent du café", author_name: ["Agnès Martin-Lugand"], cover_i: 15125886, first_publish_year: 2014, subject: ["romance", "fiction"], primaryCategorySubject: "romance", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Agn%C3%A8s_Martin_Lugand_Les_gens_heureux_lisent_et_boi?id=tXeiagCQwVQC" },
  { key: "/works/OL16086184W", title: "L'Appel de l'ange", author_name: ["Guillaume Musso"], cover_i: 6904290, first_publish_year: 2011, subject: ["mystery", "romance"], primaryCategorySubject: "mystery", language: ["fre"], ebookUrl: "https://play.google.com/store/books/details/Guillaume_Musso_L_appel_de_l_ange?id=IAhFDwAAQBAJ" },
  { key: "/works/OL1151518W", title: "Discours de la méthode", author_name: ["René Descartes"], cover_i: 8236442, first_publish_year: 1644, subject: ["philosophy"], primaryCategorySubject: "philosophy", language: ["fre"] },
  { key: "/works/OL767941W", title: "Le Deuxième Sexe", author_name: ["Simone de Beauvoir"], cover_i: 78169, first_publish_year: 1949, subject: ["philosophy"], primaryCategorySubject: "philosophy", language: ["fre"] },
];
const CURATED_BOOKS_BY_KEY = new Map(CURATED_BOOKS.map((book) => [book.key, book]));
function hasFrenchEbook(book) {
  return Boolean(book.language?.includes("fre")
    && /^https:\/\/play\.google\.com\/store\/books\/details\//.test(book.ebookUrl || ""));
}

function getWeeklyTrendingBooks(date = new Date()) {
  const weekStart = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const mondayOffset = (new Date(weekStart).getUTCDay() + 6) % 7;
  const monday = weekStart - mondayOffset * 24 * 60 * 60 * 1000;
  const weekIndex = Math.floor((monday - Date.UTC(2020, 0, 6)) / (7 * 24 * 60 * 60 * 1000));
  const subjects = ["romance", "fiction", "mystery", "science fiction", "juvenile fiction", "philosophy"];
  const booksBySubject = new Map(subjects.map((subject) => {
    const books = CURATED_BOOKS.filter((book) =>
      book.primaryCategorySubject === subject
      && hasFrenchEbook(book)
      && book.key
      && Number(book.cover_i) > 0);
    const start = books.length ? weekIndex % books.length : 0;
    return [subject, [...books.slice(start), ...books.slice(0, start)]];
  }));
  const selectionPlan = [
    ["romance", 3],
    ["fiction", 3],
    ["mystery", 2],
    ["science fiction", 1],
    ["juvenile fiction", 1],
  ];
  const selectedBooks = [];
  const selectedKeys = new Set();
  const nextBookIndex = new Map(subjects.map((subject) => [subject, 0]));
  const appendBooks = (subject, limit) => {
    const books = booksBySubject.get(subject) || [];
    let nextIndex = nextBookIndex.get(subject) || 0;
    let added = 0;
    while (nextIndex < books.length && added < limit && selectedBooks.length < 10) {
      const book = books[nextIndex];
      nextIndex += 1;
      if (selectedKeys.has(book.key)) continue;
      selectedKeys.add(book.key);
      selectedBooks.push(book);
      added += 1;
    }
    nextBookIndex.set(subject, nextIndex);
  };
  selectionPlan.forEach(([subject, count]) => appendBooks(subject, count));
  while (selectedBooks.length < 10) {
    const currentCount = selectedBooks.length;
    subjects.forEach((subject) => appendBooks(subject, 1));
    if (selectedBooks.length === currentCount) break;
  }
  return selectedBooks;
}
const CATEGORY_SUBJECT_ALIASES = {
  "fiction": ["fiction", "novel", "novels", "short stories", "fantasy", "fantasy fiction", "african literature", "african fiction", "african novels", "graphic novels", "graphic novel", "comics", "comic books"],
  "mystery": ["mystery", "mystery fiction", "detective fiction", "detective stories", "detective and mystery stories", "crime fiction", "thrillers", "thriller", "spy fiction", "spy stories", "espionage", "espionage fiction", "espionage stories"],
  "romance": ["romance", "romance fiction", "love stories", "dark romance", "erotica", "erotic fiction", "erotic literature", "erotic stories", "erotic novels"],
  "science fiction": ["science fiction", "science fiction stories"],
  "juvenile fiction": ["juvenile fiction", "juvenile literature", "children's fiction", "children's stories"],
  "poetry": ["poetry", "poems"],
  "philosophy": ["philosophy"],
};
const CATEGORY_PREFERENCE = {
  "juvenile fiction": 100,
};
const SEARCH_CACHE_TTL_MS = 5 * 60 * 1000;
const SEARCH_CACHE_MAX_ENTRIES = 32;
const SEARCH_CACHE = new Map();
const SEARCH_REQUESTS = new Map();
const CART_STORAGE_KEY = "biblioflix-cart-v1";
let cartItems = [];
let cartStorageWarning = "";
let cartFeedback = "";
let cartDialog;
let cartStatus;

function getBookCoverUrl(coverId, size = "L") {
  return `https://covers.openlibrary.org/b/id/${encodeURIComponent(coverId)}-${size}.jpg?default=false`;
}

function getBookCoverSources(book, size = "L") {
  const sources = [];
  if (typeof book.cover_url === "string"
    && /^https:\/\/m\.media-amazon\.com\/images\/S\/compressed\.photo\.goodreads\.com\/books\/\d+i\/\d+\.jpg$/.test(book.cover_url)) {
    sources.push(book.cover_url);
  }
  if (Number(book.cover_i) > 0) sources.push(getBookCoverUrl(book.cover_i, size));
  const isbn = Array.isArray(book.isbn)
    ? book.isbn.find((value) => /^\d{10,13}$/.test(String(value).replace(/-/g, "")))
    : "";
  if (isbn) sources.push(`https://covers.openlibrary.org/b/isbn/${encodeURIComponent(String(isbn).replace(/-/g, ""))}-${size}.jpg?default=false`);
  return [...new Set(sources)];
}

function getAppUrl(path = "") {
  const pathname = window.location.pathname;
  const basePath = pathname.endsWith("/")
    ? pathname
    : pathname.slice(0, pathname.lastIndexOf("/") + 1);
  return `${basePath}${String(path).replace(/^\/+/, "")}`;
}

function getBookHref(book, subject = "") {
  const params = new URLSearchParams({
    key: book.key || "",
    title: book.title || "",
    author: book.author_name?.join(", ") || "",
    cover: String(book.cover_i || ""),
    isbn: book.isbn?.[0] || "",
    year: String(book.first_publish_year || ""),
    subject,
  });
  return getAppUrl(`livre.html?${params}`);
}

function normalizeSubject(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getPrimaryCategory(book) {
  const curatedBook = CURATED_BOOKS_BY_KEY.get(book.key);
  if (curatedBook) {
    return CATEGORIES.find((category) => category.subject === curatedBook.primaryCategorySubject) || null;
  }

  const subjects = Array.isArray(book.subject) ? book.subject : [];
  const normalizedSubjects = subjects.map(normalizeSubject);
  const authors = Array.isArray(book.author_name) ? book.author_name : [];
  if (authors.some((author) => normalizeSubject(author) === "gerard de villiers")) {
    const hasSubjectFamily = (subject, families) => families.some((family) =>
      subject === family || subject.startsWith(`${family} `) || subject.includes(` ${family} `));
    const hasEroticFocus = normalizedSubjects.some((subject) => hasSubjectFamily(subject,
      ["erotica", "erotic fiction", "erotic literature", "erotic stories", "erotic novels"]));
    const hasThrillerFocus = normalizedSubjects.some((subject) => hasSubjectFamily(subject,
      ["crime", "detective", "espionage", "investigation", "mystery", "police", "spy", "suspense", "thriller", "thrillers"]));
    const categorySubject = hasEroticFocus && !hasThrillerFocus ? "romance" : "mystery";
    return CATEGORIES.find((category) => category.subject === categorySubject) || null;
  }

  let primaryCategory = null;
  let primaryScore = -1;

  normalizedSubjects.forEach((normalizedSubject) => {
    const fictionSubgenre = normalizedSubject.startsWith("fiction ")
      ? normalizedSubject.slice("fiction ".length)
      : "";
    CATEGORIES.forEach((category) => {
      const aliases = CATEGORY_SUBJECT_ALIASES[category.subject] || [category.subject];
      aliases.forEach((alias) => {
        const normalizedAlias = normalizeSubject(alias);
        const isExactMatch = normalizedSubject === normalizedAlias;
        const isFictionSubgenre = fictionSubgenre === normalizedAlias
          || fictionSubgenre.startsWith(`${normalizedAlias} `);
        if (!isExactMatch && !isFictionSubgenre) return;

        const broadFictionPenalty = category.subject === "fiction" ? 300 : 0;
        const preference = CATEGORY_PREFERENCE[category.subject] || 0;
        const score = (isExactMatch ? 1000 : 800) + normalizedAlias.length + preference - broadFictionPenalty;
        if (score > primaryScore) {
          primaryCategory = category;
          primaryScore = score;
        }
      });
    });
  });

  return primaryCategory;
}

function filterBooksByPrimaryCategory(books, subject) {
  return books.filter((book) => getPrimaryCategory(book)?.subject === subject);
}

async function searchBooks({ query = "", subject = "", page = 1, limit = 30, sort = "" } = {}) {
  const expression = query && subject
    ? `${query} subject:"${subject}" language:fre`
    : query
      ? `${query} language:fre`
      : subject
        ? `subject:"${subject}" language:fre`
        : "subject:fiction language:fre";
  const params = new URLSearchParams({
    q: expression,
    fields: "key,title,author_name,cover_i,isbn,first_publish_year,edition_count,subject,language",
    limit: String(limit),
    page: String(page),
  });
  if (sort) params.set("sort", sort);
  const url = `https://openlibrary.org/search.json?${params}`;
  const cached = SEARCH_CACHE.get(url);
  if (cached && cached.expiresAt > Date.now()) return cached.result;
  if (cached) SEARCH_CACHE.delete(url);

  const pendingRequest = SEARCH_REQUESTS.get(url);
  if (pendingRequest) return pendingRequest;

  const request = (async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Le catalogue a répondu avec le statut ${response.status}.`);
    const data = await response.json();
    const result = {
      total: Number(data.numFound || 0),
      books: (data.docs || []).filter((book) => book.key && book.title),
    };
    SEARCH_CACHE.set(url, { result, expiresAt: Date.now() + SEARCH_CACHE_TTL_MS });
    if (SEARCH_CACHE.size > SEARCH_CACHE_MAX_ENTRIES) {
      SEARCH_CACHE.delete(SEARCH_CACHE.keys().next().value);
    }
    return result;
  })().finally(() => SEARCH_REQUESTS.delete(url));
  SEARCH_REQUESTS.set(url, request);
  return request;
}

function createBookCard(book, subject = "", eager = false) {
  const sources = getBookCoverSources(book);
  if (!sources.length) return null;

  const card = document.createElement("article");
  card.className = "book-card";
  const link = document.createElement("a");
  link.className = "book-card-link";
  link.href = getBookHref(book, subject);
  link.setAttribute("aria-label", `Voir la fiche de ${book.title}`);

  const cover = document.createElement("div");
  cover.className = "cover-frame";
  const image = document.createElement("img");
  image.className = "book-cover";
  image.alt = `Couverture de ${book.title}`;
  image.loading = eager ? "eager" : "lazy";
  if (eager) image.fetchPriority = "high";
  let sourceIndex = 0;
  image.src = sources[sourceIndex];
  image.addEventListener("error", () => {
    sourceIndex += 1;
    if (sources[sourceIndex]) image.src = sources[sourceIndex];
    else card.remove();
  });
  cover.append(image);

  const details = document.createElement("div");
  details.className = "book-info";
  const title = document.createElement("h3");
  title.textContent = book.title;
  const author = document.createElement("p");
  author.textContent = book.author_name?.[0] || "Auteur non renseigné";
  details.append(title, author);
  link.append(cover, details);

  const addButton = document.createElement("button");
  addButton.className = "add-to-cart";
  addButton.type = "button";
  addButton.textContent = "Ajouter au panier";
  addButton.addEventListener("click", () => {
    if (!addToCart(book)) return;
    addButton.textContent = "Ajouté";
    addButton.classList.add("is-added");
    window.setTimeout(() => {
      addButton.textContent = "Ajouter au panier";
      addButton.classList.remove("is-added");
    }, 1400);
  });

  card.append(link, addButton);
  return card;
}

function loadCart() {
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new TypeError("Le contenu du panier n’est pas une liste.");
    const validItems = parsed.filter((item) => (
      item
      && typeof item.key === "string"
      && typeof item.title === "string"
      && typeof item.author === "string"
      && Number.isSafeInteger(item.quantity)
      && item.quantity > 0
    ));
    if (validItems.length !== parsed.length) {
      console.error("Certaines lignes du panier enregistré sont invalides.");
      cartStorageWarning = "Certaines lignes enregistrées n’ont pas pu être récupérées.";
    }
    return validItems;
  } catch (error) {
    console.error("Impossible de lire le panier enregistré :", error);
    cartStorageWarning = "Le panier enregistré n’a pas pu être lu sur cet appareil.";
    return [];
  }
}

function saveCart() {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    cartStorageWarning = "";
  } catch (error) {
    console.error("Impossible d’enregistrer le panier :", error);
    cartStorageWarning = "Le panier ne peut pas être conservé sur cet appareil.";
  }
}

function createCartControl(action, item, text, label, className = "cart-quantity-button") {
  const button = document.createElement("button");
  button.className = className;
  button.type = "button";
  button.dataset.cartAction = action;
  button.dataset.cartKey = item.key;
  button.setAttribute("aria-label", label);
  button.textContent = text;
  return button;
}

function createCartRow(item) {
  const row = document.createElement("li");
  row.className = "cart-item";

  const info = document.createElement("div");
  info.className = "cart-item-info";
  const title = document.createElement("span");
  title.className = "cart-item-title";
  title.textContent = item.title;
  const author = document.createElement("span");
  author.className = "cart-item-author";
  author.textContent = item.author;
  info.append(title, author);

  const controls = document.createElement("div");
  controls.className = "cart-item-controls";
  const decrease = createCartControl("decrease", item, "−", `Réduire la quantité de ${item.title}`);
  const quantity = document.createElement("span");
  quantity.className = "cart-quantity";
  quantity.textContent = String(item.quantity);
  const increase = createCartControl("increase", item, "+", `Augmenter la quantité de ${item.title}`);
  const remove = createCartControl("remove", item, "Retirer", `Retirer ${item.title} du panier`, "cart-remove");
  controls.append(decrease, quantity, increase, remove);
  row.append(info, controls);
  return row;
}

function renderCart() {
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll(".cart-toggle").forEach((toggle) => {
    const count = toggle.querySelector(".cart-count");
    if (count) count.textContent = String(totalQuantity);
    toggle.setAttribute("aria-label", `Ouvrir le panier, ${totalQuantity} article${totalQuantity === 1 ? "" : "s"}`);
    toggle.setAttribute("aria-expanded", String(Boolean(cartDialog?.open)));
  });
  if (!cartDialog) return;

  const list = cartDialog.querySelector(".cart-items");
  const empty = cartDialog.querySelector(".cart-empty");
  const total = cartDialog.querySelector(".cart-total");
  const clear = cartDialog.querySelector(".cart-clear");
  const send = cartDialog.querySelector(".cart-whatsapp");
  list.replaceChildren(...cartItems.map(createCartRow));
  empty.hidden = cartItems.length > 0;
  total.hidden = cartItems.length === 0;
  total.textContent = `${totalQuantity} livre${totalQuantity === 1 ? "" : "s"} au total`;
  clear.disabled = cartItems.length === 0;
  send.disabled = cartItems.length === 0;
  cartStatus.textContent = cartFeedback || cartStorageWarning;
}

function addToCart(book, quantity = 1) {
  const key = typeof book?.key === "string" ? book.key.trim() : "";
  const title = typeof book?.title === "string" ? book.title.trim() : "";
  const authorName = Array.isArray(book?.author_name) ? book.author_name[0] : book?.author;
  const author = typeof authorName === "string" && authorName.trim()
    ? authorName.trim()
    : "Auteur non renseigné";
  if (!key || !title || !Number.isSafeInteger(quantity) || quantity < 1) {
    console.error("Impossible d’ajouter ce livre au panier : ses informations ou sa quantité sont invalides.");
    cartFeedback = "Impossible d’ajouter ce livre au panier.";
    renderCart();
    return false;
  }

  const existing = cartItems.find((item) => item.key === key);
  if (existing) {
    if (!Number.isSafeInteger(existing.quantity + quantity)) {
      cartFeedback = "La quantité demandée est trop élevée.";
      renderCart();
      return false;
    }
    existing.quantity += quantity;
  } else {
    cartItems.push({ key, title, author, quantity });
  }
  cartFeedback = "";
  saveCart();
  renderCart();
  return true;
}

function initializeCart() {
  cartItems = loadCart();
  cartDialog = document.createElement("dialog");
  cartDialog.id = "cart-dialog";
  cartDialog.className = "cart-dialog";
  cartDialog.setAttribute("aria-labelledby", "cart-dialog-title");
  cartDialog.innerHTML = `
    <div class="cart-panel">
      <header class="cart-header">
        <h2 id="cart-dialog-title">Mon panier</h2>
        <button class="cart-close" type="button" aria-label="Fermer le panier">×</button>
      </header>
      <div class="cart-content">
        <p class="cart-empty">Votre panier est vide.</p>
        <ul class="cart-items"></ul>
      </div>
      <footer class="cart-footer">
        <p class="cart-status" role="status" aria-live="polite"></p>
        <p class="cart-total"></p>
        <div class="cart-actions">
          <button class="cart-clear" type="button" data-cart-action="clear">Vider le panier</button>
          <button class="cart-whatsapp" type="button">Envoyer la commande sur WhatsApp</button>
        </div>
      </footer>
    </div>`;
  document.body.append(cartDialog);
  cartStatus = cartDialog.querySelector(".cart-status");

  const cartToggle = document.querySelector(".cart-toggle");
  if (cartToggle) {
    cartToggle.addEventListener("click", () => {
      cartFeedback = "";
      renderCart();
      cartDialog.showModal();
      cartToggle.setAttribute("aria-expanded", "true");
    });
  } else {
    console.error("Le bouton du panier est absent de cette page.");
  }

  cartDialog.querySelector(".cart-close").addEventListener("click", () => cartDialog.close());
  cartDialog.addEventListener("close", () => {
    if (cartToggle) cartToggle.setAttribute("aria-expanded", "false");
  });
  cartDialog.addEventListener("click", (event) => {
    if (event.target === cartDialog) {
      cartDialog.close();
      return;
    }
    const target = event.target instanceof Element ? event.target : null;
    const control = target?.closest("[data-cart-action]");
    if (!control) return;

    const { cartAction, cartKey } = control.dataset;
    if (cartAction === "clear") {
      cartItems = [];
    } else {
      const item = cartItems.find((entry) => entry.key === cartKey);
      if (!item) return;
      if (cartAction === "remove" || (cartAction === "decrease" && item.quantity === 1)) {
        cartItems = cartItems.filter((entry) => entry.key !== cartKey);
      } else if (cartAction === "decrease") {
        item.quantity -= 1;
      } else if (cartAction === "increase") {
        if (!Number.isSafeInteger(item.quantity + 1)) {
          cartFeedback = "La quantité maximale est atteinte.";
          renderCart();
          return;
        }
        item.quantity += 1;
      }
    }
    cartFeedback = "";
    saveCart();
    renderCart();
  });
  cartDialog.querySelector(".cart-whatsapp").addEventListener("click", () => {
    if (!cartItems.length) return;
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const message = [
      "Bonjour, je souhaite commander les livres suivants :",
      ...cartItems.map((item, index) => `${index + 1}. ${item.title} — ${item.author} (quantité : ${item.quantity})`),
      "",
      `Quantité totale : ${totalQuantity} livre${totalQuantity === 1 ? "" : "s"}`,
      "Pouvez-vous me confirmer la disponibilité et le prix ?",
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== CART_STORAGE_KEY) return;
    cartFeedback = "";
    cartItems = loadCart();
    renderCart();
  });
  renderCart();
}

function renderBookCards(container, books, subject = "") {
  let prioritizedCards = 0;
  const cards = books.map((book) => {
    const card = createBookCard(book, subject, prioritizedCards < 6);
    if (card) prioritizedCards += 1;
    return card;
  }).filter(Boolean);
  container.replaceChildren(...cards);
}

document.querySelector("#site-search")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.querySelector("#site-search-input").value.trim();
  const destination = getAppUrl(query ? `catalogue.html?q=${encodeURIComponent(query)}` : "catalogue.html");
  window.location.assign(destination);
});

window.BookStore = {
  categories: CATEGORIES,
  createBookCard,
  getAppUrl,
  getBookCoverUrl,
  getBookCoverSources,
  getBookHref,
  getFrenchCuratedBooks: () => CURATED_BOOKS.filter((book) => book.language?.includes("fre")),
  getCuratedBooksForCategory: (subject) => CURATED_BOOKS
    .filter((book) => book.primaryCategorySubject === subject)
    .sort((first, second) => (
      Number(hasFrenchEbook(second)) - Number(hasFrenchEbook(first))
      || Number(Boolean(second.language?.includes("fre"))) - Number(Boolean(first.language?.includes("fre")))
    )),
  getCuratedBook: (key) => CURATED_BOOKS_BY_KEY.get(key) || null,
  filterBooksByPrimaryCategory,
  addToCart,
  getPrimaryCategory,
  getWeeklyTrendingBooks,
  renderBookCards,
  searchBooks,
};

initializeCart();
