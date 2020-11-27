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
    > Réponse JSON : {
	"0": {
		"usersLiked": [],
		"usersDisliked": [],
		"_id": "5fc0cce5c1fe9a168ce9c564",
		"name": "Sripacha",
		"manufacturer": "Swag",
		"description": "45Ds",
		"mainPepper": "chilli pepper",
		"heat": 2,
		"imageUrl": "http://localhost:3000/images/Sripacha.jpg1606470885761.jpg",
		"userId": "5fc0cc29c1fe9a168ce9c563",
		"likes": 0,
		"dislikes": 0,
		"__v": 0
	} ...

GET /:id
Permet de récupérer les informations d'une sauce précise a partir de son ID
    > Attendu : /ID
    > Réponse JSON {
	"usersLiked": [],
	"usersDisliked": [],
	"_id": "5fc0cce5c1fe9a168ce9c564",
	"name": "Sripacha",
	"manufacturer": "Swag",
	"description": "Description",
	"mainPepper": "chilli pepper",
	"heat": 2,
	"imageUrl": "http://localhost:3000/images/Sripacha.jpg1606470885761.jpg",
	"userId": "5fc0cc29c1fe9a168ce9c563",
	"likes": 0,
	"dislikes": 0,
	"__v": 0
}

POST /
Permet d'ajouter une sauce à la liste
    > Attendu : model de sauce : name / manufacturer / description / mainPepper / heat / imageUrl / userId
    > Réponse JSON :
-----------------------------412904567211547511972594708190
Content-Disposition: form-data; name="sauce"

{"name":"PokkY","manufacturer":"Denver","description":"Desc","mainPepper":"poivre","heat":2,"userId":"5fc0cc29c1fe9a168ce9c563"}
-----------------------------412904567211547511972594708190
Content-Disposition: form-data; name="image"; filename="blairs.jpg"
Content-Type: image/jpeg

ÿØÿà

PUT /:id
Permet de mettre à jour une sauce que vous avez créée.
    Attendu > model de sauce : name / manufacturer / description / mainPepper / heat / imageUrl(facultatif) / userId
    Réponse > Retour a la page d'accueil & sauvegarde des changement en base.

DELETE /:id
Vous permet de supprimer une sauce que vous avez créée.
    > Attendu : /ID

POST /:id/like
Permet à tous les utilisateurs authentifiés d'aimer ou non une sauce dans la liste.
    > Attendu : {"userId":"5fc0cc29c1fe9a168ce9c563","like":1}
    > Réponse JSON : {"message": "Like pris en compte !"}

- -1 n'aime pas
- 0 annule un choix
- 1 aime

En cas d'érreurs, plusieurs messages peuvent s'affichier.