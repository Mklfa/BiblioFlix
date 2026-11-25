# BiblioFlix

Librairie en ligne en français avec des pages dédiées à l’accueil, au catalogue, aux catégories et à chaque livre.

## Démarrer

1. Installez [Node.js](https://nodejs.org/) si nécessaire.
2. Ouvrez un terminal dans le dossier du projet.
3. Lancez `npm start`.
4. Visitez [http://localhost:3000](http://localhost:3000).

Aucune dépendance supplémentaire n’est nécessaire.

## Installer BiblioFlix

Une proposition d’installation s’affiche sur le site. Sur Windows, le bouton télécharge un installateur `.exe` avec le logo B rouge, qui ouvre le même BiblioFlix hébergé sur Cloudflare. Sur Android, le bouton télécharge un APK, installable depuis n’importe quel navigateur après autorisation d’installer des applications provenant de cette source. Sur iPhone, il affiche les étapes Safari (« Partager », puis « Sur l’écran d’accueil »), car iOS n’autorise pas l’installation d’un APK. Les recherches, les couvertures externes et les commandes WhatsApp nécessitent une connexion Internet.

L’installateur Windows est généré et publié automatiquement comme pièce jointe d’une version GitHub publique par `.github/workflows/windows-app.yml`.

L’application Android est compilée et publiée automatiquement par `.github/workflows/android-app.yml`.
Comme la signature Android de compilation est générée sur chaque exécution, une mise à jour peut nécessiter de désinstaller l’ancienne version avant d’installer le nouvel APK.

## Publication sur GitHub Pages

Le workflow `.github/workflows/pages.yml` publie automatiquement le contenu de `public/` après chaque push sur `main`. Le dépôt source peut rester privé, mais le site publié est accessible publiquement. Les liens de l’application s’adaptent au sous-répertoire GitHub Pages.

## Pages

- `public/index.html` : accueil et sélections de livres.
- `public/catalogue.html` : recherche, filtres et chargement continu au défilement.
- `public/categories.html` : catégories classées par thème.
- `public/livre.html` : présentation, couverture, thèmes associés et commande.
- `public/confidentialite.html` : déclaration de confidentialité et fonctionnement des données.

Le catalogue et les couvertures Open Library sont complétés par une sélection francophone, sans retirer les autres livres. Les fiches dont l’existence d’un ebook français est vérifiée sur Google Play Books France conservent leur lien source; elles passent avant les autres titres francophones dans les catégories et alimentent les tendances hebdomadaires. Les résultats Open Library utilisent le filtre de langue française, mais ne sont pas tous vérifiés individuellement comme ebooks. Les fiches privilégient les présentations françaises et affichent la présentation disponible dans une autre langue si aucune version française n’est trouvée. Les commandes directes WhatsApp contiennent le titre, l’auteur, la référence et la quantité demandée. Le prix et la disponibilité sont à confirmer par message.

Chaque œuvre est affectée à une seule catégorie principale d’après ses sujets, en privilégiant le genre le plus précis. Les recherches indépendantes d’une catégorie sont lancées en parallèle; les premières couvertures sont prioritaires, et les suivantes se chargent au défilement.

Les titres issus de Wattpad sont intégrés à leur genre principal : les romances dans « Romance » et les thrillers dans « Policier et thriller ». La fantasy et le fantastique restent dans « Romans », tandis que les œuvres africaines ont leur catégorie dédiée, des classiques aux auteurs contemporains. Les bandes dessinées, mangas et livres consacrés aux animés sont exclus du catalogue, des recherches et des recommandations. Pour élargir la sélection de romances sombres, « Romance » combine les résultats généraux et une recherche Open Library dédiée à ce sujet. Les résultats se chargent au défilement, restent classés dans « Romance » et sont dédoublonnés. Les œuvres de Gérard de Villiers sont recherchées dans « Romance » et « Policier et thriller » : elles sont classées en romance lorsque leur fiche indique un genre érotique sans genre policier ou d’espionnage, et en thriller sinon.

La sélection éditoriale de « Romance » inclut aussi des titres visibles sur les photos fournies (notamment Sarah Rivens, Azra Reed, Mercedes Ron et Morgane Moncomble). Les titres hors Open Library sont identifiés par ISBN et associés à une couverture concordante issue de leur fiche bibliographique. Les cartes dont aucune image de couverture vérifiée ne se charge sont masquées plutôt que remplacées par une vignette vide ou générique.

Le panier est conservé dans le navigateur : les lecteurs peuvent ajouter plusieurs livres, modifier les quantités et envoyer toute la sélection dans un seul message WhatsApp. La commande directe depuis une fiche de livre reste disponible. Le numéro WhatsApp est configuré pour le numéro fourni au Sénégal (`+221 75 557 60 94`). Pour le modifier, changez `WHATSAPP_PHONE` dans `public/common.js`.

L’accueil affiche dix livres sélectionnés dans le catalogue, renouvelés automatiquement chaque lundi et répartis entre plusieurs catégories, avec une place renforcée pour la romance et la dark romance. Les tendances sont une sélection éditoriale, et non un classement des ventes en temps réel.
