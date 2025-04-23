'use client';

import Link from 'next/link';

export default function Introduction() {
  const roles = [
    {
      title: "Product Owner / Chef de Projet",
      phase: "Conception & Gestion",
      description: "Définit les besoins, priorise les fonctionnalités et assure la liaison entre les équipes techniques et métier",
      skills: ["Gestion de projet", "Agilité", "Vision produit", "Communication"],
      techStack: {
        title: "Outils de gestion",
        items: [
          "Jira - Suivi de projet",
          "Confluence - Documentation"
        ]
      },
      icon: "👔"
    },
    {
      title: "UX/UI Designer",
      phase: "Design & Expérience",
      description: "Conçoit l'interface et l'expérience utilisateur pour rendre l'application intuitive et agréable",
      skills: ["Figma/Adobe XD", "Prototypage", "Design System", "Tests utilisateurs"],
      techStack: {
        title: "Outils de design",
        items: [
          "Sketch - Design d'interface",
          "Adobe Creative Suite - Création graphique"
        ]
      },
      icon: "🎨"
    },
    {
      title: "Développeur Frontend",
      phase: "Développement",
      description: "Crée l'interface utilisateur interactive et s'assure de la qualité du code côté client",
      skills: ["HTML/CSS", "JavaScript", "React", "Tests unitaires"],
      techStack: {
        title: "Autres frameworks populaires",
        items: [
          "Angular - Alternative robuste",
          "Vue.js - Alternative légère"
        ]
      },
      icon: "💻"
    },
    {
      title: "Développeur Backend",
      phase: "Développement",
      description: "Développe les APIs et la logique métier, gère les bases de données et la sécurité",
      skills: ["Node.js", "APIs REST", "SQL/NoSQL", "Sécurité"],
      techStack: {
        title: "Autres langages courants",
        items: [
          "Java - Applications d'entreprise",
          "Python - Data et IA"
        ]
      },
      icon: "⚙️"
    },
    {
      title: "DevOps Engineer",
      phase: "Infrastructure & Déploiement",
      description: "Met en place l'infrastructure, automatise les déploiements et assure la disponibilité des applications",
      skills: ["CI/CD", "Cloud", "Monitoring", "Sécurité"],
      techStack: {
        title: "Technologies DevOps",
        items: [
          "Git - Gestion de versions",
          "Docker - Conteneurisation",
        ]
      },
      icon: "🚀"
    },
    {
      title: "QA Engineer",
      phase: "Qualité & Tests",
      description: "Assure la qualité du produit à travers des tests automatisés et manuels",
      skills: ["Tests E2E", "Tests de charge", "Automatisation", "Reporting"],
      techStack: {
        title: "Outils de test",
        items: [
          "Selenium - Tests automatisés",
          "Postman - Tests d'API"
        ]
      },
      icon: "🎯"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-sm">
          <h1 className="text-4xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Introduction au Développement Web
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 text-center mb-8 max-w-3xl mx-auto">
            Le développement web moderne est un travail d&apos;équipe qui réunit différents experts, 
            chacun apportant ses compétences spécifiques à chaque étape du projet.
          </p>
        </section>

        {/* Roles Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Les Métiers du Développement Web
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role) => (
              <div 
                key={role.title} 
                className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-300
                            ${(role.title === "Développeur Frontend" || role.title === "DevOps Engineer")
                              ? "border-2 border-gradient-to-r from-blue-500 to-purple-500 relative before:absolute before:inset-0 before:border-2 before:border-transparent before:rounded-xl before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:-z-10 hover:shadow-blue-100"
                              : "hover:shadow-md"
                            }`}
              >
                {/* Badge pour les rôles mis en évidence */}
                {(role.title === "Développeur Frontend" || role.title === "DevOps Engineer") && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full">
                    Focus du workshop
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{role.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{role.title}</h3>
                    <p className="text-sm text-blue-600">{role.phase}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {role.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {role.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full
                                 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 
                                 hover:text-white transform hover:-translate-y-0.5 
                                 cursor-pointer transition-all duration-300 ease-out"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {role.techStack && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                      {role.techStack.title}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {role.techStack.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"/>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-end">
          <Link
            href="/react-nextjs"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl 
                     hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Suivant : React & Next.js
            <span>→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}