# Att göra

Det här låter som en väldigt bra nivå för dig nu. Tillräckligt stort för att börja stöta på “riktiga” formulärproblem, men fortfarande hanterbart utan att drunkna i komplexitet.

Jag skulle rekommendera att du bygger det först med vanlig React-state. Sedan _kan_ du senare refaktorera till React Hook Form.

---

# Kravspec – Login/Register till Concept Webstore

## Översikt

Skapa:

- en login-sida,
- en register-sida,
- enkel användarhantering i frontend.

Du behöver inte backend ännu. Du kan simulera användare med:

- localStorage,
- Zustand store,
- eller mockad data.

---

# Funktionalitet

## Register

Användaren ska kunna skapa konto med:

### Fält

- Förnamn
- Efternamn
- Email
- Lösenord
- Bekräfta lösenord

---

## Validering

### Förnamn / Efternamn

- obligatoriska
- minst 2 tecken

---

### Email

- obligatorisk
- måste innehålla giltigt email-format

Exempel:

```txt id="r4v4gf"
test@test.com
```

---

### Lösenord

- obligatoriskt
- minst 6 tecken

---

### Bekräfta lösenord

- måste matcha lösenord

---

## Error messages

Visa tydliga felmeddelanden under respektive input.

Exempel:

```txt id="vbhq7m"
Password must be at least 6 characters
```

---

# Submit-beteende

När formuläret skickas:

## Om allt är korrekt

- användaren sparas
- visa success message
- redirect till login

---

## Om email redan finns

Visa:

```txt id="8gx61y"
An account with this email already exists
```

---

# Login

## Fält

- Email
- Lösenord

---

## Validering

- båda obligatoriska

---

## Login-logik

Om användaren finns:

- logga in användaren
- spara auth state
- redirect till startsida/profil

Om fel:

```txt id="uvf2gc"
Invalid email or password
```

---

# Auth state

Du kan exempelvis lagra:

```js id="2cyp3s"
{
  user: {},
  isAuthenticated: false
}
```

i:

- Zustand,
- Context,
- eller localStorage.

---

# Extra features (bra övning)

Du behöver inte göra allt direkt.

---

## 1. Visa/dölj lösenord

Knapp/icon för:

```txt id="9d6a1j"
Show password
```

Bra övning för state.

---

## 2. Loading state

När formuläret submitas:

- disable knapp
- visa loading-text/spinner

Simulera gärna delay med:

```js id="23jnpn"
setTimeout();
```

---

## 3. “Already have an account?”

Länka mellan:

- Login
- Register

Bra routing-övning.

---

## 4. Persist login

Om sidan laddas om:

- användaren ska fortfarande vara inloggad.

Bra övning för:

- localStorage,
- Zustand persist middleware.

---

# Bra komponentuppdelning

Försök tänka lite komponentansvar här.

Exempel:

```txt id="g83q88"
AuthPage
LoginForm
RegisterForm
FormInput
PasswordInput
ErrorMessage
```

---

# Viktigt mål med övningen

Inte bara:

> “få det att fungera”

Utan att börja känna:

- formulärstruktur,
- validering,
- återanvändbara inputs,
- submit-flöden,
- auth state,
- användarfeedback.

Det här är väldigt nära riktiga frontend-problem.

---

# Min rekommendation

Bygg detta i ungefär denna ordning:

1. UI först
2. Lokal state
3. Validering
4. Error messages
5. Submit
6. Auth state
7. localStorage
8. Refaktorera

Och först därefter:

> “Hur hade React Hook Form hjälpt här?”
