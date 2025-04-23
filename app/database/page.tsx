'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface DatabaseExample {
  title: string;
  description: string;
  technologies: string[];
  tools: string[];
  schema: string;
  advantages: string[];
  disadvantages: string[];
}

interface NoSQLResult {
  _id: string;
  prenom: string;
  nom: string;
  telephones: Array<{
    numero: string;
    type: string;
  }>;
  competences: Array<{
    nom: string;
    niveau: number;
    annees_experience: number;
  }>;
}

interface Simulation {
  description: string;
  sql: {
    query: string;
    result: Record<string, string | number>[];
  };
  nosql: {
    query: string;
    result: NoSQLResult;
  };
}

export default function Database() {
  const [selectedType, setSelectedType] = useState<'sql' | 'nosql' | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const databases: Record<'sql' | 'nosql', DatabaseExample> = {
    sql: {
      title: "Base de données SQL (comme un grand classeur bien organisé)",
      description: "Imagine un grand classeur avec plusieurs onglets qui sont reliés entre eux. Chaque candidat a un numéro unique qui permet de le relier à toutes ses informations (téléphones, compétences, expériences...).",
      technologies: ["PostgreSQL", "MySQL", "Oracle", "SQL Server"],
      tools: ["DBeaver", "pgAdmin", "MySQL Workbench", "Flyway"],
      schema: `
// 1. D'abord, on crée la table principale des candidats
CREATE TABLE candidats (
    id SERIAL PRIMARY KEY,         -- Chaque candidat a un numéro unique (comme un numéro de sécurité sociale)
    prenom VARCHAR(50),           -- Son prénom
    nom VARCHAR(50),              -- Son nom
    email VARCHAR(100)            -- Son email
);

// 2. On crée une table pour stocker tous les numéros de téléphone
CREATE TABLE telephones (
    id SERIAL PRIMARY KEY,
    candidat_id INTEGER,          -- On note le numéro du candidat à qui appartient ce téléphone
    numero VARCHAR(20),           -- Le numéro de téléphone
    type VARCHAR(20)              -- Type : mobile, fixe, professionnel...
);

// 3. Table des compétences disponibles
CREATE TABLE competences (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50)               -- Ex: JavaScript, Python, Management...
);

// 4. Table qui relie les candidats à leurs compétences
CREATE TABLE competences_candidats (
    candidat_id INTEGER,          -- Numéro du candidat
    competence_id INTEGER,        -- Numéro de la compétence
    niveau INTEGER,               -- Niveau de 1 à 5
    annees_experience INTEGER     -- Nombre d'années d'expérience
);

// Exemple d'utilisation :
// 1. On ajoute un candidat
INSERT INTO candidats (prenom, nom, email) 
VALUES ('Alice', 'Dupont', 'alice@email.com');  -- Elle reçoit automatiquement l'id 1

// 2. On ajoute ses téléphones
INSERT INTO telephones (candidat_id, numero, type) 
VALUES 
    (1, '06 12 34 56 78', 'mobile'),     -- Le téléphone mobile d'Alice
    (1, '01 23 45 67 89', 'fixe');       -- Son téléphone fixe

// 3. On ajoute des compétences
INSERT INTO competences (nom) 
VALUES 
    ('JavaScript'),   -- id 1
    ('React'),       -- id 2
    ('Node.js');     -- id 3

// 4. On relie Alice à ses compétences
INSERT INTO competences_candidats 
VALUES 
    (1, 1, 5, 3),    -- Alice (id:1) connaît JavaScript (id:1) niveau 5, 3 ans d'exp
    (1, 2, 4, 2),    -- Alice connaît aussi React niveau 4, 2 ans d'exp
    (1, 3, 4, 2);    -- Et Node.js niveau 4, 2 ans d'exp`,
      advantages: [
        "Comme un grand classeur bien organisé où tout est relié",
        "On peut facilement ajouter autant de téléphones ou compétences que l'on veut",
        "Pas de doublon dans les données",
        "Facile de mettre à jour une information (comme un nom) à un seul endroit"
      ],
      disadvantages: [
        "Il faut bien réfléchir à l'organisation avant de commencer",
        "Les relations entre les tables peuvent devenir complexes",
        "Moins flexible si on veut ajouter de nouveaux types d'informations"
      ]
    },
    nosql: {
      title: "Base de données NoSQL (comme un dossier de fiches)",
      description: "Imagine un classeur avec des fiches libres, où tu peux noter les informations comme tu veux, sans format imposé.",
      technologies: ["MongoDB", "Cassandra", "Redis", "DynamoDB"],
      tools: ["MongoDB Compass", "Studio 3T", "Atlas", "Mongoose"],
      schema: `
// Exemple d'une fiche candidat
{
  "prénom": "John",
  "nom": "Doe",
  "email": "john@example.com",
  "compétences": [
    {
      "nom": "React",
      "niveau": 5,
      "expérience": "3 ans"
    },
    {
      "nom": "Node.js",
      "niveau": 4,
      "expérience": "2 ans"
    }
  ],
  "expériences": [
    {
      "entreprise": "Tech Corp",
      "poste": "Développeur Senior",
      "période": "2020-2023"
    }
  ]
}`,
      advantages: [
        "Très flexible, on peut ajouter des informations facilement",
        "Rapide à mettre en place",
        "Performant avec de grandes quantités de données",
        "Idéal pour les applications modernes et évolutives"
      ],
      disadvantages: [
        "Moins structuré, risque de désorganisation",
        "Plus difficile de faire des recherches complexes",
        "Peut créer de la redondance d'information"
      ]
    }
  };

  const simulations: Simulation[] = [
    {
      description: "Voir toutes les informations d'une candidate",
      sql: {
        query: `
// Cette requête rassemble toutes les informations de Maeva
SELECT 
    c.prenom, 
    c.nom,
    t.numero as telephone,
    t.type as type_telephone,
    comp.nom as competence,
    cc.niveau,
    cc.annees_experience
FROM candidats c
LEFT JOIN telephones t ON c.id = t.candidat_id
LEFT JOIN competences_candidats cc ON c.id = cc.candidat_id
LEFT JOIN competences comp ON cc.competence_id = comp.id
WHERE c.prenom = 'Maeva';`,
        result: [
          { prenom: "Maeva", nom: "Martin", telephone: "06 12 34 56 78", type_telephone: "mobile", competence: "DevOps", niveau: 5, annees_experience: 3 },
          { prenom: "Maeva", nom: "Martin", telephone: "01 23 45 67 89", type_telephone: "fixe", competence: "AWS", niveau: 4, annees_experience: 2 },
          { prenom: "Maeva", nom: "Martin", telephone: "06 12 34 56 78", type_telephone: "mobile", competence: "Kubernetes", niveau: 4, annees_experience: 2 }
        ]
      },
      nosql: {
        query: `
// Recherche dans la collection "candidats"
db.candidats.findOne({
  prenom: "Maeva",
  nom: "Martin"
})`,
        result: {
          _id: "12345",
          prenom: "Maeva",
          nom: "Martin",
          telephones: [
            { numero: "06 12 34 56 78", type: "mobile" },
            { numero: "01 23 45 67 89", type: "fixe" }
          ],
          competences: [
            { nom: "DevOps", niveau: 5, annees_experience: 3 },
            { nom: "AWS", niveau: 4, annees_experience: 2 },
            { nom: "Kubernetes", niveau: 4, annees_experience: 2 }
          ]
        }
      }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Choix de la Base de Données</h1>

      <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          🎯 Pourquoi le choix de la base de données est crucial ?
        </h2>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            La base de données est comme le coffre-fort de votre application. Elle stocke toutes les informations importantes de manière sécurisée et organisée.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Impact sur la Performance</h3>
              <p className="text-gray-600">
                Une base de données mal choisie peut ralentir votre application. C&apos;est comme avoir un classeur mal organisé où il faut des heures pour retrouver un document.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Évolution Future</h3>
              <p className="text-gray-600">
                Votre application va grandir. La base de données doit pouvoir s&apos;adapter facilement, comme une armoire modulable qu&apos;on peut agrandir selon les besoins.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Coûts et Maintenance</h3>
              <p className="text-gray-600">
                Certaines bases de données demandent plus de ressources et d&apos;expertise. C&apos;est comme choisir entre une voiture citadine et un camion : les besoins d&apos;entretien sont différents.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Sécurité des Données</h3>
              <p className="text-gray-600">
                Les données sont précieuses. La base de données doit les protéger comme un coffre-fort moderne, avec différents niveaux de sécurité et de sauvegarde.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-12">
        {(['sql', 'nosql'] as const).map(type => (
          <motion.div
            key={type}
            className={`p-6 rounded-xl cursor-pointer transition-all ${
              selectedType === type 
                ? 'bg-blue-50 border-2 border-blue-500'
                : 'bg-white border-2 border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedType(type)}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-xl font-semibold mb-4">{databases[type].title}</h2>
            <p className="text-gray-600 mb-4">{databases[type].description}</p>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Technologies populaires :</h3>
              <div className="flex flex-wrap gap-2">
                {databases[type].technologies.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Outils :</h3>
              <div className="flex flex-wrap gap-2">
                {databases[type].tools.map(tool => (
                  <span key={tool} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border-2 border-gray-200 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Exemple avec {databases[selectedType].title}</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Structure des données</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{databases[selectedType].schema}</code>
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-600">Avantages</h3>
              <ul className="space-y-2">
                {databases[selectedType].advantages.map((adv, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-600">Inconvénients</h3>
              <ul className="space-y-2">
                {databases[selectedType].disadvantages.map((disadv, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-red-500">•</span>
                    {disadv}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-xl p-6 border-2 border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6">Simulation avec {databases[selectedType].title}</h2>
          
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`w-full p-4 rounded-lg text-white mb-6 ${
              isSimulating 
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } transition-colors`}
          >
            {isSimulating ? '⏹️ Arrêter la simulation' : '▶️ Lancer la simulation'}
          </button>

          {isSimulating && (
            <div className="space-y-8">
              {simulations.map((sim, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <h3 className="font-medium text-lg mb-2">{sim.description}</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Requête {selectedType.toUpperCase()} :</h4>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <code>{selectedType === 'sql' ? sim.sql.query : sim.nosql.query}</code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Résultat :</h4>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <code>
                        {JSON.stringify(selectedType === 'sql' ? sim.sql.result : sim.nosql.result, null, 2)}
                      </code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      <div className="flex justify-between">
        <Link
          href="/git"
          className="bg-white px-6 py-3 rounded-lg shadow-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Retour à Git
        </Link>
        <Link
          href="/deployment"
          className="bg-white px-6 py-3 rounded-lg shadow-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Étape suivante : Déploiement →
        </Link>
      </div>
    </div>
  );
}
