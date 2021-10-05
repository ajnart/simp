# SIMP
## *Simply Interpolated Master Password* is a custom password generator based on an algorithm of your choosing
### How does it work ?
SIMP will generate you a strong password for each website, based on your own algorithm. Allowing you to reverse-engineer it yourself if you ever need to.

### How to use it ?
- First of all, you need to provide a master password. This password will be used to generate the other passwords.

- Then you need to choose an algorithm, using logic blocks we provide.
- Finally, you need to specify the website on which you choose to register, as almost all the logic blocks use the website as a key.

### Example
**Master password**: Toto
**Website used**: https://www.gmail.com
**Algorithm**: `{firstLetterWebsite+2.toUpper}{master}{domainLenght*2}{domainExtension.lastLetter+1}`

**Password generated**: `IToto10n`
#### Explaination:
``firstLetterWebsite`` : **g**+2 postions in the alphabet is "i", ``toUppercase`` --> "I"  
``master`` : Toto --> Toto  
``domainLenght*2`` : ``len(gmail)`` * 2 --> **10**  
``domainExtension.lastLetter+1``: ``.com`` .``lastLetter+1`` --> m+1 --> **n**