# ADR-001: Base de dades del projecte

## Context
Necessitem una base de dades flexible per emmagatzemar productes (espases làser), usuaris i comandes.  
Com que les relacions no són sempre rígides i poden variar amb el temps (per exemple, afegir camps nous a productes), una base de dades NoSQL és una bona opció.  

## Decisió
Farem servir **MongoDB** com a base de dades principal, gestionada via **Docker** per facilitar la portabilitat i el desplegament en qualsevol entorn.  

## Conseqüències
**Positives:**
- Flexibilitat per afegir nous camps i entitats sense modificar esquemes rígids.
- Integració senzilla amb Node.js/Express i llibreries com Mongoose.
- Bona escalabilitat horitzontal.  

**Negatives:**
- Menys adequat per a consultes molt relacionals o join complexes.
- Pot requerir més cura per mantenir la consistència de dades.
