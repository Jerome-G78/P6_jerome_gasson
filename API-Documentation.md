[Documentation]
---------------------------
Accès aux différentes API :
===========================
i - Toutes les routes requièrent une authentification, il s'agit d'une API privé.
===========================
## I - USER

	1.	POST /singup ---: Permet de vous inscrire sur le site
	2.	POST /login ----: Permet de vous authentifiés sur le site

## II - SAUCES

	1.	GET / ----------: Permet de récupérer le tableau des sauces
	2.	GET /:id -------: Permet de récupérer les informations d'une sauce précise a partir de son ID
	3.	POST / ---------: Permet d'ajouter une sauce à la liste
	4.	PUT /:id -------: Permet de mettre à jour une sauce que vous avez créée.
	5.	DELETE /:id ----: Vous permet de supprimer une sauce que vous avez créée.
	6.	POST /:id/like -: Permet à tous les utilisateurs authentifiés d'aimer ou non une sauce dans la liste.
---------------------------

## [USER]
1. POST /singup
> POST http://NomDuSite.com/singup/

Permet de vous inscrire sur le site
- Attendu : 
```

	email: { type: String, required: true, unique: true },
 	password: { type: String, required: true } 

```

- Réponse JSON : "Utilisateur Crée!"
---------------------------

2. POST /login
> POST http://NomDuSite.com/login/

Permet de vous authentifiés sur le site
- Attendu : 
`	email: { type: String, required: true, unique: true },
 	password: { type: String, required: true } `

- Réponse JSON : `{"userId":"UID","token":"çà'_éè-"}`
---------------------------

## [SAUCES]
1. GET /
> GET http://NomDuSite.com/

Permet de récupérer le tableau des sauces
- Réponse JSON : {
	"0": {
		"usersLiked": [],
		"usersDisliked": [],
		"_id": "String",
		"name": "String",
		"manufacturer": "String",
		"description": "String",
		"mainPepper": "String",
		"heat": Number,
		"imageUrl": "String",
		"userId": "String",
		"likes": Number,
		"dislikes": Number,
		"__v": 0
	} ...
---------------------------

2. GET /:id
> GET http://NomDuSite.com/5fc0cce5c1fe9a168ce9c564/

Permet de récupérer les informations d'une sauce précise a partir de son ID
- Attendu : /ID
- Réponse JSON {
	"usersLiked": [],
	"usersDisliked": [],
	"_id": "String",
	"name": "String",
	"manufacturer": "String",
	"description": "String",
	"mainPepper": "String",
	"heat": Number,
	"imageUrl": "String",
	"userId": "String",
	"likes": Number,
	"dislikes": Number,
}
---------------------------

3. POST /
> POST http://NomDuSite.com/

Permet d'ajouter une sauce à la liste
- Attendu : 
	name: { type: String, required: true },
	manufacturer: { type: String, required: true },
	description: { type: String, required: true },
	mainPepper: { type: String, required: true },
	heat: { type: Number, required: true },
	imageUrl: { type: String, required: true },
	userId: { type: String, required: true },
	likes: { type: Number},
	dislikes: {type: Number},
	usersLiked: [{type: String}],
	usersDisliked: [{type: String}]

- Réponse JSON :
-----------------------------412904567211547511972594708190
Content-Disposition: form-data; name="sauce"

- {"name":"PokkY","manufacturer":"Denver","description":"description","mainPepper":"poivre","heat":2,"userId":"5fc0cc29c1fe9a168ce9c563"}
-----------------------------412904567211547511972594708190
Content-Disposition: form-data; name="image"; filename="blairs.jpg"
Content-Type: image/jpeg
---------------------------

4. PUT /:id
> PUT http://NomDuSite.com/5fc0cce5c1fe9a168ce9c564/

Permet de mettre à jour une sauce que vous avez créée.
- Attendu : name / manufacturer / description / mainPepper / heat / imageUrl(facultatif) / userId
- Réponse : Retour a la page d'accueil & sauvegarde des changement en base.
---------------------------

5. DELETE /:id
> DELETE http://NomDuSite.com/5fc0cce5c1fe9a168ce9c564/

Vous permet de supprimer une sauce que vous avez créée.
- Attendu : /ID
---------------------------

6. POST /:id/like
> POST http://NomDuSite.com/5fc0cce5c1fe9a168ce9c564/like/

Permet à tous les utilisateurs authentifiés d'aimer ou non une sauce dans la liste.
- Attendu : {"userId":"String","like":Number}
- Réponse JSON : {"message": "Like pris en compte !"}

- -1 n'aime pas
- 0 annule un choix
- 1 aime

---------------------------
En cas d'érreurs, plusieurs messages peuvent s'affichier.