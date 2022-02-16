# SIMP

## _Simply Interpolated Master Password_ is a custom password generator based on an algorithm of your choosing

### How does SIMP work ?

SIMP will generate you a strong password for each website, based on your own
algorithm. Allowing you to reverse-engineer it yourself if you ever need to.

### How to use SIMP ?

#### Config

First of all, you need launch the CLI with `simp config` to make a new config.

- provide a master password. This password will be used to generate the other
  passwords.
- choose an algorithm, using logic blocks we provide.

Once the config is done, the info you entered will be saved in
`~/.config/simp/config.json`, allowing you to load it from the regular cli.

#### Using the cli

You can start using the cli by just typing `simp` (if the binary is in your
path) or also using one of the many flags we have implemented.\
If you need to see a list of all the flags for ovverriding the config, you can
always type `simp -h`\
Flags like `-a`, `-p`, `-w` are used to override a certain value in the config.\
They will not change the config file, but will use the value you provided.\
_We assume that you want to load the config file if provide at least one
override._\
A quick way of just generating a password is to just type `simp -w website.com`

### Example password generation:

**Master password**: Toto\
**Website used**: https://www.gmail.com\
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
