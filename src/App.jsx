import { useState } from "react";

const pyCode = {
  heritage: `# ============================================================
#  1️⃣  HÉRITAGE  — le fils reçoit tout du parent
# ============================================================

class Animal:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

    def manger(self):
        print(f"{self.nom} mange 🍖")

    def dormir(self):
        print(f"{self.nom} dort 😴")

    def info(self):
        print(f"Nom: {self.nom} | Age: {self.age} ans")


class Chien(Animal):          # hérite de Animal
    pass                      # reçoit TOUT sans rien écrire

rex = Chien("Rex", 3)
rex.info()      # → Nom: Rex | Age: 3 ans   (hérité)
rex.manger()    # → Rex mange 🍖             (hérité)
rex.dormir()    # → Rex dort 😴              (hérité)`,

  surcharge: `# ============================================================
#  2️⃣  SURCHARGE (Override) — on réécrit la méthode parent
# ============================================================

class Animal:
    def __init__(self, nom):
        self.nom = nom

    def manger(self):
        print(f"{self.nom} mange normalement 🍖")

    def dormir(self):
        print(f"{self.nom} dort 😴")


class Chien(Animal):
    # ✅ RÉÉCRITE
    def manger(self):
        print(f"{self.nom} croque des croquettes 🐶")

    # ✅ HÉRITÉE (dormir() pas touchée)

    # ✅ NOUVELLE méthode spécifique
    def aboyer(self):
        print(f"{self.nom} dit : Ouaf Ouaf ! 🔊")


class Serpent(Animal):
    # ✅ RÉÉCRITE différemment
    def manger(self):
        print(f"{self.nom} avale en entier 🐍")

    # ✅ NOUVELLE
    def siffler(self):
        print(f"{self.nom} siffle... 🌬️")


rex   = Chien("Rex")
kaa   = Serpent("Kaa")

rex.manger()    # → Rex croque des croquettes 🐶
rex.dormir()    # → Rex dort 😴  (hérité)
rex.aboyer()    # → Rex dit : Ouaf Ouaf ! 🔊

kaa.manger()    # → Kaa avale en entier 🐍
kaa.dormir()    # → Kaa dort 😴  (hérité)
kaa.siffler()   # → Kaa siffle... 🌬️`,

  surchargeArgs: `# ============================================================
#  3️⃣  SURCHARGE VIA ARGUMENTS — s'adapte aux entrées
# ============================================================

# --- Option 1 : valeur par défaut ---
class Salutation:
    def saluer(self, nom=None, langue=None):
        if langue == "arabe":
            print("السلام عليكم 🌙")
        elif langue == "français":
            print(f"Bonjour {nom} ! 🇫🇷")
        elif langue == "anglais":
            print(f"Hello {nom} ! 🇬🇧")
        else:
            print("Salut ! 👋")

s = Salutation()
s.saluer()                        # → Salut ! 👋
s.saluer("Ali",  "français")      # → Bonjour Ali ! 🇫🇷
s.saluer("John", "anglais")       # → Hello John ! 🇬🇧
s.saluer(langue="arabe")          # → السلام عليكم 🌙


# --- Option 2 : *args (nombre illimité) ---
class Caisse:
    def calculer_total(self, *prix):
        if len(prix) == 0:
            print("Panier vide 🛒")
        elif len(prix) == 1:
            print(f"1 article : {prix[0]} DA")
        else:
            print(f"{len(prix)} articles → Total : {sum(prix)} DA 💰")

caisse = Caisse()
caisse.calculer_total()               # → Panier vide 🛒
caisse.calculer_total(500)            # → 1 article : 500 DA
caisse.calculer_total(500, 200, 150)  # → 3 articles → Total : 850 DA 💰


# --- Option 3 : **kwargs (arguments nommés) ---
class Profil:
    def afficher(self, **infos):
        if "nom" in infos and "age" in infos:
            print(f"👤 {infos['nom']}, {infos['age']} ans")
        elif "nom" in infos:
            print(f"👤 Nom : {infos['nom']}")
        elif "email" in infos:
            print(f"📧 {infos['email']}")
        else:
            print("❓ Aucune info")

p = Profil()
p.afficher()                         # → ❓ Aucune info
p.afficher(nom="Sara")               # → 👤 Nom : Sara
p.afficher(nom="Sara", age=25)       # → 👤 Sara, 25 ans`,

  polyHeritage: `# ============================================================
#  4️⃣  POLYMORPHISME PAR HÉRITAGE — même commande, objets différents
# ============================================================

class Vehicule:
    def __init__(self, marque):
        self.marque = marque

    def demarrer(self):
        print(f"{self.marque} démarre 🔑")

    def arreter(self):
        print(f"{self.marque} s'arrête 🛑")  # héritée par tous


class Voiture(Vehicule):
    def demarrer(self):                        # surcharge
        print(f"{self.marque} : Vroooom 🚗")

    def klaxonner(self):                       # nouvelle
        print(f"{self.marque} : Tuuut ! 📯")


class Avion(Vehicule):
    def demarrer(self):                        # surcharge
        print(f"{self.marque} : Lance les réacteurs ✈️")

    def decoller(self):                        # nouvelle
        print(f"{self.marque} décolle 🛫")

    def altitude(self, m):                     # nouvelle
        print(f"{self.marque} vole à {m}m 🌤️")


class Bateau(Vehicule):
    def demarrer(self):                        # surcharge
        print(f"{self.marque} : Moteur nautique en marche ⛵")

    def naviguer(self):                        # nouvelle
        print(f"{self.marque} navigue sur l'eau 🌊")


# 🎯 POLYMORPHISME EN ACTION
vehicules = [
    Voiture("Tesla"),
    Avion("Airbus"),
    Bateau("Viking")
]

print("=== Démarrage de tous les véhicules ===")
for v in vehicules:
    v.demarrer()    # même appel → résultat différent !

print("\\n=== Arrêt de tous les véhicules ===")
for v in vehicules:
    v.arreter()     # méthode héritée → même comportement

# Méthodes spécifiques
tesla  = Voiture("Tesla")
airbus = Avion("Airbus")

tesla.klaxonner()
airbus.decoller()
airbus.altitude(10000)`,

  polyAdHoc: `# ============================================================
#  5️⃣  POLYMORPHISME AD HOC — même fonction, logique différente
# ============================================================

class Calculatrice:
    def calculer(self, *args, operation="addition"):

        if len(args) == 0:
            print("❌ Aucun nombre fourni")
            return

        if operation == "addition":
            print(f"➕ Résultat : {sum(args)}")

        elif operation == "multiplication":
            result = 1
            for n in args: result *= n
            print(f"✖️  Résultat : {result}")

        elif operation == "moyenne":
            print(f"📊 Moyenne  : {sum(args)/len(args):.2f}")

        else:
            print("❓ Opération inconnue")


calc = Calculatrice()

calc.calculer()                              # → ❌ Aucun nombre
calc.calculer(2, 3)                          # → ➕ Résultat : 5
calc.calculer(2, 3, 4, 5)                    # → ➕ Résultat : 14
calc.calculer(2, 3, 4, operation="multiplication")  # → ✖️ 24
calc.calculer(10, 20, 30, operation="moyenne")      # → 📊 20.00`,

  complet: `# ============================================================
#  🏆  PROGRAMME COMPLET — Tout ensemble
# ============================================================

# ---------- CLASSES ----------

class Animal:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

    def info(self):
        print(f"\\n🐾 [{self.__class__.__name__}] {self.nom}, {self.age} ans")

    def manger(self):
        print(f"  🍖 {self.nom} mange")

    def dormir(self):                        # héritée par tous
        print(f"  😴 {self.nom} dort")


class Chien(Animal):
    def __init__(self, nom, age, race):
        super().__init__(nom, age)           # super()
        self.race = race

    def manger(self):                        # surcharge
        print(f"  🐶 {self.nom} croque ses croquettes")

    def aboyer(self):                        # nouvelle
        print(f"  🔊 {self.nom} : Ouaf Ouaf !")

    def info(self):
        super().info()
        print(f"  Race : {self.race}")


class Chat(Animal):
    def __init__(self, nom, age, interieur=True):
        super().__init__(nom, age)
        self.interieur = interieur

    def manger(self):                        # surcharge
        print(f"  🐱 {self.nom} grignote délicatement")

    def ronronner(self):                     # nouvelle
        print(f"  💤 {self.nom} : Prrrrrr...")

    def info(self):
        super().info()
        lieu = "intérieur" if self.interieur else "extérieur"
        print(f"  Chat d'{lieu}")


class Perroquet(Animal):
    def __init__(self, nom, age, mot_prefere):
        super().__init__(nom, age)
        self.mot_prefere = mot_prefere

    def manger(self):                        # surcharge
        print(f"  🦜 {self.nom} grignote des graines")

    def parler(self, *mots):                 # surcharge via args
        if len(mots) == 0:
            print(f"  🗣️  {self.nom} : {self.mot_prefere} !")
        else:
            phrase = " ".join(mots)
            print(f"  🗣️  {self.nom} répète : '{phrase}'")

    def info(self):
        super().info()
        print(f"  Mot préféré : {self.mot_prefere}")


# ---------- PROGRAMME PRINCIPAL ----------

print("=" * 50)
print("   🐾 ANIMALERIE PYTHON — Programme Complet")
print("=" * 50)

# Création des objets
rex     = Chien("Rex",      3,  "Berger Allemand")
mimi    = Chat("Mimi",      5,  interieur=True)
coco    = Perroquet("Coco", 2,  "Bonjour")

animaux = [rex, mimi, coco]

# 1. Héritage → info() de chaque animal
print("\\n📋 FICHES DES ANIMAUX (héritage + surcharge info)")
for a in animaux:
    a.info()

# 2. Polymorphisme → même appel, résultats différents
print("\\n\\n🍽️  L'HEURE DU REPAS (polymorphisme)")
for a in animaux:
    a.manger()

# 3. Méthode héritée → identique pour tous
print("\\n\\n😴 L'HEURE DU DODO (méthode héritée)")
for a in animaux:
    a.dormir()

# 4. Méthodes spécifiques (spécialisation)
print("\\n\\n🎭 COMPORTEMENTS SPÉCIFIQUES")
rex.aboyer()
mimi.ronronner()

# 5. Surcharge via *args (polymorphisme ad hoc)
print("\\n\\n🗣️  COCO LE PERROQUET (surcharge args)")
coco.parler()                        # mot par défaut
coco.parler("Polly", "veut", "un", "gâteau")  # phrase complète`,
};

const sections = [
  { id: "heritage",      label: "1️⃣ Héritage",           color: "#4ade80" },
  { id: "surcharge",     label: "2️⃣ Surcharge",          color: "#60a5fa" },
  { id: "surchargeArgs", label: "3️⃣ Surcharge Args",     color: "#f472b6" },
  { id: "polyHeritage",  label: "4️⃣ Poly. Héritage",     color: "#fb923c" },
  { id: "polyAdHoc",     label: "5️⃣ Poly. Ad Hoc",       color: "#a78bfa" },
  { id: "complet",       label: "🏆 Programme Complet",   color: "#facc15" },
];

const outputs = {
  heritage: `Nom: Rex | Age: 3 ans
Rex mange 🍖
Rex dort 😴`,

  surcharge: `Rex croque des croquettes 🐶
Rex dort 😴
Rex dit : Ouaf Ouaf ! 🔊
Kaa avale en entier 🐍
Kaa dort 😴
Kaa siffle... 🌬️`,

  surchargeArgs: `Salut ! 👋
Bonjour Ali ! 🇫🇷
Hello John ! 🇬🇧
السلام عليكم 🌙
Panier vide 🛒
1 article : 500 DA
3 articles → Total : 850 DA 💰
❓ Aucune info
👤 Nom : Sara
👤 Sara, 25 ans`,

  polyHeritage: `=== Démarrage de tous les véhicules ===
Tesla : Vroooom 🚗
Airbus : Lance les réacteurs ✈️
Viking : Moteur nautique en marche ⛵

=== Arrêt de tous les véhicules ===
Tesla s'arrête 🛑
Airbus s'arrête 🛑
Viking s'arrête 🛑

Tesla : Tuuut ! 📯
Airbus décolle 🛫
Airbus vole à 10000m 🌤️`,

  polyAdHoc: `❌ Aucun nombre fourni
➕ Résultat : 5
➕ Résultat : 14
✖️  Résultat : 24
📊 Moyenne  : 20.00`,

  complet: `==================================================
   🐾 ANIMALERIE PYTHON — Programme Complet
==================================================

📋 FICHES DES ANIMAUX
🐾 [Chien] Rex, 3 ans
  Race : Berger Allemand
🐾 [Chat] Mimi, 5 ans
  Chat d'intérieur
🐾 [Perroquet] Coco, 2 ans
  Mot préféré : Bonjour

🍽️  L'HEURE DU REPAS
  🐶 Rex croque ses croquettes
  🐱 Mimi grignote délicatement
  🦜 Coco grignote des graines

😴 L'HEURE DU DODO
  😴 Rex dort
  😴 Mimi dort
  😴 Coco dort

🎭 COMPORTEMENTS SPÉCIFIQUES
  🔊 Rex : Ouaf Ouaf !
  💤 Mimi : Prrrrrr...

🗣️  COCO LE PERROQUET
  🗣️  Coco : Bonjour !
  🗣️  Coco répète : 'Polly veut un gâteau'`,
};

export default function App() {
  const [active, setActive] = useState("heritage");
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const current = sections.find(s => s.id === active);

  const handleCopy = () => {
    navigator.clipboard.writeText(pyCode[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1117",
      color: "#e6edf3",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div className="app-header" style={{
        background: "linear-gradient(135deg, #161b22 0%, #1c2128 100%)",
        borderBottom: "1px solid #30363d",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(open => !open)}
          aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={sidebarOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <span style={{ fontSize: 28 }}>🐍</span>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3", letterSpacing: 1 }}>
            POO Python — Programme Complet
          </div>
          <div style={{ fontSize: 12, color: "#8b949e", marginTop: 2 }}>
            Héritage · Surcharge · Polymorphisme
          </div>
        </div>
      </div>

      <div className="app-content" style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <button
          className={`sidebar-backdrop ${sidebarOpen ? "is-open" : ""}`}
          onClick={() => setSidebarOpen(false)}
          aria-label="Fermer le menu"
        />
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "is-open" : ""}`} style={{
          width: 200,
          background: "#161b22",
          borderRight: "1px solid #30363d",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flexShrink: 0,
        }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setActive(s.id);
                setShowOutput(false);
                setSidebarOpen(false);
              }}
              style={{
                background: active === s.id ? "#1f2937" : "transparent",
                border: "none",
                borderLeft: active === s.id ? `3px solid ${s.color}` : "3px solid transparent",
                color: active === s.id ? s.color : "#8b949e",
                padding: "10px 16px",
                textAlign: "left",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "inherit",
                fontWeight: active === s.id ? 700 : 400,
                transition: "all 0.15s",
                lineHeight: 1.4,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="main-panel" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tab bar */}
          <div style={{
            background: "#161b22",
            borderBottom: "1px solid #30363d",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}>
            <button
              onClick={() => setShowOutput(false)}
              style={{
                background: !showOutput ? "#0d1117" : "transparent",
                border: "none",
                borderBottom: !showOutput ? `2px solid ${current.color}` : "2px solid transparent",
                color: !showOutput ? current.color : "#8b949e",
                padding: "12px 20px",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "inherit",
                fontWeight: 600,
              }}
            >
              📄 Code Python
            </button>
            <button
              onClick={() => setShowOutput(true)}
              style={{
                background: showOutput ? "#0d1117" : "transparent",
                border: "none",
                borderBottom: showOutput ? `2px solid ${current.color}` : "2px solid transparent",
                color: showOutput ? current.color : "#8b949e",
                padding: "12px 20px",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "inherit",
                fontWeight: 600,
              }}
            >
              ▶ Output
            </button>
            <div style={{ flex: 1 }} />
            <button
              onClick={handleCopy}
              style={{
                background: copied ? "#1a4731" : "#21262d",
                border: `1px solid ${copied ? "#2ea043" : "#30363d"}`,
                color: copied ? "#3fb950" : "#8b949e",
                padding: "6px 14px",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 11,
                fontFamily: "inherit",
                marginRight: 4,
              }}
            >
              {copied ? "✅ Copié !" : "📋 Copier"}
            </button>
          </div>

          {/* Code / Output area */}
          <div style={{
            flex: 1,
            overflow: "auto",
            padding: "20px 24px",
          }}>
            {!showOutput ? (
              <pre style={{
                margin: 0,
                fontSize: 13,
                lineHeight: 1.7,
                color: "#e6edf3",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}>
                {renderCode(pyCode[active])}
              </pre>
            ) : (
              <div style={{
                background: "#0a0e14",
                border: "1px solid #30363d",
                borderRadius: 8,
                padding: 20,
              }}>
                <div style={{ fontSize: 11, color: "#8b949e", marginBottom: 12 }}>
                  $ python programme.py
                </div>
                <pre style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.8,
                  color: "#3fb950",
                  whiteSpace: "pre-wrap",
                }}>
                  {outputs[active]}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer legend */}
      <div style={{
        background: "#161b22",
        borderTop: "1px solid #30363d",
        padding: "10px 24px",
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
      }}>
        {[
          { color: "#6e7681", label: "# commentaire" },
          { color: "#ff7b72", label: "mot-clé" },
          { color: "#79c0ff", label: "fonction/méthode" },
          { color: "#a5d6ff", label: "self / super()" },
          { color: "#3fb950", label: "output" },
        ].map(l => (
          <span key={l.label} style={{ fontSize: 11, color: l.color }}>
            ● {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Simple syntax highlighter
function renderCode(code) {
  const keywords = ["class", "def", "self", "super", "return", "print", "if", "elif", "else", "for", "in", "pass", "True", "False", "None", "and", "or", "not", "import", "from"];
  
  return code.split("\n").map((line, i) => {
    // Comments
    if (line.trim().startsWith("#")) {
      return <span key={i} style={{ color: "#6e7681" }}>{line}{"\n"}</span>;
    }

    // Tokenize
    const parts = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      // string
      const strMatch = remaining.match(/^(f?"[^"]*"|f?'[^']*')/);
      if (strMatch) {
        parts.push(<span key={key++} style={{ color: "#a5d6ff" }}>{strMatch[0]}</span>);
        remaining = remaining.slice(strMatch[0].length);
        continue;
      }
      // keyword
      const kwMatch = remaining.match(new RegExp(`^(${keywords.join("|")})(?=\\W|$)`));
      if (kwMatch) {
        parts.push(<span key={key++} style={{ color: "#ff7b72" }}>{kwMatch[0]}</span>);
        remaining = remaining.slice(kwMatch[0].length);
        continue;
      }
      // function call
      const fnMatch = remaining.match(/^([a-zA-Z_]\w*)\s*(?=\()/);
      if (fnMatch) {
        parts.push(<span key={key++} style={{ color: "#79c0ff" }}>{fnMatch[0]}</span>);
        remaining = remaining.slice(fnMatch[0].length);
        continue;
      }
      // number
      const numMatch = remaining.match(/^\d+(\.\d+)?/);
      if (numMatch) {
        parts.push(<span key={key++} style={{ color: "#f2cc60" }}>{numMatch[0]}</span>);
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }
      parts.push(<span key={key++}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }

    return <span key={i}>{parts}{"\n"}</span>;
  });
}
