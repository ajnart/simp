# SIMP

## _Simply Interpolated Master Password_ is a custom password generator based on an algorithm of your choosing

### How does it work ?

SIMP will generate you a strong password for each website, based on your own
algorithm. Allowing you to reverse-engineer it yourself if you ever need to.

### How to use it ?

- First of all, you need to provide a master password. This password will be
  used to generate the other passwords.
- Then, you need to choose an algorithm, using logic blocks we provide.
- Finally, you need to specify the website on which you choose to register, as
  almost all the logic blocks use the website as a key.

### Example

**Master password**: Toto\
**Website used**: https://www.gmail.com  
**Algorithm**:
`{domainName.firstLetter.toUpper}{master}{domainName.length}{domainExtension.lastLetter}`

**Password generated**: `GToto5m`

#### Explaination:

`domainName.firstLetter` : **g**,\
`toUppercase` : **G**,\
`master` : Toto : Toto\
`domainName.length` : `len(gmail)` : **5**\
`domainExtension.lastLetter+1`: `.com` .`lastLetter` : **m**

### Avilable Logic Blocks, Attributes and Modifiers

#### Logic Blocks

- `domainName`: the name of the website used to generate the password
- `domainExtension`: the extension of the website used
- `master`: the master password (**required**)

#### Attributes

- `firstLetter`: the first letter of the website/master/domain
- `lastLetter`: the last letter of the website/master/domain
- `length`: the length of the website/master/domain
- `toUpper`: the website/master/domain in uppercase
- `toLower`: the website/master/domain in lowercase
- `capitalize`: the website/master/domain in capitalized form
- `reversed`: the website/master/domain in reverse
