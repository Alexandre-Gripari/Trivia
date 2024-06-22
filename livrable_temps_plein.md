# ***Rapport final :***

Justification/explication des tests réalisés :
On utilise 3 critères pour mieux se représenter l’importance de chaque scénario :
-	Utilité pour le fonctionnement global
-	Fréquence d’utilisation pour les patients
-	Fréquence d’utilisation les soignantes

### 1)	Jouer une partie :
   
C’est le scénario principal de notre site car il est directement destiné aux personnes visées par notre projet. Il est essentiel de pouvoir jouer une partie sans qu’il n’y ait de confusion possible, c’est-à-dire un problème (occasionnel ou non) qui pourrait mettre le doute au joueur quant à sa façon de jouer ou quant à la manière dont il doit jouer. Il est le scénario qui sera le plus souvent joué et qui permet de répondre au premier besoin de l’utilisateur qui est de jouer une partie. En résumé si ce scénario ne se déroule pas correctement c’est l’objectif principal du site qui n’est pas satisfait et les autres parties du site seront alors faussées également. Les statistiques pourront être faussées, le quiz créer d’une certaine manière pour répondre à un profil particulier pourrait donc ne pas se dérouler comme souhaité et la personnalisation de quiz perdrait de son sens. Le persona principal qui est le patient serait insatisfait.

Comment se déroule ce scénario : On entre dans la liste des utilisateurs et on lance un quiz pour le premier utilisateur en vérifiant que les boutons qui permettent d’accéder aux quiz des utilisateurs sont bien présents, on joue le quiz en cochant des mauvaises réponses et en utilisant parfois le bouton indice, on vérifie que les mauvaises réponses sélectionnées disparaissent et que le bouton indice disparaît lorsqu’il n’y a plus d’indices. On vérifie que l’on passe bien à la question suivante lorsqu’une bonne réponse est sélectionnée (en vérifiant que la bonne réponse précédente n’apparaît plus et que les 4 réponses possibles de la question suivante apparaissent). Enfin on vérifie que la page de fin de partie apparaît.

Notes sur les critères : 
o	Utilité pour le fonctionnement global : 9/10
o	Fréquence d’utilisation pour les patients : 10/10
o	Fréquence d’utilisation les soignantes : 2/10 (pour tester)
Note générale : 21/30

### 2)	Créer un quiz
   
Pouvoir créer un quiz correctement (rapidement et sans confusion possible dans l’ajout de questions et d’indices) est essentiel pour fournir une expérience adaptée aux patients. Si les quiz créés ne correspondent pas aux attentes des soignantes, il y aura une incompréhension au moment de jouer le quiz ou de revoir les statistiques. Cela représentera une perte de temps et irait à l’encontre de l’expérience des utilisateurs, autant pour le patient qui pourrait ne pas pouvoir jouer le quiz voulu que pour les soignantes qui ne pourraient pas exploiter les statistiques significatives voulues.

Comment se déroule ce scénario : On lance la création d’un quiz depuis la page d’accueil, on entre le thème et le titre du quiz puis on ajoute des questions en entrant la question à poser, les réponses possibles en cochant celle qui est juste et les indices qu’ils soient textuelles, visuels ou sonores. On supprime l’une des questions créées pour qu’elle ne fasse plus partie du quiz en cours de création. On valide la création du quiz et on va vérifier dans la liste des quiz que celui que l’on a créé est bien présent. 

Notes sur les critères : 
o	Utilité pour le fonctionnement global : 9/10
o	Fréquence d’utilisation pour les patients : 0/10
o	Fréquence d’utilisation les soignantes : 6/10
Note générale : 15/30

### 3)	Créer un utilisateur
Pouvoir créer un utilisateur permet de lui relier des quiz créés et des statistiques qui lui sont propres. L’objectif est de suivre indépendamment les patients en leur attribuant des quiz personnalisés et de pouvoir analyser leur évolution. Pouvoir gérer l’expérience d’un patient de manière distinct fait partie de ce qui permet le suivi d’un patient.

Comment se déroule ce scénario : On va dans la page de création d’un utilisateur depuis la page d’accueil, on rentre les informations d’un utilisateur (nom, prénom, photo de profil qui est optionnel, date de naissance), on valide la création de l’utilisateur, on vérifie qu’il est bien créé.

Notes sur les critères : 
o	Utilité pour le fonctionnement global : 9/10
o	Fréquence d’utilisation pour les patients : 0/10
o	Fréquence d’utilisation les soignantes : 4/10
Note générale : 13/30


### 4)	Consulter les statistiques
   
Les statistiques vont permettre un suivi des patients dans le temps, elles vont être un indicateur de ce qui pose un problème ou non à un patient et donc de quelles modifications il faudrait apporter aux quiz donnés à un profil particulier. Pouvoir accéder correctement aux statistiques, qu’elles soient présente directement après avoir joué un quiz permet un suivi juste d’un patient.

Comment se déroule ce scénario : On joue un premier quiz en partant de la liste des utilisateurs puis dans la liste des quiz d’un utilisateur (le premier) pour ensuite aller, une fois la partie terminée, dans les statistiques pour avoir une première visualisation des statistiques globales. On rejoue un quiz en allant dans la liste des quiz de l’utilisateur dont on regarde les statistiques depuis la page des statistiques. On retourne une dernière fois dans la page des statistiques pour vérifier que la liste des quiz effectués ainsi que les statistiques sur les indices utilisés (graphique) sont mises à jour et on clique sur l’un des quiz effectués pour vérifier que les statistiques liées au dernier quiz effectué ont bien été prises en compte.



Notes sur les critères : 
o	Utilité pour le fonctionnement global : 6/10
o	Fréquence d’utilisation pour les patients : 0/10
o	Fréquence d’utilisation les soignantes : 6/10
Note générale : 12/30

En résumé, le scénario le plus important est jouer un quiz car il concerne les patients directement et leur expérience sur le site (c’est le cœur du projet), il vient avant le scénario créer un quiz car si un quiz est correctement créé mais qu’il n’est pas joué comme il devrait l’être, sa création et sa personnalisation perd de sons sens et de son utilité. Créer un utilisateur vient ensuite car une fois les deux premiers scénarios complétés, pouvoir créer un utilisateur permet de lui lier les quiz créés. Enfin une fois que les quiz sont créés et joués comme voulu et que les utilisateurs sont créés correctement, on peut calculer les statistiques sur un quiz joué et les attribuer à un utilisateur, voilà pourquoi consulter les statistiques est le scénario qui vient en dernier.

## **Docker**

**Etape 1 : Fait**

Nous avons 2 Dockerfile un pour générer le conteneur du front et l’autre pour générer le conteneur du backend. 

**Etape 2 : Fait**

Exécuter : run.sh

On a un docker compose : docker-compose.yml. Il dépend des deux Dockerfile, créer lors de l’étape 1. 

Le service du back :
Il y a une redirection du port 8081 vers le port 9428, on détermine un volume qui nous permet de stocker et de récupérer la base de données (le dossier data base). On effectue un Heath check dessus. 

Le service du front :
Il y a une redirection du port 80 vers le port 80. Le front dépend du backend, il faut que le service soit healthy. 
On utilise NGNINX qui tant que reverse proxy en plus d’hebergeur, ce qui nous permet de définir l’url du backend à travers une variable d’environnement dans le docker compose qui sera lu dans default.conf.template . La machine hôte communique avec Nginx pour qu’il communique ensuite avec le backend.

**Etape 3 : Fait**

Exécuter run-e2e.sh

On a un deuxième docker-compose docker-compose-e2e.yml. Il dépend de 3 Dockerfile (un Dockerfile.e2e dans le front le Dockerfile qui se situent dans le front et le Dockerfile dans le backend).
Le Dockerfile.e2e dans le front se charge de lancer les tests
Le Dockerfile dans le back se charge de lancer le backend en mode test.
Le Dockerfile du front reste inchangé est permet de lancer le front

Les deux premiers services restent presque inchangé, mais la redirection dans le back est du port 8080 :9428 maintenant. 
De plus dans le docker compose on modifie le entrypoint pour lancer le back en test.

En ce qui concerne le service e2e-tests. Il dépend du health check sur le front et définie grâce à une variable d’environnement l’adresse du front end. On définit également 2 volumes pour récupérer les résultats dans un json ( test-results.json) qui se trouve dans un dossier nommé reports contenu dans le dossier ops et également les vidéos et screen shots qui se retrouvent organisés par test dans un dossier nommé tests dans le dossier ops.
