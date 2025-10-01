# ADR-002: Estructura inicial del projecte

## Context
Hem de decidir com organitzar el codi del projecte de la botiga d’espases làser.  
Opcions:
- **Monorepo:** tot el codi (frontend, backend, docs) en un sol repositori.
- **Repos separats:** un repositori per al backend, un per al frontend, etc.

Com que és un projecte d’assignatura i volem simplicitat, és important que tothom de l’equip pugui accedir i treballar de forma senzilla.

## Decisió
Farem servir una **estructura de monorepo**, amb una única carpeta `backend/`, `frontend/` i `docs/` dins del mateix repositori de GitHub.  

## Conseqüències
**Positives:**
- Més fàcil de gestionar en un entorn d’estudiantat (només un repositori).
- Millor visibilitat del projecte complet per a tothom.
- Integració contínua més simple (un sol pipeline).  

**Negatives:**
- El repositori pot créixer i ser més pesat amb el temps.
- No és tan modular com tenir repos separats.
