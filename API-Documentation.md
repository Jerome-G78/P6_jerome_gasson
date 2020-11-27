[Documentation]

Accès aux différentes API :

i - Toutes les routes requièrent une authentification, il s'agit d'une API privé.

POST /singup
Permet de vous inscrire sur le site
    > Attendu : {"email":"Mail@Provider.com","password":"MDP"}
    > Réponse JSON : "Utilisateur Crée!"

POST /login
Permet de vous authentifiés sur le site
    > Attendu : {"email":"Mail@Provider.com","password":"MDP"}
    > Réponse JSON : {"userId":"UID","token":"çà'_éè-..."}

GET /
Permet de récupérer le tableau des sauces

GET /:id
Permet de récupérer les informations d'une sauce précise

POST /
Permet d'ajouter une sauce à la liste

PUT /:id
Permet de mettre à jour une sauce que vous avez créée.

DELETE /:id
Vous permet de supprimer une sauce que vous avez créée.

POST /:id/like
Permet à tous les utilisateurs authentifiés d'aimer ou non une sauce dans la liste.
- -1 n'aime pas
- 0 annule un choix
- 1 aime