'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const timelineSteps = [
    { 
      number: 1, 
      title: "Introduction", 
      path: "/introduction",
      description: "Vue d'ensemble du développement web moderne",
      icon: "🎯"
    },
    { 
      number: 2, 
      title: "React & Next.js", 
      path: "/react-nextjs",
      description: "Framework et outils de développement",
      icon: "⚛️"
    },
    { 
      number: 3, 
      title: "Création du Projet", 
      path: "/creation",
      description: "Initialisation et structure",
      icon: "🏗️"
    },
    { 
      number: 4, 
      title: "Git", 
      path: "/git",
      description: "Gestion de versions et collaboration",
      icon: "🌳"
    },
    { 
      number: 5, 
      title: "Base de données", 
      path: "/database",
      description: "Stockage et gestion des données",
      icon: "💾"
    },
    { 
      number: 6, 
      title: "Déploiement", 
      path: "/deployment",
      description: "Mise en ligne de l'application",
      icon: "🚀"
    }
  ];



  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo et Titre */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg transform group-hover:rotate-12 transition-transform">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Workshop Audensiel
                </h1>
                <p className="text-sm text-gray-500">Comprendre le développement web</p>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {timelineSteps.map((step) => (
                <Link
                  key={step.path}
                  href={step.path}
                  className="relative px-4 py-2 rounded-lg group hover:bg-gray-50 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xl transform group-hover:scale-110 transition-transform">
                      {step.icon}
                    </span>
                    <span className="text-gray-700">{step.title}</span>
                  </span>
                  <div className="absolute inset-x-0 h-0.5 bottom-0 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </div>

            {/* Menu Mobile */}
            <div className="lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-gray-600 transform transition-transform ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`} />
                  <span className={`w-full h-0.5 bg-gray-600 transition-opacity ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`} />
                  <span className={`w-full h-0.5 bg-gray-600 transform transition-transform ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`} />
                </div>
              </button>
            </div>
          </div>

          {/* Menu Mobile Déroulant */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}>
            <div className="space-y-2 py-4">
              {timelineSteps.map((step) => (
                <Link
                  key={step.path}
                  href={step.path}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl">{step.icon}</span>
                  <div>
                    <p className="font-medium text-gray-700">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with CTA */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Main Hero - prend 2 colonnes */}
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl p-12 shadow-sm h-full">
              {/* Title */}
              <h1 className="text-center mb-8">
                <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Comprendre le développement web aujourd&apos;hui
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 text-center mb-12">
                Découvrez les étapes essentielles du développement d&apos;applications web modernes
              </p>

              {/* Simple Cards Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-blue-800 mb-3">Développement</h3>
                  <p className="text-gray-600 text-sm">
                    Comprendre comment choisir les bonnes technologies et comment démarrer votre projet web
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-purple-800 mb-3">Collaboration</h3>
                  <p className="text-gray-600 text-sm">
                    Initiation à Git, comprendre la gestion de versions et le travail en équipe
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-indigo-800 mb-3">Base de données</h3>
                  <p className="text-gray-600 text-sm">
                    Comprendre comment choisir la base de données qui correspond à votre projet
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-indigo-800 mb-3">Déploiement</h3>
                  <p className="text-gray-600 text-sm">
                    Comprendre comment déployer votre application web
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 shadow-sm flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Prêt à découvrir ?
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez votre parcours avec une introduction au développement web moderne
            </p>
            <Link 
              href="/introduction"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors text-center"
            >
              Démarrer le parcours
            </Link>
          </div>
        </div>

        {/* Timeline Section */}
        <section className="mb-16 p-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-3xl shadow-sm">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Parcours d&apos;apprentissage
            </span>
          </h2>

          <div className="relative px-8 ">
            {/* Ligne horizontale */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-100/50"/>
            
            {/* Steps */}
            <div className="flex justify-between relative">
              {timelineSteps.map((step) => (
                <Link 
                  key={step.path}
                  href={step.path}
                  className="flex flex-col items-center w-40 group"
                >
                  {/* Icône */}
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-blue-500 
                                flex items-center justify-center text-2xl z-10 mb-4
                                group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>

                  {/* Contenu */}
                  <div className="text-center">
                    <h3 className="font-semibold text-blue-800 mb-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg">
                      {step.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Bertrand Avocat - Audensiel</p>
           
          </div>
        </div>
      </footer>
    </div>
  );
}
