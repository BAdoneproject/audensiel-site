export default function Home() {
  const timelineSteps = [
    { 
      number: 1, 
      title: "Introduction", 
      path: "/introduction",
      description: "Objectifs et présentation du projet"
    },
    { 
      number: 2, 
      title: "React & Next.js", 
      path: "/react-nextjs",
      description: "Pourquoi ces technologies ?"
    },
    { 
      number: 3, 
      title: "Création du Projet", 
      path: "/creation",
      description: "Structure et initialisation"
    },
    { 
      number: 4, 
      title: "Git & Branches", 
      path: "/git",
      description: "Travail collaboratif et versioning"
    },
    { 
      number: 5, 
      title: "Base de données", 
      path: "/database",
      description: "SQL vs NoSQL"
    },
    { 
      number: 6, 
      title: "API & Connexion", 
      path: "/api",
      description: "Intégration des services"
    },
    { 
      number: 7, 
      title: "Déploiement", 
      path: "/deployment",
      description: "Pré-prod et Production"
    },
    { 
      number: 8, 
      title: "CI/CD", 
      path: "/cicd",
      description: "Automatisation et intégration continue"
    }
  ];

  const mainFeatures = [
    {
      title: "React & Next.js",
      description: "Interface dynamique et réactive avec rendu côté serveur",
      details: [
        "Composants réutilisables",
        "Routage automatique",
        "Optimisation des performances"
      ],
      path: "/react-nextjs"
    },
    {
      title: "Git & Collaboration",
      description: "Gestion de versions et travail d'équipe",
      details: [
        "Branches de développement",
        "Pull Requests",
        "Fusion de code"
      ],
      path: "/git"
    },
    {
      title: "Base de données",
      description: "Solutions SQL et NoSQL adaptées",
      details: [
        "Structure relationnelle",
        "Flexibilité NoSQL",
        "Choix selon les besoins"
      ],
      path: "/database"
    },
    {
      title: "API & Intégration",
      description: "Communication et services externes",
      details: [
        "Requêtes HTTP",
        "REST API",
        "Gestion des données"
      ],
      path: "/api"
    },
    {
      title: "Déploiement",
      description: "De la pré-production à la mise en ligne",
      details: [
        "Environnements",
        "Vercel/Netlify",
        "Optimisation"
      ],
      path: "/deployment"
    },
    {
      title: "CI/CD",
      description: "Automatisation et qualité de code",
      details: [
        "Tests automatisés",
        "Déploiement continu",
        "GitHub Actions"
      ],
      path: "/cicd"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-lg z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">Formation Dev Web</div>
            <div className="hidden lg:flex space-x-6">
              {timelineSteps.map((step) => (
                <a
                  key={step.path}
                  href={step.path}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {step.title}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 p-8 bg-white rounded-3xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Développement Web Moderne
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez le processus complet de création d&apos;une application web moderne, 
            de l&apos;initialisation au déploiement, en passant par les meilleures pratiques 
            de développement avec React, Next.js et bien plus encore.
          </p>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Parcours d&apos;apprentissage
          </h2>
          <div className="flex flex-col md:flex-row flex-wrap justify-between items-start gap-8">
            {timelineSteps.map((step, index) => (
              <div key={step.path} className="relative flex-1 min-w-[250px]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="hidden md:block h-0.5 flex-1 bg-gray-300 ml-4" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <a
                  href={step.path}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  En savoir plus →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Technologies et Concepts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature) => (
              <a
                key={feature.path}
                href={feature.path}
                className="block p-6 bg-white rounded-xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="text-sm text-gray-500">
                  {feature.details.map((detail, index) => (
                    <li key={index} className="mb-1">• {detail}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Formation Développement Web</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300 transition-colors">Documentation</a>
              <a href="#" className="hover:text-gray-300 transition-colors">GitHub</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
