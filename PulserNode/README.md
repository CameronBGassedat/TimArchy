# Pulser Service

Le rôle du pulser est d'envoyer de la donnée fictive vers la base de donnée locale. Cette donnée envoyée simule les informations qu'enverront les capteurs et les actuateurs qui seront installés dans le ou les bâtiments.


# Utilisation

**Environnement sans docker :**

Dans un terminal, il faut:
 1. Se placer à la racine du projet
 2. Lancer la commande `ts-node src/app.ts`
 3. Aller sur le navigateur et ouvrir la page http://localhost:3000/  et vérifier qu'un json contenant de la data est bien affichée

**Environnement avec Docker :**

Dans un terminal, il faut:
 1. Se placer à la racine du projet
 2. Créer l'image docker avec la commande `docker build . -t [IMAGE NAME]`
 3. Lancer l'image avec la commande `docker run [IMAGE NAME]`
 4. Aller sur le navigateur et ouvrir la page http://localhost:3000/  et vérifier qu'un json contenant de la data est bien affichée