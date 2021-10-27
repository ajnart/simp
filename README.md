# SIMP

## _Simply Interpolated Master Password_ is a custom password generator based on an algorithm of your choosing

### How does it work ?

SIMP will generate you a strong password for each website, based on your own
algorithm. Allowing you to reverse-engineer it yourself if you ever need to.

### How to use it ?

- First of all, you need to provide a master password. This password will be
  used to generate the other passwords.

- Then you need to choose an algorithm, using logic blocks we provide.
- Finally, you need to specify the website on which you choose to register, as
  almost all the logic blocks use the website as a key.

### Example

**Master password**: Toto  
**Website used**: https://www.gmail.com  
**Algorithm**: `{domainName.firstLetter+2.toUpper}{master}{domainName.lenght*2}{domainExtension.lastLetter+1}`

**Password generated**: `IToto10n`

#### Explaination:

`domainName.firstLetter` : **g**+2 postions in the alphabet is "i",
`toUppercase` --> "I"\
`master` : Toto --> Toto\
`domainName.length*2` : `len(gmail)` * 2 --> **10**\
`domainExtension.lastLetter+1`: `.com` .`lastLetter+1` --> m+1 --> **n**

### Avilable Logic Blocks, Attributes and Modifiers

#### Logic Blocks

- ``domainName``: the name of the website used to generate the password  
- ``domainExtension``: the extension of the website used  
- ``master``: the master password (**required**)  

#### Attributes

- ``firstLetter``: the first letter of the website/master/domain
- ``lastLetter``: the last letter of the website/master/domain
- ``length``: the length of the website/master/domain

#### Modifiers

- ``*`` : Modifier to apply a multiplication to an attribute
- ``+`` : Modifier to apply an addition to an attribute
- ``-`` : Modifier to apply a subtraction to an attribute

**NOTES :**

- Comment on fait ?
On split aux {}, on extrait les blocs logiques -> Attributs --> Modifiers
Erreur : Retry (FEAT: Flêche qui affiche où est l'erreur dans l'algo)
Erreur : Pas deux attributs
Erreur : Pas deux modifiers pareils
Erreur : Pas de modifiers sur des blocs logiques qui ne font pas sens. ("gmail+2" = ERREUR, "gmail*2" = OK)
Ensuite on prends la ``str``, on lance la fonction qui correspond au bloc logique correspondant, avec ses attributs et ses modifiers sous forme de ``FonctionBlock(Attributs?, Modifiers?)`` 

LEGENDE: ? = Variable optionelle
